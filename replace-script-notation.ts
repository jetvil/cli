/* eslint-disable no-console */
import { readFileSync, writeFileSync } from "fs";

try {
  const indexCLIFile = readFileSync("./dist/index.js", "utf8");
  const newFile = indexCLIFile.replace("ts-node-script", "node");
  writeFileSync("./dist/index.js", newFile);

  const indexDeclarationFile = readFileSync("./dist/index.d.ts", "utf8");
  const newDeclarationFile = indexDeclarationFile.replace("ts-node-script", "node");
  writeFileSync("./dist/index..d.ts", newDeclarationFile);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
