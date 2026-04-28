# carapace-schemas

Canonical schemas and field contracts for Carapace risk telemetry.

Support Carapace on Patreon: <https://www.patreon.com/carapacehq>

## Scope

This repo owns the shared event model for the first Carapace slice:

- request and policy event envelopes
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
import { apiRequestSchema, policyActionSchema } from "@carapacehq/schemas";
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

## Seed Material

The initial source material comes from the earlier `ai-trust-layer` planning docs and is now being normalized into the Carapace ecosystem.

Current seed docs:

- `docs/Human-AI-Risk-Event-Schema.md`
- `docs/Behavior-Telemetry-Taxonomy.md`

## Near-Term Milestones

1. Wire `@carapacehq/express` event factories directly to these schemas.
2. Freeze the first stable package version and publish compatibility guidance.
3. Add downstream compatibility checks for `carapace-playground` and the starter rule pack.

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
