# carapace-schemas

Canonical schemas and field contracts for Carapace risk telemetry.

Support Carapace on Patreon: <https://www.patreon.com/carapacehq>

## Scope

This repo owns the shared event model for the first Carapace slice:

- request and policy event envelopes
- agent action receipt contracts
- field naming and normalization guidance
- starter telemetry vocabulary
- fixtures and validation contracts over time

The first local-first Carapace loop depends on this repo landing before the middleware and rule-pack repos diverge.

## Current Contract

The first shipped schema package now defines:

- a shared base event envelope
- event schemas for:
  - `api_request`
  - `auth_failure`
  - `velocity_burst`
  - `prompt_injection_signal`
  - `tool_abuse_signal`
  - `policy_action`
- an `agent_action_receipt` schema for durable action evidence
- example fixtures for normal and suspicious cases
- a fixture validation script using JSON Schema

The contract is aligned to the current `@carapacehq/express` event shape so downstream repos can adopt it without waiting on a second redesign pass.

## Package Usage

Install the schema package:

```bash
npm install @carapacehq/schemas
```

Import the schema set or a specific exported schema:

```js
import {
  agentActionReceiptSchema,
  apiRequestSchema,
  policyActionSchema,
} from "@carapacehq/schemas";
import baseEventSchema from "@carapacehq/schemas/schemas/base-event" with { type: "json" };
```

## Layout

- `schemas/`
  JSON Schema artifacts for the base envelope and first event types.
- `fixtures/`
  Example payloads that should remain valid as the package evolves.
- `src/`
  Package exports for downstream imports.
- `scripts/validate-fixtures.js`
  Local validation pass for all shipped fixtures.

## Source Material

The initial source material came from earlier `ai-trust-layer` planning docs and has been narrowed into the current Carapace schema package.

Current reference docs:

- `docs/Human-AI-Risk-Event-Schema.md`
- `docs/Behavior-Telemetry-Taxonomy.md`

## Release Candidate Checks

Before publishing:

1. Keep fixture validation green.
2. Confirm downstream middleware events still match the shipped schemas.
3. Run `npm pack --dry-run` and inspect the included schemas, fixtures, README, LICENSE, and package metadata.
4. Include this package in the packed-tarball smoke test from the steering release sequence.

## Development

```bash
npm install
npm test
npm run validate:fixtures
npm pack --dry-run
```

The schemas use JSON Schema draft 2020-12 and are designed for local-first validation in downstream repos.

## License

Apache-2.0
