# Schemas Directory

This directory holds the first canonical Carapace event contracts.

Current artifacts:

- `base-event.schema.json`
- `api-request.schema.json`
- `auth-failure.schema.json`
- `velocity-burst.schema.json`
- `prompt-injection-signal.schema.json`
- `tool-abuse-signal.schema.json`
- `policy-action.schema.json`

The base envelope requires:

- `type`
- `ts`
- `actor`
- `tags`

Per-event schemas tighten the event-specific payload blocks on top of that shared envelope.
