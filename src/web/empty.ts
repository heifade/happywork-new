import commander from "commander";
import { unzipTemplate } from "../utils/unzipTemplate";

export function addNewWebCommand() {
  commander
    .command("web")
    .option("--path <n>", "项目路径", process.cwd())
    .option("--template <n>", "模板名称", "webEmpty")
    .description("新建Web项目")
    .action(pars => {
      unzipTemplate(pars.template, pars.path);
    });
}
