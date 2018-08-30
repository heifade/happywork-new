import commander from "commander";
import { resolve } from "path";

const { unzipDir } = require("archive-dir");

export function addNewWebCommand() {
  commander
    .command("web")
    .option("--path <n>", "项目路径", process.cwd())
    .description("新建Web项目")
    .action(pars => {
      let zipFile = resolve(__dirname, "./template/webEmpty.zip");
      unzipDir(zipFile, pars.path);
    });
}
