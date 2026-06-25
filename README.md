# Eric SDK (JavaScript / TypeScript)

Official SDK for **Eric AI** — a centralized governance platform for AI workflows.

Most organizations don't have one AI application anymore. They have many.

Customer-facing assistants, internal copilots, document workflows, automation tools, and AI-powered business applications are often developed independently. As AI adoption grows, governance becomes fragmented. Different applications implement different controls, different audit trails, different policies, and often different AI providers.

Eric provides a centralized governance layer for AI workflows.

Organizations define workflows once and govern execution consistently across teams, applications, and AI providers. Eric applies authorization, policy enforcement, validation, provider controls, PII protection, and audit logging before execution reaches a model.

**One Governance Layer. Every Workflow. Any Model.**

---

## Installation

```bash
npm install eric-sdk
```

Requires an Eric-issued API key.

Request access:

https://ericaicontrol.dev

---

## Quick Start

```ts
import { EricSDK } from "eric-sdk";

const eric = new EricSDK({
  apiKey: process.env.ERIC_API_KEY!,
  client: "your-app-id",
});

const result = await eric.decide({
  workflow: "support-ticket-classifier",
  payload: {
    ticketText: "Customers cannot access the billing portal.",
    customerName: "Acme Corp"
  }
});

// result.workflow - executed workflow
// result.type     - "structured" | "text"
// result.data     - validated output
```

API keys are governed server-side and should never be embedded in client-side applications or public repositories.

---

## Why Eric Exists

Most organizations don't have one AI workflow. They have many.

As teams adopt AI, governance becomes fragmented. Different applications implement different controls, maintain separate audit trails, use different providers, and create inconsistent execution behavior across the organization.

What begins as a few successful AI projects can quickly become operational complexity.

Eric centralizes governance by allowing organizations to define workflows once and apply governance consistently across applications, teams, and providers.

Applications do not invoke models directly.

Applications invoke governed workflows, and Eric determines how execution should occur.

---

## How It Works

Organizations define workflows.

Applications invoke those workflows through Eric.

Eric applies governance before any model is executed.

1. **Workflow resolution** — identify the requested workflow
2. **Authorization** — verify the workflow is approved for the client, application, and team
3. **Policy enforcement** — evaluate execution policy before model invocation
4. **PII protection** — apply configured privacy and compliance controls
5. **Provider selection** — determine the configured model provider
6. **Model execution** — invoke the selected provider
7. **Output validation** — validate the response against the workflow schema
8. **Audit logging** — record the execution outcome with a complete audit trail

If any governance check fails, execution stops.

No fallback.

No silent substitution.

No model is invoked.

---

## Defining Workflows

Eric is designed around workflows, not prompts.

A workflow represents a governed business outcome such as:

* Support Ticket Classification
* Contract Review
* Vendor Risk Assessment
* Claims Evaluation
* Customer Response Review
* Clinical Summary Generation

Organizations define workflows and their associated inputs, outputs, validation requirements, and execution policies.

Applications invoke workflows.

Eric governs execution.

This allows governance to remain centralized even as applications, teams, and underlying AI providers evolve.

---

## Restricting Workflow Access

Organizations can restrict which workflows are available to specific applications, departments, or teams.

Use `allowedWorkflows` to further constrain execution at request time.

```ts
await eric.decide({
  workflow: "daily-summary",
  allowedWorkflows: ["daily-summary"]
});
```

When `allowedWorkflows` is provided:

* Only workflows in the allowed set are eligible
* If the workflow is not authorized, execution is denied
* No fallback or automatic substitution occurs

This provides request-level governance on top of deployment-level workflow controls.

---

## Response Shape

```ts
{
  workflow: string;
  type: "structured" | "text";
  data: unknown;
}
```

All responses conform to workflow-level output contracts.

Every field is validated before being returned to the application.

---

## Security & Governance

* Authorization and policy enforcement occur server-side
* API keys are scoped per client and governed centrally
* Team and application access can be restricted to approved workflows
* All executions, including blocked executions, are logged
* Customer data is never used to train third-party models
* BYOK (Bring Your Own Key) is supported for model providers
* Governance remains consistent regardless of provider or model selection

---

## Design Principles

### Workflow First

Applications invoke workflows, not models.

### Centralized Governance

One governance layer across applications and AI providers.

### Policy Enforced

Execution controls are applied before model invocation.

### Deterministic

The same workflow under the same policy produces the same routing decision.

### Auditable

Every execution decision is recorded.

### Model Agnostic

Governance remains consistent even when providers change.

### Infrastructure Grade

Built for production and regulated environments.

---

## Model Independence

Organizations should be free to adopt new models as the ecosystem evolves.

Because governance lives outside the model itself, organizations can:

* Change providers
* Upgrade models
* Introduce new workflows
* Evolve execution policies

without rebuilding governance across every application.

The model becomes the execution engine.

Eric becomes the control plane.

---

## Versioning

The Eric SDK follows semantic versioning.

Breaking changes reflect deliberate updates to governance guarantees and platform behavior, not implementation convenience.

See `CHANGELOG.md` for details.

---

## Support

For access, onboarding, or technical documentation:

https://ericaicontrol.dev

---

# Eric AI

Organizations define workflows once and govern execution everywhere.

**One Governance Layer. Every Workflow. Any Model.**
