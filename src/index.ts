import commander from "commander";
import { addNewWebCommand } from "./web/empty";

addNewWebCommand();

commander.parse(process.argv);
