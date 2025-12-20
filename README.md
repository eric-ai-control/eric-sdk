# 📘 Eric SDK (JavaScript + TypeScript)

**Official SDK for interacting with Eric AI — a governed, deterministic routing layer for AI systems.**

Eric evaluates incoming requests, applies routing constraints, selects the appropriate AI flow, and returns **structured, auditable outputs**.
Used in **Ingomu**, **EventInterface**, and early enterprise pilots.

---

## 🚀 Features

* 🔁 **Governed routing** via `eric.decide()`
* 🧭 Deterministic flow selection using the **decisionRouter**
* 🎯 Restricted auto-routing with `allowedFlows`
* 🔧 Direct flow execution with `eric.call()`
* 🔒 Public vs Private API key security model
* 🧠 Domain-aware tone and behavior (events, wellness, business)
* 🛡️ Domain whitelisting + rate limiting (public keys)
* 🧱 Strong TypeScript typing
* 🧰 Production-ready SDK backed by Firebase Cloud Functions

---

## 📦 Installation

```bash
npm install eric-sdk
```

---

## 🔑 API Keys (Important)

Eric supports **two types of API keys**, similar to Stripe or OpenAI.

### 🔓 Public Key (`pub_xxx`)

Safe for browser usage (Vue, React, etc.)

* Rate-limited
* Domain-whitelisted
* Restricted to **safe flows only**

Allowed flows with a public key:

* `decisionRouter`
* `shortTextSummary`
* `announcementRewriter`

Public keys **cannot** execute admin or sensitive flows.

---

### 🔐 Private Key (`priv_xxx`)

Server-to-server only.

* Full access to all flows
* No domain restriction
* Higher rate limits
* Intended for trusted backend workloads

⚠️ If a private key leaks, anyone can trigger billable flows — **the owning client is billed**.
This is the same model used by Stripe, OpenAI, Twilio, and AWS.

---

## 🔧 Quick Start — Governed Auto-Routing

```ts
import { EricSDK } from "eric-sdk";

const eric = new EricSDK({
  apiKey: process.env.ERIC_API_KEY!, // pub_ or priv_
  client: "eventinterface",
});

const result = await eric.decide({
  text: "I'm overwhelmed today.",
});
```

### Example response

```json
{
  "flow": "dailyNudgeGenerator",
  "type": "structured",
  "data": {
    "nudge": "You're building momentum — take a breath and trust your progress."
  },
  "meta": {
    "routingMode": "llm",
    "reason": "Detected emotional distress language"
  }
}
```

The `meta` field explains **why** a particular flow was chosen.

---

## 🎯 Auto-Routing with Restrictions

```ts
const result = await eric.decide({
  text: this.form.body,
  allowedFlows: ["announcementRewriter"],
  userState: {
    tone: "energetic",
    length: 150,
  },
});
```

### Guarantees

* Eric **must** choose `announcementRewriter`
* No unrelated flows can be selected
* Predictable, safe behavior for admin tools

---

## 🔧 Manual Flow Execution (Private Key Only)

```ts
const result = await eric.call("speakerPerformanceAnalyzer", {
  speakerName: "Jane Doe",
  feedbackComments: ["Loved the energy!", "Slides were unclear"],
});
```

Use `eric.call()` when:

* You already know the exact flow
* Running batch jobs or scheduled tasks
* Executing admin or restricted operations
* Using private server keys

---

## 🧠 When to Use `decide()` vs `call()`

| Method                          | Use Case                                       |
| ------------------------------- | ---------------------------------------------- |
| `eric.decide()`                 | Let Eric select the correct flow automatically |
| `eric.decide({ allowedFlows })` | Auto-routing restricted to a safe list         |
| `eric.call()`                   | Direct execution when flow is already known    |

---

## 🧱 Full SDK API

### `eric.decide(options)`

```ts
{
  text?: string;
  userState?: Record<string, any>;
  topic?: string;
  allowedFlows?: string[];
}
```

Returns:

```ts
{
  flow: string;
  type: "structured" | "text";
  data: any;
  meta?: {
    routingMode: "direct" | "requestType" | "signature" | "llm" | "forced";
    reason: string;
  };
}
```

---

### `eric.call(flow, data)`

Direct execution of a known flow.

---

## 🧩 Supported Flows

### Common

* `decisionRouter`
* `shortTextSummary`
* `questionAnswerHelper`
* `dailyNudgeGenerator`

### Wellness

* `aiCoachFeedback`
* `personalizedSessionRecommender`
* `wellnessProgressReporter`
* `trendInsightReporter`

### Events

* `eventSummaryDigest`
* `speakerPerformanceAnalyzer`
* `networkingMatchmaker`
* `attendeeEngagementReporter`
* `eventPulseReport`
* `sessionRecapGenerator`
* `sponsorValueSummary`
* `announcementRewriter`

### Business

* `leadershipInsight`
* `feedbackInsightAnalyzer`
* `performanceReviewAssistant`
* `teamDynamicsAnalyzer`
* `productivityCoach`

---

## 🌐 Public Key Security Model

Eric’s backend enforces:

### ✔ Allowed Flows

Public keys may only call:

* `decisionRouter`
* `shortTextSummary`
* `announcementRewriter`

---

### ✔ Domain Whitelisting

Only approved origins can access public keys:

```json
[
  "http://localhost:5173",
  "https://eventinterface.com",
  "https://www.eventinterface.com",
  "https://ingomu.com",
  "https://www.ingomu.com"
]
```

---

### ✔ Rate Limiting

* Default: **60 requests per minute per IP**
* Applies only to public keys
* Enforced automatically by the backend

---

## 🛡️ Private Key Rules

Private keys:

* Must be used server-side only
* Are not domain-restricted
* Can execute all flows
* Should be stored in environment variables
* Are billed per usage

---

## ⚙️ Configuration

```ts
new EricSDK({
  apiKey: "pub_xxx" | "priv_xxx",
  client: "eventinterface",
  baseUrl: "https://us-central1-eric-ai-prod.cloudfunctions.net/runFlow",
});
```

> **Note:**
> Domain context (events, wellness, business) is derived server-side from the client identity and is not required in the SDK configuration.

---

## 🧪 Local Development

```bash
npm link
# then in consuming project:
npm link eric-sdk
```

---

## 📄 License

MIT © 2025
