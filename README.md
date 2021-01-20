# Farmscan for Arcx

This extracts some information about [Arcx](https://arcx.money) farms, notably, the pool distribution for easy visualization of whale domination. More metrics might be added later.

## Running locally

Prerequisite: have a recent version of NodeJS installed via [NVM](http://nvm.sh/), and [yarn](https://classic.yarnpkg.com/lang/en/) available globally.

Clone this repo, run `yarn install`. Run commands below with the required env vars.

### Commands

- `yarn start` will fetch the stakers and their earnings and output the information into a JSON file in the `docs/cache` folder. Open `docs/index.html` to visualize this cached data. `index.html` will auto-reload the `stakers.json` file every 20 seconds. Right now it takes about ~3m to fetch the stakers if using Infura, recommended you use your own node for easy access.

> We use `docs` because of Github Pages - the page is deployed from the `/docs` subfolder because GP does not support `/public`.

Usage:

```
NODE_URL=https://mainnet.infura.io/v3/MY_INFURA_KEY ETHERSCAN_KEY=MY_ETHERSCAN_KEY yarn start
```

### License

Do what you want.
