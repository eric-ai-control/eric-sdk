import {
  ShortTextSummary,
  QuestionAnswerSummary,
  DailyNudge,
  SessionRecommendation,
  AICoachFeedback,
  WellnessProgress,
  TrendInsight,
  EventSummaryDigest,
  SpeakerPerformance,
  NetworkingMatches,
  AttendeeEngagement,
  EventPulse,
  SessionRecap,
  SponsorValueSummary,
  AnnouncementRewrite,
  LeadershipInsight,
  FeedbackInsight,
  PerformanceReview,
  TeamDynamics,
  ProductivityInsight
} from "../types/flow";

// COMMON ---------------------------------------------------

export function isSummary(result: any): result is { data: ShortTextSummary } {
  return result.flow === "shortTextSummary";
}

export function isQA(result: any): result is { data: QuestionAnswerSummary } {
  return result.flow === "questionAnswerHelper";
}

export function isNudge(result: any): result is { data: DailyNudge } {
  return result.flow === "dailyNudgeGenerator";
}

// WELLNESS --------------------------------------------------

export function isRecommendation(result: any): result is { data: SessionRecommendation } {
  return result.flow === "personalizedSessionRecommender";
}

export function isAICoachFeedback(result: any): result is { data: AICoachFeedback } {
  return result.flow === "aiCoachFeedback";
}

export function isWellnessProgress(result: any): result is { data: WellnessProgress } {
  return result.flow === "wellnessProgressReporter";
}

export function isTrendInsight(result: any): result is { data: TrendInsight } {
  return result.flow === "trendInsightReporter";
}

// EVENTS ----------------------------------------------------

export function isEventSummary(result: any): result is { data: EventSummaryDigest } {
  return result.flow === "eventSummaryDigest";
}

export function isSpeakerPerformance(result: any): result is { data: SpeakerPerformance } {
  return result.flow === "speakerPerformanceAnalyzer";
}

export function isNetworkingMatches(result: any): result is { data: NetworkingMatches } {
  return result.flow === "networkingMatchmaker";
}

export function isAttendeeEngagement(result: any): result is { data: AttendeeEngagement } {
  return result.flow === "attendeeEngagementReporter";
}

export function isEventPulse(result: any): result is { data: EventPulse } {
  return result.flow === "eventPulseReport";
}

export function isSessionRecap(result: any): result is { data: SessionRecap } {
  return result.flow === "sessionRecapGenerator";
}

export function isSponsorSummary(result: any): result is { data: SponsorValueSummary } {
  return result.flow === "sponsorValueSummary";
}

export function isAnnouncementRewrite(result: any): result is { data: AnnouncementRewrite } {
  return result.flow === "announcementRewriter";
}

// BUSINESS --------------------------------------------------

export function isLeadershipInsight(result: any): result is { data: LeadershipInsight } {
  return result.flow === "leadershipInsight";
}

export function isFeedbackInsight(result: any): result is { data: FeedbackInsight } {
  return result.flow === "feedbackInsightAnalyzer";
}

export function isProductivityInsight(result: any): result is { data: ProductivityInsight } {
  return result.flow === "productivityCoach";
}

export function isTeamDynamics(result: any): result is { data: TeamDynamics } {
  return result.flow === "teamDynamicsAnalyzer";
}

export function isPerformanceReview(result: any): result is { data: PerformanceReview } {
  return result.flow === "performanceReviewAssistant";
}
