// src/client.ts
import axios from "axios";
var EricSDK = class {
  constructor(options) {
    this.apiKey = options.apiKey;
    this.client = options.client;
    this.baseUrl = options.baseUrl ?? "https://us-central1-eric-ai-prod.cloudfunctions.net/runFlow";
  }
  /* -------------------------------------------------------------
   * 1) DIRECT CALL — developer explicitly chooses the flow
   * ------------------------------------------------------------- */
  async call(flowName, data) {
    const payload = {
      flow: flowName,
      data: {
        ...data,
        client: this.client
      }
    };
    const res = await axios.post(this.baseUrl, payload, {
      headers: {
        "x-api-key": this.apiKey,
        "x-api-client": this.client,
        "Content-Type": "application/json"
      }
    });
    return res.data.output;
  }
  /* -------------------------------------------------------------
   * 2) DECIDE — agentic routing with optional allowedFlows
   * ------------------------------------------------------------- */
  async decide(data) {
    const { allowedFlows, requestType, ...rest } = data;
    const payload = {
      flow: "decisionRouter",
      data: {
        ...rest,
        client: this.client,
        text: rest.text ?? "implicit_intent"
      }
    };
    if (requestType) {
      payload.data.requestType = requestType;
    }
    if (allowedFlows) {
      payload.data.allowedFlows = allowedFlows;
    }
    const res = await axios.post(this.baseUrl, payload, {
      headers: {
        "x-api-key": this.apiKey,
        "x-api-client": this.client,
        "Content-Type": "application/json"
      }
    });
    return res.data.output;
  }
};

// src/flows/helper.ts
function isSummary(result) {
  return result.flow === "shortTextSummary";
}
function isQA(result) {
  return result.flow === "questionAnswerHelper";
}
function isNudge(result) {
  return result.flow === "dailyNudgeGenerator";
}
function isRecommendation(result) {
  return result.flow === "personalizedSessionRecommender";
}
function isAICoachFeedback(result) {
  return result.flow === "aiCoachFeedback";
}
function isWellnessProgress(result) {
  return result.flow === "wellnessProgressReporter";
}
function isTrendInsight(result) {
  return result.flow === "trendInsightReporter";
}
function isEventSummary(result) {
  return result.flow === "eventSummaryDigest";
}
function isSpeakerPerformance(result) {
  return result.flow === "speakerPerformanceAnalyzer";
}
function isNetworkingMatches(result) {
  return result.flow === "networkingMatchmaker";
}
function isAttendeeEngagement(result) {
  return result.flow === "attendeeEngagementReporter";
}
function isEventPulse(result) {
  return result.flow === "eventPulseReport";
}
function isSessionRecap(result) {
  return result.flow === "sessionRecapGenerator";
}
function isSponsorSummary(result) {
  return result.flow === "sponsorValueSummary";
}
function isAnnouncementRewrite(result) {
  return result.flow === "announcementRewriter";
}
function isLeadershipInsight(result) {
  return result.flow === "leadershipInsight";
}
function isFeedbackInsight(result) {
  return result.flow === "feedbackInsightAnalyzer";
}
function isProductivityInsight(result) {
  return result.flow === "productivityCoach";
}
function isTeamDynamics(result) {
  return result.flow === "teamDynamicsAnalyzer";
}
function isPerformanceReview(result) {
  return result.flow === "performanceReviewAssistant";
}
export {
  EricSDK,
  isAICoachFeedback,
  isAnnouncementRewrite,
  isAttendeeEngagement,
  isEventPulse,
  isEventSummary,
  isFeedbackInsight,
  isLeadershipInsight,
  isNetworkingMatches,
  isNudge,
  isPerformanceReview,
  isProductivityInsight,
  isQA,
  isRecommendation,
  isSessionRecap,
  isSpeakerPerformance,
  isSponsorSummary,
  isSummary,
  isTeamDynamics,
  isTrendInsight,
  isWellnessProgress
};
