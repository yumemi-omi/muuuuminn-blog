const fs = require("fs");
const path = require("path");
const projectRoot = path.resolve(__dirname, "..");
const eslintConfigPath = path.resolve(projectRoot, "eslint-rules.json");

const config = JSON.parse(fs.readFileSync(eslintConfigPath, "utf-8"));

const ruleSources = {
  react: "https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules",
  "react-hooks":
    "https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/docs/rules",
  "@emotion": "https://github.com/emotion-js/emotion/blob/main/packages/eslint-plugin/docs/rules",
  "@typescript-eslint":
    "https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules",
  import: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules",
};

function severityToString(severity) {
  switch (severity) {
    case 0:
      return "off";
    case 1:
      return "warn";
    case 2:
      return "error";
    default:
      return severity;
  }
}

const updatedRules = Object.entries(config.rules).reduce((acc, [rule, value]) => {
  const ruleConfig = Array.isArray(value) ? value.map(severityToString) : severityToString(value);
  acc[rule] = ruleConfig;
  return acc;
}, {});

let output = "# ESLint Rules\n\n";
output += "| Rule | Severity | Source |\n";
output += "|------|----------|--------|\n";

Object.entries(updatedRules).forEach(([rule, value]) => {
  const ruleNamespace = rule.split("/")[0];
  const ruleName = rule.split("/")[1];
  const severity = JSON.stringify(value);

  let source;
  if (ruleSources[ruleNamespace]) {
    source = `[${ruleNamespace}/${ruleName}](${ruleSources[ruleNamespace]}/${ruleName}.md)`;
  } else {
    source = "Not found";
  }

  output += `| ${rule} | ${severity} | ${source} |\n`;
});

// 出力内容をマークダウンファイルに書き込む
const outputPath = path.resolve(projectRoot, "eslint-rules.md");
fs.writeFileSync(outputPath, output);

console.log(`ESLint rules have been saved to: ${outputPath}`);

// eslint-rules.jsonを削除
fs.unlinkSync(eslintConfigPath);
