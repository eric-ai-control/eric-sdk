# Eric SDK (JavaScript / TypeScript)

Official SDK for interacting with **Eric AI**, a policy-governed execution layer for AI systems.

Eric is designed for environments where AI behavior must be **controlled, deterministic, and auditable**.  
All requests are evaluated against configured policy before any capability is executed.

This SDK exposes a single, safe interaction model that enforces those guarantees by default.

---

## Installation

```bash
npm install eric-sdk
```

---

## Authentication

You will need an Eric-issued API key.

```ts
import { EricSDK } from "eric-sdk";

const eric = new EricSDK({
  apiKey: process.env.ERIC_API_KEY!,
  client: "your-app-id",
});
```

API keys are scoped and governed server-side.
Keys should be treated as secrets and stored securely.

---

## Security Notice

This SDK enforces server-side policy and execution controls.

API keys must be stored securely and never embedded in public repositories.

---

## Usage

### Policy-Governed Execution

All interactions with Eric are routed through `decide()`.

Eric evaluates each request against policy, routing constraints, and execution bounds before selecting and invoking an approved capability.

```ts
const result = await eric.decide({
  text: "summarize the provided content",
  requestType: "summary",
});
```

---

### Optional Execution Bounds

You may optionally restrict which capabilities are eligible for execution.

```ts
await eric.decide({
  text: "Generate a structured daily summary for the provided input",
  allowedFlows: ["dailySummary"],
});
```

When bounds are provided:

* Only approved capabilities may execute
* No out-of-scope behavior is permitted
* Results remain deterministic and auditable

---

## Response Shape

```ts
{
  flow: string;
  type: string;
  data: unknown;
}
```

All responses conform to pre-approved output contracts.

All fields are guaranteed to be present according to the executed capability’s contract.

---

## Design Principles

* **Policy-first execution** — no direct or bypassed calls
* **Deterministic behavior** — predictable outputs by design
* **Auditability** — every decision and execution is logged
* **Infrastructure-grade** — built for production systems, not chatbots

---

## Versioning

The Eric SDK follows semantic versioning.

Breaking changes reflect deliberate enforcement of governance and safety guarantees.

Pre-1.0 versions were experimental and are not supported.

See `CHANGELOG.md` for details.

---

## Support

For access, onboarding, or documentation:
[https://ericaicontrol.dev](https://ericaicontrol.dev)


