import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

test("fixtures validate against the shipped schemas", async () => {
  const result = await execFileAsync("node", ["./scripts/validate-fixtures.js"], {
    cwd: repoRoot,
  });

  assert.equal(result.stderr, "");
});
