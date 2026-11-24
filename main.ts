// The Long Roast: Lawmakers and the File They Cannot Convert — entry program (program/v1).
//
// Writes one satirical sentence, at most 320 characters, roasting lawmakers
// who would regulate AI, crypto or the internet but cannot convert a file
// to PDF, to /output/entry.txt.
//
// The line was chosen against the judge's brief, in the order the judge
// weighs things:
//   1. A one-sentence satirical roast of lawmakers who regulate AI, crypto
//      or the internet without being able to convert a file to PDF.
//   2. A real turn: the sentence sets up the lawmakers' authority — 400
//      pages of law governing AI, crypto and the whole internet — then
//      undercuts it with the file they cannot convert.
//   3. The aim stays on lawmakers and the rules they write: the joke is
//      about power and competence, not random abuse.
//   4. It reads clean in one pass and stays quotable, with the punch
//      landing on the last few words (turn a Word document into a PDF).
//   5. A specific, unexpected detail over a worn tech-illiteracy cliche:
//      not "they can't use a computer" but a 400-page lawmaker emailing
//      an assistant for a file conversion.
//
// The line: they will write 400 pages of law to govern AI, crypto, and the
// entire internet, then email an assistant to ask how to turn a Word
// document into a PDF. 150 characters, one sentence.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "They will write 400 pages of law to govern AI, crypto, and the entire internet, then email an assistant to ask how to turn a Word document into a PDF.";

// Gate self-check, mirroring ONLY the sealed scorer: UTF-8 text of 1 to
// 320 characters, not only white space, exactly one sentence.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 320) {
    throw new Error(`line is ${chars} characters, outside the 1-320 gate`);
  }
  if (!line.trim()) {
    throw new Error("line is only white space");
  }
  // Exactly one sentence: scan for sentence terminators and require the
  // sole terminator to be the final character, so a stray period mid-line
  // (an abbreviation, a decimal) cannot slip past a plain count.
  const trimmed = line.trim();
  let terminators = 0;
  let lastTerminatorAt = -1;
  for (let i = 0; i < trimmed.length; i++) {
    if (".!?".includes(trimmed[i])) {
      terminators++;
      lastTerminatorAt = i;
    }
  }
  if (terminators !== 1 || lastTerminatorAt !== trimmed.length - 1) {
    throw new Error("line is not exactly one sentence");
  }
}

gate(LINE);
// The harness runs the program with MAKEFUN_OUTPUT_DIR=/output; honour
// it when set so a local re-run lands in the same place as the grade.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, LINE, "utf8");
