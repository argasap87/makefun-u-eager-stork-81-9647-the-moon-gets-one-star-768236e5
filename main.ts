// The Moon Gets One Star — make.fun bounty
// u-eager-stork-81-9647-the-moon-gets-one-star-768236e5
//
// Writes one line — the funniest one-star review of the Moon, 120
// characters or fewer — to $MAKEFUN_OUTPUT_DIR/entry.txt
// (/output/entry.txt in the grader).
//
// The hook: the Moon as a ghosting ex. It vanishes for two weeks
// every month (the new moon), then drifts back into the sky like
// nothing happened — no apology, no explanation. The grievance is
// specific to the Moon's own cycle, not craters, cheese or
// brightness, and the punchline ("Worst ex ever.") lands on first
// read in the voice of a real one-star rant.
//
// Deterministic by construction: the line is a fixed string, there
// is no randomness, no clock read and no network call, so two runs
// write byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. The Moon ghosts me for two weeks straight every month, then comes back like nothing happened. Worst ex ever.";

// Gate guard: the competition accepts a single text of 1-120 chars,
// UTF-8, not whitespace-only. Refuse anything outside that range
// instead of writing a bad entry — the grader rejects the whole
// entry on a malformed file. The single-line guard also rejects
// carriage returns, so a stray "\r" cannot smuggle in a second line.
if (LINE.length < 1 || LINE.length > 120 || LINE.trim().length === 0) {
  throw new Error(`Entry line must be 1-120 non-whitespace chars, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Entry line must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE + "\n", "utf8");
console.log(`Wrote ${LINE.length} chars to ${join(outputDir, "entry.txt")}`);
