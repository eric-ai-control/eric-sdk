# Changelog

All notable changes to the Eric SDK are documented here.

This project follows semantic versioning.  
Pre-1.0 releases may introduce breaking changes as the API surface and governance model stabilize.

---

## [0.2.0] – 2026-06-24

### Changed

* Flattened response shape. Response is now `{ workflow, type, data, requestId }` directly. Previously the result was nested under an `output` key.
* Renamed `flow` to `workflow` in `EricResponse`. Aligns the response field with the input field and platform terminology.
* Added `requestId` to `EricResponse`. Top-level field for traceability and support.
* Renamed `allowedFlows` to `allowedWorkflows` in `DecideInput`. Consistent with workflow-first naming across the platform.
* Fixed request payload format. Payload fields were incorrectly wrapped under a `data` key in previous versions. Fields are now sent flat on the request body.

### Breaking Changes

* `res.data.output` is no longer valid. Read `res.data` directly.
* `EricResponse.flow` is now `EricResponse.workflow`.
* `DecideInput.allowedFlows` is now `DecideInput.allowedWorkflows`.
* Callers relying on the wrapped payload format must remove the `data:` wrapper.

**Rationale:** The response envelope was carrying internal routing metadata that clients should not depend on. Flattening the response to `{ workflow, type, data, requestId }` establishes a clean, stable public contract. `requestId` moves to the top level to make it always available for support tracing regardless of client type.

---

## [0.1.9] – 2026-06-24

### Changed

* Replaced `requestType` with `workflow` as the primary execution identifier.
* Repositioned the SDK around customer-defined workflows rather than centrally managed capabilities.
* Updated examples to reflect workflow-based execution patterns.
* Renamed capability-focused documentation to workflow-focused terminology.
* Updated architecture documentation to reflect governed workflow execution.
* Clarified that applications invoke workflows while Eric applies governance, provider controls, validation, and auditing before execution reaches a model.
* Added model independence section describing governance separation from underlying AI providers.
* Updated design principles from capability-first to workflow-first execution.

### Documentation

* Rewrote README to align with Eric's evolving platform architecture.
* Added workflow-centric quick start examples.
* Added workflow governance overview and execution lifecycle.
* Expanded explanation of centralized governance across applications, workflows, and AI providers.
* Updated response examples to reference workflow execution rather than capability routing.

**Rationale:** Eric has evolved from a platform centered around predefined capabilities toward a workflow-centric governance model. Organizations now define workflows that represent business outcomes, while Eric governs execution through authorization, policy enforcement, validation, provider selection, PII protection, and auditing. This update aligns the SDK documentation with the platform's current direction and website messaging. No runtime behavior changes beyond the introduction of the `workflow` request field replacing `requestType`.

---

## [0.1.8] – 2026-06-09

### Documentation

- Repositioned README around centralized AI governance.
- Updated SDK description to reflect Eric's role as a governance layer across applications and AI models.
- Added governance-focused overview and architecture explanation.
- Renamed capability section to emphasize approved capability governance.
- Expanded design principles with centralized governance and model-agnostic operation.

**Rationale:** Eric's platform positioning has evolved from an execution-control-focused runtime description to a centralized governance layer for AI applications. The README now leads with the organizational problem Eric solves—governance fragmentation across applications—while preserving the existing technical implementation details. No runtime behavior changes.

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