📘 Eric SDK (JavaScript + TypeScript)

Official SDK for interacting with the Eric AI Policy Engine.

Eric routes incoming text to the correct AI flow, applies policy rules, and returns structured, domain-aware responses.
Used in Ingomu, EventInterface, and enterprise pilots.

🚀 Features

🔁 Agentic routing with eric.decide()

🔒 Public vs Private key security model

🧩 Manual flow execution with eric.call()

🎯 Restricted auto-routing with allowedFlows

🧱 Strong TypeScript typing

🧠 Structured responses per domain (events, wellness, business)

🛡️ Domain whitelisting + rate limiting support

🧰 Production-ready SDK + Cloud Function backend

📦 Installation
npm install eric-sdk

🔑 API Keys (Important)

Eric supports two types of API keys:

🔓 Public Key (pub_xxx)

Safe for browser use (Vue, React, etc.)

Rate limited

Restricted to safe flows only:

policyDecisionMaker

shortTextSummary

announcementRewriter

Domain-whitelisted (only allowed origins can use it)

🔐 Private Key (priv_xxx)

Server-to-server only

Full access to all flows

Not domain restricted

Not rate-limited in the same way (intended for trusted workloads)

If a private key leaks, anyone can call paid flows — the client who owns the key is billed.
This is the same security model Stripe, OpenAI, AWS, and Twilio use.

🔧 Quick Start — Automatic Routing (Public or Private Key)
import { EricSDK } from "eric-sdk";

const eric = new EricSDK({
  apiKey: process.env.ERIC_API_KEY!,  // pub_ or priv_
  client: "eventinterface",
});

const result = await eric.decide({
  text: "I'm overwhelmed today.",
});


Example output:

{
  "flow": "dailyNudgeGenerator",
  "type": "structured",
  "data": {
    "nudge": "You're building momentum — take a breath and trust your progress."
  }
}

🎯 Auto-Routing With Restrictions
const result = await eric.decide({
  text: this.form.body,
  allowedFlows: ["announcementRewriter"],
  userState: {
    tone: "energetic",
    length: 150,
  }
});


Guarantees:

Eric must choose announcementRewriter

It cannot choose unrelated flows

Predictable behavior for admin tools

🔧 Manual Flow Execution (Server Key)
const result = await eric.call("speakerPerformanceAnalyzer", {
  speakerName: "Jane Doe",
  feedbackComments: ["Loved the energy!", "Slides were unclear"]
});


Use .call() when:

Running batch jobs

Executing admin/restricted flows

Using private server keys

🧠 When to Use decide() vs call()
Method	Use Case
eric.decide()	Let Eric select the correct flow automatically
eric.decide({ allowedFlows })	Auto-routing but restricted to safe list
eric.call()	You already know the flow (backend tasks, admin tools)
🧱 Full SDK API
eric.decide(options)
{
  text?: string;
  userState?: Record<string, any>;
  topic?: string;
  allowedFlows?: string[];
}


Returns:

{
  flow: string;
  type: "structured" | "text";
  data: any;
}

eric.call(flow, data)

Direct flow execution.

🧩 Supported Flows
Common

shortTextSummary

questionAnswerHelper

dailyNudgeGenerator

policyDecisionMaker

Wellness

aiCoachFeedback

personalizedSessionRecommender

wellnessProgressReporter

trendInsightReporter

Events

eventSummaryDigest

speakerPerformanceAnalyzer

networkingMatchmaker

attendeeEngagementReporter

eventPulseReport

sessionRecapGenerator

sponsorValueSummary

announcementRewriter

Business

leadershipInsight

feedbackInsightAnalyzer

performanceReviewAssistant

teamDynamicsAnalyzer

productivityCoach

🌐 Public Key Security Model

Eric’s backend enforces:

✔ Allowed flows

Public keys can only call:

policyDecisionMaker

shortTextSummary

announcementRewriter

✔ Domain Whitelist

Only approved origins can call your endpoint:

Examples:

[
  "http://localhost:5173",
  "https://eventinterface.com",
  "https://www.eventinterface.com",
  "https://ingomu.com",
  "https://www.ingomu.com"
]

✔ Rate Limiting

Default: 60 requests per minute per IP
Applies only to public keys.

Backend logic automatically blocks excess requests.

🛡️ Private Key Rules

Private keys:

Must be used only on backend servers

Have no public flow restriction

Are not domain-locked

Can execute all flows

Should be stored in environment variables only

If leaked, someone could trigger paid calls → your account is billed

This is identical to OpenAI, Stripe, and Twilio.

🔧 Configuration (Client + Server)
new EricSDK({
  apiKey: "pub_xxx" | "priv_xxx",
  client: "eventinterface",
  baseUrl: "https://us-central1-eric-ai-prod.cloudfunctions.net/runFlow"
});

⚙️ Local Development
npm link
# then in consuming project:
npm link eric-sdk

📄 License

MIT © 2025