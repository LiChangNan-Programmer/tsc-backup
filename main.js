#!/usr/bin/env node

const path = require("path");
const { exec } = require("child_process");
const { readFile, mkdir } = require("fs/promises");
const { parse } = require("comment-json");
const dayjs = require('dayjs')

const commandPosition = process.cwd();

(async () => {
  const tscPath = path.resolve(commandPosition, "node_modules", "typescript/lib/tsc.js");

  const defaultConfig = path.resolve(commandPosition, "tsconfig.json");
  const outdir = parse(await readFile(defaultConfig, "utf-8")).compilerOptions.outDir || "lib";

  const now = dayjs();
  const dirName = now.format('YYYY-MM-DD/HH:mm:ss').toString();

  const targetDir = path.resolve(commandPosition, outdir, dirName);
  const shell = `node ${tscPath} --outDir ${targetDir}`;

  exec(shell, (err) => {
    if (err) throw err;
    console.log("build success in " + dirName);
  });
})();
