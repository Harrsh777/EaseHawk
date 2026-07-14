import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const slugs = ["industries", "moxsuite", "success-stories", "capabilities"];

for (const slug of slugs) {
  const s = JSON.parse(
    fs.readFileSync(path.join(root, "content", "pages", `${slug}.json`), "utf8"),
  );
  const ids = s.map((x) => x.match(/id="([^"]+)"/)?.[1]).filter(Boolean);
  console.log(slug, ids);
}
