import { resolve, basename } from "path";
import chalk from "chalk";
import { existsSync, readdirSync } from "fs";
const { unzipDir } = require("archive-dir");

export function unzipTemplate(template: string, path: string) {
  const dir = resolve(__dirname, `./template/`);
  const zipFile = `${dir}/${template}.zip`;
  if (!existsSync(zipFile)) {
    const list = readdirSync(dir)
      .map(item => basename(item, ".zip"))
      .join("\n");
    console.log(chalk.red(`模板${template}不存在，模板列表：\n${list}`));
  }
  unzipDir(zipFile, path);
}
