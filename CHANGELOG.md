# Changelog

All notable changes to the Eric SDK are documented here.

This project follows semantic versioning.  
Pre-1.0 releases may introduce breaking changes as the API surface and governance model stabilize.

---

## [0.1.7] – 2026-05-06

### Documentation

- Rewrote README to better reflect the SDK's role as an execution control layer.

**Rationale:** The previous README underemphasized the governance model and led with authentication rather than how the SDK actually works. Updated to open with the execution pipeline, added a "How it works" section covering all five enforcement steps, expanded the security section with specific properties, and restructured usage examples to lead with a complete quick start. No runtime behavior changes.

---

## [0.1.6] – 2026-02-25

### Changed

Added `repository`, `homepage`, and `issues` metadata to `package.json`.

**Rationale:** Improves npm package transparency by linking the SDK to its public GitHub source, issue tracker, and documentation. No runtime behavior changes.

---

## [0.1.5] – 2026-02-24

### Changed

- Narrowed `type` in response shape from `string` to `"structured" | "text"`.

**Rationale:** Response format classification is now explicitly constrained. Prevents accidental drift in output types and strengthens the SDK's deterministic contract.

---

## [0.1.4] – 2026-02-13

### Changed

- Added `engines` field specifying `node >=20`.

---

## [0.1.3] – 2026-02-06

### Changed

- Removed `client` from the `decide()` request payload.

**Rationale:** `client` is infrastructure identity and is now treated as authoritative header-only metadata (`x-api-client`). Removing it from the request body prevents spoofing and aligns the SDK with Eric's control-plane model, where execution authority lives outside user-provided input.

**Note:** Requests that previously included `client` in the body may be rejected by strict API validation.

---

## [0.1.2] – 2026-02-03

### Changed

- Updated API endpoint to `https://us-central1-eric-ai-prod.cloudfunctions.net/decide`.

**Note:** If you were calling the previous endpoint directly, update your SDK to this version.

---

## [0.1.1] – 2026-01-30

### Changed

- Removed explicit `flow: "decisionRouter"` from SDK requests.

**Rationale:** The Eric API no longer accepts direct flow invocations. All requests are now treated as intent submissions and routed through the internal decision router by default. Simplifies the SDK payload and prevents coupling to internal execution details.

---

## [0.1.0] – 2026-01-27

### Changed

- Removed `client.call()`. Direct flow invocation is no longer supported.
- All executions must now be routed through `decide()`.

**Rationale:** Direct flow execution allowed applications to bypass policy enforcement. Eric is a governance and control layer — all execution must pass through policy evaluation to ensure deterministic, auditable outcomes. This release intentionally narrows the public API to reflect that model.

---

## [0.0.5] – 2025-12-14

### Added

- Initial public SDK release.
- `decide()` with policy-based routing and optional execution bounds via `allowedFlows`.