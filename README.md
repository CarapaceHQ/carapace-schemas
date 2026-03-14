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

## Seed Material

The initial source material comes from the earlier `ai-trust-layer` planning docs and is now being normalized into the Carapace ecosystem.

Current seed docs:

- `docs/Human-AI-Risk-Event-Schema.md`
- `docs/Behavior-Telemetry-Taxonomy.md`

## Near-Term Milestones

1. Normalize the first event envelope for `api_request`, `auth_failure`, `velocity_burst`, `prompt_injection_signal`, `tool_abuse_signal`, and `policy_action`.
2. Add JSON Schema artifacts under `schemas/`.
3. Add fixtures and compatibility checks that downstream repos can consume.

## Development

This repo is documentation-first today. Schema artifacts and validation tooling will be added as the first Carapace build slice moves from planning into implementation.

## License

Apache-2.0
