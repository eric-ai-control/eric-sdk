# Eric SDK (JavaScript / TypeScript)

Official SDK for **Eric AI** - a centralized governance layer for AI applications.

Most organizations don't have one AI application anymore. They have many.

As AI adoption grows, governance becomes fragmented. Different applications implement different controls, different audit trails, different policies, and often different AI providers.

Eric sits between applications and AI models, applying capability authorization, policy enforcement, output compliance, and audit logging consistently before execution reaches a model.

**One Governance Layer. Every Application. Any Model.**

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

// result.flow     - resolved capability
// result.type     - "structured" | "text"
// result.data     - schema-validated output
```

API keys are scoped and governed server-side. Never embed them in client-side code or public repositories.

---

## How it works

Applications invoke Eric through a single API.

Eric applies governance before any model is executed.

1. **Intent classification** - determine the requested business capability
2. **Authorization** - verify the capability is approved for the client and application
3. **Policy enforcement** - evaluate execution policy before model invocation
4. **Capability routing** - route deterministically to the registered capability
5. **Model execution** - invoke the configured AI provider
6. **Output validation** - validate the response against the capability schema
7. **Audit logging** - record the execution outcome with a complete audit trail

If any governance check fails, execution stops. No fallback. No silent substitution. No model is invoked.

---

## Governing approved capabilities

Applications do not invoke models directly.

Applications invoke approved capabilities.

Eric determines whether a capability is authorized, applies governance controls, and routes execution to the appropriate AI provider.

Use `allowedFlows` to further restrict which capabilities are eligible for a specific request.

```ts
await eric.decide({
  text: "Generate a structured daily summary",
  allowedFlows: ["dailySummary"],
});
```

When `allowedFlows` is provided:

- Only capabilities in the allowed set are eligible
- If no match is found, execution is denied and logged
- No fallback or automatic substitution occurs

This provides request-level governance on top of deployment-level capability controls.

---

## Response shape

```ts
{
  flow: string;                // resolved capability
  type: "structured" | "text"; // output format
  data: unknown;               // schema-validated output
}
```

All responses conform to capability-level output contracts. Every field is validated before being returned to the application.

---

## Security & Governance

- Authorization and policy enforcement occur server-side
- API keys are scoped per client and governed centrally
- All executions - including blocked executions - are logged
- Customer data is never used to train third-party models
- BYOK (Bring Your Own Key) is supported for model providers
- Governance remains consistent regardless of underlying model provider

---

## Design principles

- **Centralized governance** - one governance layer across applications
- **Capability-first** - applications invoke approved capabilities, not models
- **Policy-enforced** - execution controls are applied before model invocation
- **Deterministic** - the same request under the same policy produces the same routing decision
- **Auditable** - every decision is recorded at execution time
- **Model-agnostic** - governance remains consistent across providers
- **Infrastructure-grade** - built for production and regulated environments

---

## Versioning

The Eric SDK follows semantic versioning.

Breaking changes reflect deliberate updates to governance guarantees and platform behavior, not implementation convenience.

See `CHANGELOG.md` for details.

---

## Support

For access, onboarding, or documentation:

https://ericaicontrol.dev

---

**Eric AI**

*One Governance Layer. Every Application. Any Model.*