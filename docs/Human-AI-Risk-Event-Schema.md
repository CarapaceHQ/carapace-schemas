# AI Agent Trust Layer

## Human + AI Risk Event Schema

This document defines the **standard event schema** used to collect and process behavioral telemetry from AI agents, services, and infrastructure.

Every action performed by an agent generates a **Risk Event**. These events are the core input for the detection engine and risk scoring system.

---

# 1. Event Model Overview

A **Risk Event** represents a single observed behavior from an AI agent interacting with a service.

Each event contains:

* agent identity
* event type
* behavioral metadata
* network context
* timestamps
* optional content signals

The event system is designed to support:

* high-volume ingestion
* real-time detection
* historical behavioral analysis
* anomaly detection
* reputation scoring

---

# 2. Event Envelope

All events follow a common envelope structure.

event_id
event_type
event_timestamp
agent_id
organization_id
service_id
environment

metadata
network
content
economic

---

# 3. Event Identity Fields

These fields identify the source of the event.

event_id
Unique identifier for the event

event_type
Category of behavior observed

event_timestamp
ISO8601 timestamp

agent_id
Fingerprint identifier of the agent

organization_id
Organization operating the agent

service_id
Service receiving the interaction

environment
production | staging | development

---

# 4. Event Types

Events are grouped into major categories.

### Network Events

ip_connection
ip_rotation
proxy_detected
vpn_detected
tor_detected

---

### Authentication Events

login_attempt
login_success
login_failure
token_validation_failure
api_key_created
api_key_rotated

---

### Request Behavior Events

api_request
api_error
rate_limit_triggered
endpoint_enumeration
session_start
session_end

---

### Agent Execution Events

task_started
task_completed
task_failed
execution_loop_detected
retry_pattern_detected

---

### Content Risk Events

prompt_submission
prompt_injection_detected
exploit_payload_detected
data_exfiltration_pattern

---

### Economic Events

payment_attempt
payment_success
payment_failure
chargeback_event
trial_abuse_detected

---

# 5. Metadata Section

The metadata block contains **event-specific attributes**.

Example metadata fields:

endpoint
http_method
request_latency
request_size
response_size
request_velocity
retry_count
task_type
model_name

This section varies by event type.

---

# 6. Network Context

Network attributes help detect infrastructure abuse.

ip_address
asn_number
asn_provider
hosting_provider
geo_country
geo_region
geo_city

Additional derived signals:

datacenter_detected
residential_proxy_detected
vpn_detected
tor_exit_node

---

# 7. Content Context

Optional content signals extracted from requests.

prompt_length
prompt_entropy_score
injection_signature_detected
exploit_pattern_detected
model_exfiltration_pattern

Note:

Sensitive content should **not be stored directly** unless required.

Derived signals are preferred.

---

# 8. Economic Context

Used when events involve financial or compute resources.

transaction_id
payment_method_type
transaction_amount
wallet_id
resource_cost_estimate
compute_units_consumed

---

# 9. Example Event

Example Risk Event:

event_id: evt_829193
event_type: api_request
event_timestamp: 2026-03-11T20:11:04Z

agent_id: agt_29f93aa
organization_id: org_4821
service_id: svc_image_api

environment: production

metadata:

endpoint: /generate-image
http_method: POST
request_velocity: 58_per_minute

network:

ip_address: 34.72.91.11
asn_provider: Google Cloud
geo_country: US
datacenter_detected: true

content:

prompt_length: 720
injection_signature_detected: false

economic:

compute_units_consumed: 12

---

# 10. Event Pipeline

Risk Events move through a processing pipeline.

Agent / Service Interaction
↓
Event Collection SDK
↓
Event Ingestion API
↓
Streaming Queue
↓
Detection Engine
↓
Risk Scoring Engine
↓
Trust Graph Update
↓
Customer Dashboard / API

---

# 11. Event Storage

Events should be stored in two forms.

Raw Event Store

Immutable events stored for auditing and investigation.

Derived Signal Store

Processed signals used for risk scoring and analytics.

Suggested infrastructure:

Event Streaming: Kafka / PubSub
Cold Storage: Object Storage
Analytics Store: Postgres / ClickHouse

---

# 12. Retention Policy

Events should follow retention rules.

Example:

Raw events retained for 90 days

Derived signals retained for 1 year

Aggregated reputation data retained indefinitely

Retention policies may vary by organization.

---

# 13. Privacy Model

The event system must respect privacy.

Principles:

Raw request payloads should not be stored by default.

Derived behavioral signals are preferred.

Organizations maintain ownership of sensitive telemetry.

Only anonymized identifiers should be shared across the trust network.

---

# Summary

The Risk Event Schema defines the standardized structure for collecting behavioral telemetry.

These events power:

* risk scoring
* anomaly detection
* reputation modeling
* coordinated attack detection
* trust graph updates

A consistent schema ensures interoperability across services participating in the AI Agent Trust Layer.
