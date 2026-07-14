import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const repo = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const lines = fs.readFileSync(path.join(repo, "EaseHawk_Success_Stories.html"), "utf8").split("\n");
for (let i = 1184; i < 1265; i++) {
  if (lines[i] && lines[i].length < 500) console.log(`${i + 1}:${lines[i]}`);
}
