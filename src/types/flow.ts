// COMMON --------------------------------------------------

export interface ShortTextSummary {
  summary: string;
}

export interface QAItem {
  question: string;
  answer: string;
}

export interface QuestionAnswerSummary {
  summary: string;
  questions: QAItem[];
}

export interface DailyNudge {
  nudge: string;
}

// WELLNESS --------------------------------------------------

export interface RecommendationItem {
  id: string;
  title: string;
  reason: string;
}

export interface SessionRecommendation {
  recommendations: RecommendationItem[];
  rationale: string;
}

export interface AICoachFeedback {
  summary: string;
  encouragement: string;
  suggestedNextFocus: string;
  tone: string;
}

export interface WellnessProgress {
  summary: string;
  encouragement: string;
  tone: string;
}

export interface TrendInsight {
  trendSummary: string;
  emotionalPattern: string;
  recommendation: string;
  tone: string;
}

// EVENTS ----------------------------------------------------

export interface EventSummaryDigest {
  summary: string;
  highlights: string[];
  tone: string;
}

export interface SpeakerPerformance {
  overview: string;
  strengths: string[];
  areasForImprovement: string[];
  tone: string;
}

export interface NetworkingMatches {
  matches: string[];
  rationale: string;
}

export interface AttendeeEngagement {
  overview: string;
  topSessions: string[];
  recommendations: string[];
  tone: string;
}

export interface EventPulse {
  trendSummary: string;
  sentimentOverview: string;
  engagementInsights: string;
  recommendation: string;
  tone: string;
}

export interface SessionRecap {
  recap: string;
  takeaways: string[];
  tone: string;
}

export interface SponsorValueSummary {
  overview: string;
  highlights: string[];
  tone: string;
}

export interface AnnouncementRewrite {
  rewritten: string;
  toneUsed: string;
}

// BUSINESS --------------------------------------------------

export interface LeadershipInsight {
  insight: string;
  rootCause: string;
  practicalSteps: string[];
  tone: string;
}

export interface FeedbackInsight {
  sentiment: string;
  summary: string;
  highlights: string[];
}

export interface PerformanceReview {
  summaryParagraph: string;
  strengthsSection: string[];
  growthSection: string[];
  tone: string;
}

export interface TeamDynamics {
  diagnosis: string;
  risks: string[];
  suggestedMoves: string[];
  tone: string;
}

export interface ProductivityInsight {
  insight: string;
  suggestions: string[];
  tone: string;
}
