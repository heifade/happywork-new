import commander from "commander";
import { addNewWebCommand } from "./web/empty";
import { addNewNodeCommand } from "./node/empty";

addNewWebCommand();
addNewNodeCommand();

commander.parse(process.argv);
