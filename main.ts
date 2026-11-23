import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY: string =
  "I told my kids I used to be a banker, but I lost interest — now I deposit dad jokes, withdraw groans, and tell everyone business is booming.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const DEFAULT_OUTPUT_DIR = "/output";
const ENTRY_FILE = "entry.txt";

/** Validates the one-line entry and returns the exact file content to write. */
function buildContent(line: string): string {
  if (line.trim().length === 0) {
    throw new Error("Entry must not be empty or whitespace only.");
  }
  if (/[\r\n\u2028\u2029]/.test(line)) {
    throw new Error("Entry must be a single line (no line breaks).");
  }
  const content = line + "\n";
  // Count Unicode code points, not UTF-16 units (the em dash counts as one).
  const chars = Array.from(content).length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `Entry must be ${MIN_CHARS} to ${MAX_CHARS} characters including the trailing newline, got ${chars}.`,
    );
  }
  return content;
}

const content = buildContent(ENTRY);
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || DEFAULT_OUTPUT_DIR);
const outputPath = join(outputDir, ENTRY_FILE);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, content, "utf8");
