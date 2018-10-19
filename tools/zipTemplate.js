const { zipDir } = require("archive-dir");
const { mkdirSync, existsSync, readdirSync } = require("fs");
const { resolve } = require("path");

async function build() {
  let templates = readdirSync(resolve(__dirname, "../template"));

  templates.map(async item => {
    let sourceDir = resolve(__dirname, `../template/${item}`);
    let targetPath = resolve(__dirname, `../dist/template`);
    let targetZip = resolve(targetPath, `${item}.zip`);

    if (!existsSync(targetPath)) {
      mkdirSync(targetPath);
    }

    await zipDir(sourceDir, targetZip);
  });
}

build()
  .then(() => console.log("处理完成！"))
  .catch(() => console.log("处理失败！"));
