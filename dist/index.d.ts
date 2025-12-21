interface EricClientOptions {
    apiKey: string;
    client: string;
    baseUrl?: string;
}
interface EricResponse {
    flow: string;
    type: string;
    data: any;
}
declare class EricSDK {
    private apiKey;
    private client;
    private baseUrl;
    constructor(options: EricClientOptions);
    call(flowName: string, data: any): Promise<EricResponse>;
    decide(data: {
        text?: string;
        topic?: string;
        requestType?: string;
        userState?: any;
        allowedFlows?: string[];
    }): Promise<EricResponse>;
}

interface ShortTextSummary {
    summary: string;
}
interface QAItem {
    question: string;
    answer: string;
}
interface QuestionAnswerSummary {
    summary: string;
    questions: QAItem[];
}
interface DailyNudge {
    nudge: string;
}
interface RecommendationItem {
    id: string;
    title: string;
    reason: string;
}
interface SessionRecommendation {
    recommendations: RecommendationItem[];
    rationale: string;
}
interface AICoachFeedback {
    summary: string;
    encouragement: string;
    suggestedNextFocus: string;
    tone: string;
}
interface WellnessProgress {
    summary: string;
    encouragement: string;
    tone: string;
}
interface TrendInsight {
    trendSummary: string;
    emotionalPattern: string;
    recommendation: string;
    tone: string;
}
interface EventSummaryDigest {
    summary: string;
    highlights: string[];
    tone: string;
}
interface SpeakerPerformance {
    overview: string;
    strengths: string[];
    areasForImprovement: string[];
    tone: string;
}
interface NetworkingMatches {
    matches: string[];
    rationale: string;
}
interface AttendeeEngagement {
    overview: string;
    topSessions: string[];
    recommendations: string[];
    tone: string;
}
interface EventPulse {
    trendSummary: string;
    sentimentOverview: string;
    engagementInsights: string;
    recommendation: string;
    tone: string;
}
interface SessionRecap {
    recap: string;
    takeaways: string[];
    tone: string;
}
interface SponsorValueSummary {
    overview: string;
    highlights: string[];
    tone: string;
}
interface AnnouncementRewrite {
    rewritten: string;
    toneUsed: string;
}
interface LeadershipInsight {
    insight: string;
    rootCause: string;
    practicalSteps: string[];
    tone: string;
}
interface FeedbackInsight {
    sentiment: string;
    summary: string;
    highlights: string[];
}
interface PerformanceReview {
    summaryParagraph: string;
    strengthsSection: string[];
    growthSection: string[];
    tone: string;
}
interface TeamDynamics {
    diagnosis: string;
    risks: string[];
    suggestedMoves: string[];
    tone: string;
}
interface ProductivityInsight {
    insight: string;
    suggestions: string[];
    tone: string;
}

declare function isSummary(result: any): result is {
    data: ShortTextSummary;
};
declare function isQA(result: any): result is {
    data: QuestionAnswerSummary;
};
declare function isNudge(result: any): result is {
    data: DailyNudge;
};
declare function isRecommendation(result: any): result is {
    data: SessionRecommendation;
};
declare function isAICoachFeedback(result: any): result is {
    data: AICoachFeedback;
};
declare function isWellnessProgress(result: any): result is {
    data: WellnessProgress;
};
declare function isTrendInsight(result: any): result is {
    data: TrendInsight;
};
declare function isEventSummary(result: any): result is {
    data: EventSummaryDigest;
};
declare function isSpeakerPerformance(result: any): result is {
    data: SpeakerPerformance;
};
declare function isNetworkingMatches(result: any): result is {
    data: NetworkingMatches;
};
declare function isAttendeeEngagement(result: any): result is {
    data: AttendeeEngagement;
};
declare function isEventPulse(result: any): result is {
    data: EventPulse;
};
declare function isSessionRecap(result: any): result is {
    data: SessionRecap;
};
declare function isSponsorSummary(result: any): result is {
    data: SponsorValueSummary;
};
declare function isAnnouncementRewrite(result: any): result is {
    data: AnnouncementRewrite;
};
declare function isLeadershipInsight(result: any): result is {
    data: LeadershipInsight;
};
declare function isFeedbackInsight(result: any): result is {
    data: FeedbackInsight;
};
declare function isProductivityInsight(result: any): result is {
    data: ProductivityInsight;
};
declare function isTeamDynamics(result: any): result is {
    data: TeamDynamics;
};
declare function isPerformanceReview(result: any): result is {
    data: PerformanceReview;
};

export { type AICoachFeedback, type AnnouncementRewrite, type AttendeeEngagement, type DailyNudge, type EricClientOptions, type EricResponse, EricSDK, type EventPulse, type EventSummaryDigest, type FeedbackInsight, type LeadershipInsight, type NetworkingMatches, type PerformanceReview, type ProductivityInsight, type QAItem, type QuestionAnswerSummary, type RecommendationItem, type SessionRecap, type SessionRecommendation, type ShortTextSummary, type SpeakerPerformance, type SponsorValueSummary, type TeamDynamics, type TrendInsight, type WellnessProgress, isAICoachFeedback, isAnnouncementRewrite, isAttendeeEngagement, isEventPulse, isEventSummary, isFeedbackInsight, isLeadershipInsight, isNetworkingMatches, isNudge, isPerformanceReview, isProductivityInsight, isQA, isRecommendation, isSessionRecap, isSpeakerPerformance, isSponsorSummary, isSummary, isTeamDynamics, isTrendInsight, isWellnessProgress };
