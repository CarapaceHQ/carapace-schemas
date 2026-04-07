import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const schemasDir = path.join(repoRoot, "schemas");
const fixturesDir = path.join(repoRoot, "fixtures");

const schemaFileByType = {
  api_request: "api-request.schema.json",
  auth_failure: "auth-failure.schema.json",
  velocity_burst: "velocity-burst.schema.json",
  prompt_injection_signal: "prompt-injection-signal.schema.json",
  tool_abuse_signal: "tool-abuse-signal.schema.json",
  policy_action: "policy-action.schema.json",
};

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function loadSchemas(ajv) {
  const schemaFiles = [
    "base-event.schema.json",
    ...Object.values(schemaFileByType),
  ];

  const schemaIdByFile = new Map();

  for (const schemaFile of schemaFiles) {
    const schema = await readJson(path.join(schemasDir, schemaFile));
    ajv.addSchema(schema, schema.$id || schemaFile);
    schemaIdByFile.set(schemaFile, schema.$id || schemaFile);
  }

  return schemaIdByFile;
}

async function validateFixtures() {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
  });
  addFormats(ajv);

  const schemaIdByFile = await loadSchemas(ajv);

  const fixtureFiles = (await readdir(fixturesDir)).filter((file) =>
    file.endsWith(".json"),
  );

  let failures = 0;

  for (const fixtureFile of fixtureFiles) {
    const fixture = await readJson(path.join(fixturesDir, fixtureFile));
    const schemaFile = schemaFileByType[fixture.type];

    if (!schemaFile) {
      console.error(`No schema mapped for fixture ${fixtureFile} with type ${fixture.type}`);
      failures += 1;
      continue;
    }

    const validate = ajv.getSchema(schemaIdByFile.get(schemaFile));
    const valid = validate(fixture);

    if (!valid) {
      failures += 1;
      console.error(`Fixture failed validation: ${fixtureFile}`);
      for (const error of validate.errors || []) {
        console.error(`  ${error.instancePath || "/"} ${error.message}`);
      }
    }
  }

  if (failures > 0) {
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${fixtureFiles.length} Carapace fixtures.`);
}

await validateFixtures();
