# Changelog

All notable changes to the Eric SDK are documented here.

This project follows semantic versioning.
Pre-1.0 releases may introduce intentional breaking changes as the API surface hardens.

---

## [0.1.0] – 2026-01-27

### Changed
- Removed `client.call()` to prevent direct flow invocation.
- All executions must now be routed through `decide()`.

### Rationale
Direct flow execution allowed applications to bypass policy enforcement.
Eric is designed as a governance and control layer; all execution must pass through
policy evaluation to ensure deterministic, auditable outcomes.

This release intentionally narrows the public API to reflect Eric’s execution model.

---

## [0.0.5] – 2025-12-14

### Added
- Initial public SDK release.
- `decide()` with policy-based routing and optional execution bounds.
