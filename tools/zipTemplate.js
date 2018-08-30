const { zipDir } = require("archive-dir");
const { mkdirSync, existsSync } = require("fs");
const { resolve } = require("path");
const fs = require("fs");

let templates = fs.readdirSync(resolve(__dirname, "../template"));

templates.map(async item => {
  let sourceDir = resolve(__dirname, `../template/${item}`);
  let targetPath = resolve(__dirname, `../dist/template`);
  let targetZip = resolve(targetPath, `${item}.zip`);

  if (!existsSync(targetPath)) {
    mkdirSync(targetPath);
  }

  await zipDir(sourceDir, targetZip);
});
