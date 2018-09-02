import commander from "commander";
import { resolve, basename } from "path";
import chalk from "chalk";
import { existsSync, readdirSync } from "fs";
const { unzipDir } = require("archive-dir");

export function addNewWebCommand() {
  commander
    .command("web")
    .option("--path <n>", "项目路径", process.cwd())
    .option("--template <n>", "模板名称", "webEmpty")
    .description("新建Web项目")
    .action(pars => {
      let dir = resolve(__dirname, `./template/`);
      let zipFile = `${dir}/${pars.template}.zip`;
      if (!existsSync(zipFile)) {
        let list = readdirSync(dir)
          .map(item => basename(item, ".zip"))
          .join("\n");
        console.log(chalk.red(`模板${pars.template}不存在，模板列表：\n${list}`));
      }
      unzipDir(zipFile, pars.path);
    });
}
