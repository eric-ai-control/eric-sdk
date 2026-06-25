interface EricClientOptions {
    apiKey: string;
    client: string;
    baseUrl?: string;
}
interface EricResponse {
    workflow: string;
    type: "structured" | "text";
    data: any;
    requestId: string;
}
interface DecideInput {
    text?: string;
    topic?: string;
    workflow?: string;
    userState?: any;
    allowedWorkflows?: string[];
}
declare class EricSDK {
    private apiKey;
    private client;
    private baseUrl;
    constructor(options: EricClientOptions);
    decide(input: DecideInput): Promise<EricResponse>;
}

export { type DecideInput, type EricClientOptions, type EricResponse, EricSDK };
