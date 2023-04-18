const fs = require("fs");
const path = require("path");
const tsconfigResultPath = path.resolve(process.cwd(), "tsconfig-result.json");

const result = JSON.parse(fs.readFileSync(tsconfigResultPath, "utf-8"));
const compilerOptions = result.compilerOptions;

const outputFilePath = path.resolve(process.cwd(), "doc", "TSConfig.md");
const outputStream = fs.createWriteStream(outputFilePath);

const tsconfigDocsBaseURL = "https://www.typescriptlang.org/tsconfig#";

outputStream.write("# TSConfig Options\n\n");

outputStream.write("| Option | Value | Documentation |\n");
outputStream.write("| ------ | ----- | ------------- |\n");

Object.entries(compilerOptions).forEach(([key, value]) => {
  if (key === "paths") {
    value = Object.entries(value)
      .map(([pathKey, pathValue]) => `${pathKey}: ${pathValue.join(", ")}`)
      .join("<br>");
  } else if (Array.isArray(value)) {
    value = value.join(", ");
  } else if (typeof value === "object") {
    value = JSON.stringify(value, null, 2).replace(/\n/g, "<br>");
  }
  const documentationLink = `${tsconfigDocsBaseURL}${key}`;
  outputStream.write(`| ${key} | ${value} | [Link](${documentationLink}) |\n`);
});

outputStream.end(() => {
  fs.unlink(tsconfigResultPath, (err) => {
    if (err) {
      console.error(`Error deleting temporary file: ${err}`);
    }
  });
});
