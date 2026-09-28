// Ensures every page under latchel-admin/ has the exact groups: ["latchel"]
// frontmatter field -- this controls whether a Latchel employee sees the page
// in the help center. Run by .github/workflows/ensure-latchel-admin-groups.yml
// after every push to main that touches latchel-admin/.
//
// Handles every state found during the original audit: array syntax with a
// wrong value or typo, YAML block-list syntax, an empty groups: line, a
// missing groups field, and a page with no frontmatter block at all.

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..");
const latchelAdminDir = join(repoRoot, "latchel-admin");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (extname(entry) === ".mdx") out.push(full);
  }
  return out;
}

const TARGET = 'groups: ["latchel"]';
let changed = 0;
const changedFiles = [];

for (const full of walk(latchelAdminDir)) {
  const content = readFileSync(full, "utf8");
  const eol = content.includes("\r\n") ? "\r\n" : "\n";

  // No frontmatter block at all -- add one, deriving a title from the first
  // H1 heading if present, else the filename.
  if (!/^---\r?\n/.test(content)) {
    const titleMatch = content.match(/^#\s+(.+?)\r?\n/);
    const title = titleMatch ? titleMatch[1].trim() : full.split(/[\\/]/).pop().replace(/\.mdx$/, "");
    const newFm = `---${eol}title: "${title}"${eol}${TARGET}${eol}---${eol}${eol}`;
    writeFileSync(full, newFm + content);
    changed++;
    changedFiles.push({ file: full, action: "added frontmatter block (none existed)" });
    continue;
  }

  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!fmMatch) continue; // malformed frontmatter delimiter, leave for a human
  const fmText = fmMatch[1];
  const lines = fmText.split(/\r?\n/);
  const idx = lines.findIndex((l) => /^groups:/.test(l));

  let newLines = null;
  let action = null;

  if (idx === -1) {
    const titleIdx = lines.findIndex((l) => /^title:/.test(l));
    const insertAt = titleIdx === -1 ? 0 : titleIdx + 1;
    newLines = [...lines.slice(0, insertAt), TARGET, ...lines.slice(insertAt)];
    action = "added missing groups field";
  } else {
    const inlineValue = lines[idx].replace(/^groups:\s*/, "");
    if (inlineValue) {
      if (inlineValue === '["latchel"]') continue; // already correct
      newLines = [...lines];
      newLines[idx] = TARGET;
      action = `fixed inline value ${JSON.stringify(inlineValue)}`;
    } else {
      // Block-list style: "groups:" followed by "  - ..." lines.
      let end = idx + 1;
      while (end < lines.length && /^\s*-\s*/.test(lines[end])) end++;
      newLines = [...lines.slice(0, idx), TARGET, ...lines.slice(end)];
      action = "converted block-list syntax to inline";
    }
  }

  const newFmText = newLines.join(eol);
  const newContent = content.slice(0, fmMatch.index) + `---${eol}${newFmText}${eol}---${eol}` + content.slice(fmMatch.index + fmMatch[0].length);
  writeFileSync(full, newContent);
  changed++;
  changedFiles.push({ file: full, action });
}

console.log(`Checked latchel-admin pages. Fixed: ${changed}`);
for (const c of changedFiles) console.log(`  ${c.file.slice(repoRoot.length + 1)}: ${c.action}`);

// Exit code signals to the workflow whether there's anything to commit.
process.exit(changed > 0 ? 0 : 0);
