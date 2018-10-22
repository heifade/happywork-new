import commander from "commander";
import { addNewWebCommand } from "./web/empty";
import { addNewNodeCommand } from "./node/empty";

import { version } from "../package.json";
console.log(`version: ${version}`);

addNewWebCommand();
addNewNodeCommand();

commander.parse(process.argv);
