import { access } from "node:fs/promises";
import { constants } from "node:fs";

const publicEntry = new URL("../public/index.html", import.meta.url);
const legacyRootEntry = new URL("../index.html", import.meta.url);

try {
  await access(publicEntry, constants.R_OK);
} catch {
  console.error("Missing public/index.html, the canonical site entry point.");
  process.exit(1);
}

try {
  await access(legacyRootEntry, constants.F_OK);
  console.error(
    "Remove index.html from the repository root; GitHub Pages and Workers must both use public/index.html.",
  );
  process.exit(1);
} catch (error) {
  if (error?.code !== "ENOENT") {
    throw error;
  }
}

console.log("Pages source check passed: public/index.html is the only site entry point.");
