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
interface DecideInput {
    text?: string;
    topic?: string;
    requestType?: string;
    userState?: any;
    allowedFlows?: string[];
}
declare class EricSDK {
    private apiKey;
    private client;
    private baseUrl;
    constructor(options: EricClientOptions);
    decide(input: DecideInput): Promise<EricResponse>;
}

export { type DecideInput, type EricClientOptions, type EricResponse, EricSDK };
