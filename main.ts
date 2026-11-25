// describe-your-ex-in-one-word
//
// A one-word verdict on an ex, written to /output/entry.txt for make.fun's
// "Describe Your Ex in One Word" bounty (u-puan-describe-your-ex-in-one-word-9fc6ebe7).
//
// The word: "Unsubscribe" — the ex as a subscription you finally cancelled.
// One word, no punctuation, instantly readable as a verdict on a former
// partner: you do not argue with a newsletter, you just unsubscribe.
//
// The program is deterministic: it always writes the same single word, needs
// no input, no network and no environment secrets. It validates the word
// against the gate (UTF-8 text, 1 to 111 characters, not only white space,
// exactly one word) before writing it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "Unsubscribe";
const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 111;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate-shaped validation, run before anything is written.
if (WORD.length < 1 || WORD.length > MAX_CHARS) {
  fail(`word must be 1 to ${MAX_CHARS} characters, got ${WORD.length}`);
}
if (WORD.trim().length === 0) {
  fail("word must not be only white space");
}
if (/\s/.test(WORD)) {
  fail("word must be exactly one word (no white space)");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, WORD, "utf8");

// Read the file back and confirm it holds exactly the word: the gate reads
// this file, so a write that silently differed would fail the entry.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== WORD) {
  fail(`read-back mismatch: file holds ${JSON.stringify(written)}`);
}

console.log(`wrote ${written.length} characters to ${OUT_PATH}: ${written}`);
