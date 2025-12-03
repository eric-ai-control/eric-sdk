📘 Eric SDK (JavaScript + TypeScript)

Official SDK for interacting with the Eric AI Policy Engine.
Eric routes user input to the correct AI flow (or a restricted subset of flows) and returns structured, domain-aware results.

🚀 Features

Agentic routing with eric.decide()

Manual flow calls with eric.call(flowName, data)

Restricted routing with allowedFlows

Flow-specific structured responses

Domain-aware behavior (wellness, events, workplace)

Full TypeScript typing

Production-ready — used in Ingomu, EventInterface, and enterprise pilots

📦 Installation
npm install eric-sdk

🔑 Quick Start — Automatic Flow Selection
import { EricSDK } from "eric-sdk";

const eric = new EricSDK({
  apiKey: process.env.ERIC_API_KEY!,
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

🎯 Auto-Routing (Advanced)
🔹 Decide automatically
const result = await eric.decide({
  text: "Can you rewrite this announcement?",
});


Eric chooses the correct flow (announcementRewriter, shortTextSummary, etc.)

🔒 Restricting Auto-Routing (allowedFlows)

You can force Eric to only pick from certain flows.

Example: only allow announcement rewriting:

const result = await eric.decide({
  text: this.form.body,
  allowedFlows: ["announcementRewriter"],
  userState: {
    tone: "energetic",
    length: 150
  }
});


This guarantees:

Eric does not pick shortTextSummary

Eric must choose announcementRewriter

If allowedFlows has only one item, it will always choose that one

Example output:

{
  "flow": "announcementRewriter",
  "type": "structured",
  "data": {
    "rewritten": "Heads up! The pool party is now at the yacht club...",
    "toneUsed": "energetic"
  }
}

🔧 Manual Flow Execution

Use .call() to skip routing and directly invoke any flow:

const result = await eric.call("announcementRewriter", {
  announcement: "We moved the meeting.",
  tone: "friendly",
  length: 200
});


Useful for admin panels, batch processing, and scheduled tasks.

🧠 When to Use What
Method	Use When
eric.decide()	You want Eric to choose the correct flow automatically
eric.decide({ allowedFlows: [...] })	You want Eric to choose, but only within a safe controlled list
eric.call()	You already know which flow to use (like admin tools, backend tasks)
🧱 Full SDK API
eric.decide(options)
eric.decide({
  text?: string;
  userState?: Record<string, any>;
  topic?: string;
  allowedFlows?: string[];
});


Returns:

{
  flow: string;
  type: "structured" | "text";
  data: any;
}

eric.call(flowName, data)
const out = await eric.call("shortTextSummary", {
  text: "Make this clearer."
});


Equivalent to:

eric.runFlow({ flow: "shortTextSummary", data: {...} })

💬 Examples
Example 1 — Clean up an announcement (EventInterface admin)
const result = await eric.decide({
  text: this.form.body,
  allowedFlows: ["announcementRewriter"],
  userState: {
    tone: "energetic",
    length: 150,
  }
});

this.aiSummary = result.data.rewritten;

Example 2 — Generate a summary (default)
const result = await eric.decide({
  text: "Here is a long announcement, please make it shorter."
});


May produce:

shortTextSummary

announcementRewriter
(depends on the text)

Example 3 — Force a specific flow
await eric.call("speakerPerformanceAnalyzer", {
  speakerName: "Jane Doe",
  feedbackComments: ["Loved the energy!", "Slides were unclear"]
});

🧩 Supported Flows
Common

shortTextSummary

questionAnswerHelper

dailyNudgeGenerator

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

Business / Workplace

leadershipInsight

feedbackInsightAnalyzer

performanceReviewAssistant

teamDynamicsAnalyzer

productivityCoach

🌐 Configuration
new EricSDK({
  apiKey: "YOUR_API_KEY",
  client: "your-client-id",
  baseUrl: "https://us-central1-eric-ai-prod.cloudfunctions.net/runFlow"
});

🔧 Local Development
npm link


In your other project:

npm link eric-sdk

📄 License

MIT © 2025