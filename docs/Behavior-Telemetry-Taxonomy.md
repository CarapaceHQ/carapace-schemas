# AI Agent Trust Layer

## Behavior Telemetry Taxonomy

This document defines the **behavioral telemetry signals** used to detect risky or malicious AI agent activity.

Signals are grouped by category for detection, scoring, and behavioral analysis.

---

# 1. Network Signals

These signals describe the **network origin of agent traffic**.

Signals:

ip_address
ip_reputation_score
asn_number
asn_provider
hosting_provider
residential_proxy_detected
datacenter_detected
tor_exit_node
vpn_detected
geo_country
geo_region
geo_city
geo_movement_velocity
ip_rotation_frequency
unique_ip_count_per_agent
shared_ip_agents_count

Purpose:

Detect botnets, proxy farms, and anonymized traffic.

---

# 2. Request Behavior Signals

These signals describe **how the agent interacts with APIs or services**.

Signals:

requests_per_minute
requests_per_second
burst_request_rate
endpoint_diversity
repeat_endpoint_calls
concurrent_connections
connection_duration
session_length
session_reuse_frequency
idle_to_active_ratio
api_error_rate
api_timeout_rate

Purpose:

Detect scraping, brute force attempts, and automation abuse.

---

# 3. Authentication Signals

Signals related to identity and authentication behavior.

Signals:

login_attempts
failed_login_attempts
successful_login_rate
api_key_rotation_frequency
token_expiration_mismatch
invalid_token_usage
credential_stuffing_pattern
multi_account_behavior
account_creation_rate

Purpose:

Detect account takeover attempts and credential abuse.

---

# 4. Agent Behavior Signals

Signals related to **AI agent operational patterns**.

Signals:

prompt_generation_frequency
task_execution_frequency
parallel_task_execution
agent_idle_patterns
execution_loop_detection
instruction_retry_patterns
long-running task detection
behavioral cadence fingerprint
interaction entropy score

Purpose:

Identify automated agent patterns versus normal usage.

---

# 5. Content Signals

Signals extracted from request payloads.

Signals:

prompt_injection_signature
known_exploit_string
malicious_payload_signature
prompt_length_anomaly
code_execution_pattern
model_exfiltration_attempt
training_data_extraction_pattern
token_overflow_attempt

Purpose:

Detect prompt injection attacks and exploit attempts.

---

# 6. Economic Signals

Signals related to financial or resource consumption behavior.

Signals:

payment_method_reuse
chargeback_rate
transaction_velocity
microtransaction_abuse
wallet_reuse_pattern
credit_card_failure_rate
trial_abuse_pattern
resource_cost_spike

Purpose:

Detect financial abuse and compute fraud.

---

# 7. Reputation Signals

Signals derived from historical behavior.

Signals:

agent_age
historical_success_rate
previous_risk_flags
prior_block_events
cross_organization_reports
shared_agent_fingerprint
reputation_decay_rate
trust_score_history

Purpose:

Establish long-term behavioral trust patterns.

---

# 8. Environment Signals

Signals related to the execution environment.

Signals:

user_agent_signature
agent_framework_detected
automation_library_detected
headless_browser_detected
sandbox_environment
vm_detected
container_runtime_detected

Purpose:

Identify automated agent frameworks.

---

# 9. Organizational Signals

Signals related to organization-level behavior.

Signals:

organization_agent_count
organization_risk_score
organization_flag_rate
organization_api_usage_growth
organization_behavior_anomaly

Purpose:

Detect coordinated attacks or agent farms.

---

# Summary

The Behavior Telemetry Taxonomy provides the signal foundation for:

* risk scoring
* anomaly detection
* fraud prevention
* agent trust modeling

These signals feed into the **Risk Scoring Engine** to produce a final agent trust score.
