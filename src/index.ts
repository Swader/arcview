import program from "commander";
import * as fs from "fs";

import { getStakers } from "./distribution";

program.command("start").action(async function () {
  // Do something
  const stakers = await getStakers();
  fs.writeFileSync("docs/cache/stakers.json", JSON.stringify(stakers));
  console.log(`Logged ${stakers.length} stakers.`);
});

program.parse(process.argv);
