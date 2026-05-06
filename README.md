# Eric SDK (JavaScript / TypeScript)

Official SDK for **Eric AI** — the execution control plane for production AI systems.

Every request is evaluated against declared policy before any capability executes. No model is invoked until intent is classified, policy is cleared, and a registered capability is matched. Every execution — allowed or blocked — is logged with an immutable audit trail.

Built for environments where AI behavior must be **controlled, deterministic, and auditable**.

---

## Installation

```bash
npm install eric-sdk
```

Requires an Eric-issued API key. [Request access →](https://ericaicontrol.dev)

---

## Quick start

```ts
import { EricSDK } from "eric-sdk";

const eric = new EricSDK({
  apiKey: process.env.ERIC_API_KEY!,
  client: "your-app-id",
});

const result = await eric.decide({
  text: "Summarize the provided patient record",
  requestType: "clinicalSummary",
});

// result.flow     — resolved capability
// result.type     — "structured" | "text"
// result.data     — schema-validated output
```

API keys are scoped and governed server-side. Never embed them in client-side code or public repositories.

---

## How it works

Your application calls `decide()`. Eric handles the rest:

1. **Intent classification** — the request is classified before any routing occurs
2. **Policy gate** — declared policy is evaluated in code, not in prompts
3. **Capability routing** — the request is routed deterministically to a registered capability
4. **Output validation** — the response is validated against a typed schema before it is returned
5. **Audit log** — every execution is recorded at the moment it occurs, immutably

If any check fails, execution stops. No fallbacks. No silent substitutions. No model is invoked.

---

## Restricting execution to specific capabilities

Use `allowedFlows` to restrict which capabilities are eligible for a given request.

```ts
await eric.decide({
  text: "Generate a structured daily summary for the provided input",
  allowedFlows: ["dailySummary"],
});
```

When `allowedFlows` is provided:

- Only capabilities in the allowed set are eligible
- If no match is found, execution is denied and logged
- No fallback or automatic substitution occurs

This is equivalent to registering a capability restriction at the request level. For deployment-level restrictions, capability registration is handled during onboarding.

---

## Response shape

```ts
{
  flow: string;                     // resolved capability name
  type: "structured" | "text";      // output format
  data: unknown;                    // schema-validated output
}
```

All responses conform to pre-approved output contracts defined at the capability level. Every field is guaranteed to be present according to the executed capability's schema.

---

## Security

- Policy is enforced server-side. The SDK cannot bypass or override execution controls.
- API keys are scoped per client and governed server-side.
- All executions — including blocked ones — are logged with a structured, timestamped, attributable record.
- Customer data is not used to train third-party models.
- BYOK (Bring Your Own Key) is supported for model providers. See onboarding documentation.

---

## Design principles

- **Policy-first** — no direct model calls, no bypassed executions
- **Deterministic** — the same request under the same policy produces the same routing decision
- **Auditable** — every decision is logged at execution time, not reconstructed after
- **Infrastructure-grade** — built for regulated production systems, not prototypes
- **Intent-based** — clients describe what they want; the control plane decides what runs

---

## Versioning

The Eric SDK follows semantic versioning.

Breaking changes reflect deliberate updates to governance and safety guarantees, not implementation convenience.

Pre-1.0 versions were experimental and are not supported.

See `CHANGELOG.md` for details.

---

## Support

For access, onboarding, or documentation: [https://ericaicontrol.dev](https://ericaicontrol.dev)
