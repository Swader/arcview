import program from "commander";

import { getStakers } from "./distribution";

program.command("start").action(async function () {
  // Do something
  const stakers = await getStakers();
  console.log(stakers[0].positionId);
  console.log(stakers[0].earned);
});

program.parse(process.argv);
