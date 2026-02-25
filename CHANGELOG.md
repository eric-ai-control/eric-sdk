# Changelog

All notable changes to the Eric SDK are documented here.

This project follows semantic versioning.
Pre-1.0 releases may introduce intentional breaking changes as the API surface evolves.

---

## [0.1.5] – 2026-02-24

### Changed

* Narrowed `type` in response shape from `string` to `"structured" | "text"`.

### Rationale

Response format classification is now explicitly constrained.
This prevents accidental drift in output types and strengthens the SDK’s deterministic contract.

---

## [0.1.4] – 2026-02-13

### Changed

- Added `engines` field specifying Node.js >=20.

---

## [0.1.3] – 2026-02-06

### Changed:

* **Removed `client` from request payload**: The SDK no longer includes `client` in the request body when calling `decide()`.

### Rationale:

`client` is infrastructure identity and is now treated as authoritative header-only metadata (`x-api-client`).  
This change removes ambiguity, prevents spoofing, and aligns the SDK with Eric’s control-plane model, where execution authority lives outside user-provided input.

### Notes:

* Applications must continue to provide `x-api-client` and `x-api-key` headers.
* Requests that previously included `client` in the body may be rejected by strict API validation.

---

## [0.1.2] – 2026-02-03

### What's New:

* **Updated API Endpoint**: The SDK now calls the API endpoint at `https://us-central1-eric-ai-prod.cloudfunctions.net/decide` for decision-making flows.

### Breaking Changes:

* **Endpoint Change**: If you were using the previous `decide` endpoint, please update the SDK configuration to use the new endpoint.

---

## [0.1.1] – 2026-01-30

### Changed:

* Removed explicit `flow: "decisionRouter"` from SDK requests.

### Rationale:

The Eric API no longer accepts direct flow invocations.
All requests are now treated as intent submissions and are routed through the internal decision router by default. This change simplifies the SDK payload and prevents accidental coupling to internal execution details.

---

## [0.1.0] – 2026-01-27

### Changed:

* Removed `client.call()` to prevent direct flow invocation.
* All executions must now be routed through `decide()`.

### Rationale:

Direct flow execution allowed applications to bypass policy enforcement. Eric is designed as a governance and control layer, and all execution must pass through policy evaluation to ensure deterministic, auditable outcomes. This release intentionally narrows the public API to reflect Eric’s execution model.

---

## [0.0.5] – 2025-12-14

### Added:

* Initial public SDK release.
* `decide()` with policy-based routing and optional execution bounds.

---

This version ensures clarity and consistency across all sections while providing users with the necessary context on each update.
