import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceFile = path.join(
  root,
  "src",
  "features",
  "directory",
  "mock-data",
  "vendors.ts"
);
const outputFile = path.join(root, "db.json");

const source = fs.readFileSync(sourceFile, "utf8");
const match = source.match(/vendorDirectoryMockData[^=]*=\s*(\[[\s\S]*\]);/m);

if (!match) {
  throw new Error("Could not find vendorDirectoryMockData array in vendors.ts");
}

const records = Function(`"use strict"; return (${match[1]});`)();

const vendors = records.map((item, index) => ({
  id: String(index + 1),
  ...item,
}));

const db = { vendors };
fs.writeFileSync(outputFile, JSON.stringify(db, null, 2));

console.log(`Created db.json with ${vendors.length} vendors.`);
