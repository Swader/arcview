import axios from "axios";
// import { ETHERSCAN_KEY, FARM_ADDRESS, NODE_URL } from "./config";
import { ethers, BigNumber } from "ethers";
import { p5abi } from "./abi";

const FARM_ADDRESS = process.env.FARM_ADDRESS
  ? process.env.FARM_ADDRESS
  : "0xd41a21f6a3debfe28b06ace2312a69c53107cee5";

const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY
  ? process.env.ETHERSCAN_KEY
  : null;

if (!ETHERSCAN_KEY) {
  console.error("Etherscan key missing.");
  process.exit(1);
}

const NODE_URL = process.env.NODE_URL ? process.env.NODE_URL : null;

if (!NODE_URL) {
  console.error("Node URL missing.");
  process.exit(1);
}

export const getStakers = async function (): Promise<Staker[]> {
  const stakers: Staker[] = [];
  const uniques = await getUniqueAddresses();
  const provider = new ethers.providers.JsonRpcProvider(process.env.NODE_URL);
  const farm = new ethers.Contract(FARM_ADDRESS, p5abi, provider);
  for (const addy of uniques) {
    // Read the contract state
    const s = await farm.stakers(addy);
    const staker = ethers.utils.shallowCopy(s) as Staker;
    staker.earned = await farm.earned(addy);
    staker.address = addy;
    stakers.push(staker);
  }
  return stakers;
};

export const getIncomingTransactions = async (): Promise<
  EtherscanTransaction[]
> => {
  const etx: EtherscanTransaction[] = [];
  try {
    const result = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokentx&address=${FARM_ADDRESS}&startblock=11611744&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`,
      { timeout: 10000 }
    );
    //console.log(result);
    for (const r of result.data.result) {
      if (r.to === FARM_ADDRESS) {
        etx.push(r as EtherscanTransaction);
      }
    }
  } catch (e) {
    console.error("Etherscan request timed out");
    process.exit(1);
  }
  return etx;
};

export const getUniqueAddresses = async (): Promise<string[]> => {
  const addresses: string[] = [];
  const itx = await getIncomingTransactions();
  for (const tx of itx) {
    if (!addresses.includes(tx.from)) addresses.push(tx.from);
  }
  return addresses;
};

export type Staker = {
  address: string;
  positionId: BigNumber;
  debtSnapshot: BigNumber;
  balance: BigNumber;
  rewardPerTokenStored: BigNumber;
  rewardPerTokenPaid: BigNumber;
  rewardsEarned: BigNumber;
  rewardsReleased: BigNumber;
  earned: BigNumber;
};

export type EtherscanTransaction = {
  blockNumber: number;
  timeStamp: number;
  hash: string;
  nonce: number;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: number;
  transactionIndex: number;
  gas: number;
  gasPrice: number;
  gasUsed: number;
  cumulativeGasUsed: number;
  input: string;
  confirmations: number;
};
