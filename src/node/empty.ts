import commander from "commander";
import { unzipTemplate } from "../utils/unzipTemplate";

export function addNewNodeCommand() {
  commander
    .command("node")
    .option("--path <n>", "项目路径", process.cwd())
    .option("--template <n>", "模板名称", "nodeEmpty")
    .description("新建Web项目")
    .action(pars => {
      unzipTemplate(pars.template, pars.path);
    });
}
