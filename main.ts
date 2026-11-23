import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY: string =
  "I told my kids I used to be a banker, but I lost interest — now I deposit dad jokes, withdraw groans, and tell everyone business is booming.";

function checkEntry(text: string): void {
  const length = Array.from(text).length;
  if (text.trim().length === 0) {
    throw new Error("Entry must not be empty or whitespace only.");
  }
  if (length < 1 || length > 200) {
    throw new Error(`Entry must be 1 to 200 characters, got ${length}.`);
  }
}

const content = ENTRY + "\n";
checkEntry(content);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), content, "utf8");
