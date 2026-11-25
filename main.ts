// One Line, One Laugh — u-plucky-finch-20-one-line-one-laugh-0ffe66ea
// Writes a single funny line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// No network, no secrets, no dependencies. Node 22+ runs this file as-is.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a small true observation (outsourcing an apology to AI) with a
// surprise twist at the end (the girlfriend is now mad at the AI too).
const LINE =
  "I asked AI to write my apology and now my girlfriend is mad at both of us.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  const botDir = process.env.MAKEFUN_BOT_DIR;
  if (botDir && botDir.trim().length > 0) return join(botDir, "output");
  return "/output";
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
// Guard the gate: 1-200 characters (code points, not bytes), not only whitespace.
const length = [...LINE].length;
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${length}`);
}
// No trailing newline: the file is exactly the one line, nothing else.
writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
