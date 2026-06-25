import axios from "axios";

export interface EricClientOptions {
  apiKey: string;
  client: string;
  baseUrl?: string;
}

export interface EricResponse {
  workflow: string;
  type: "structured" | "text";
  data: any;
  requestId: string;
}

export interface DecideInput {
  text?: string;
  topic?: string;
  workflow?: string;
  userState?: any;
  allowedWorkflows?: string[];
}

export class EricSDK {
  private apiKey: string;
  private client: string;
  private baseUrl: string;

  constructor(options: EricClientOptions) {
    this.apiKey = options.apiKey;
    this.client = options.client;
    this.baseUrl =
      options.baseUrl ??
      "https://us-central1-eric-ai-prod.cloudfunctions.net/decide";
  }

  async decide(input: DecideInput): Promise<EricResponse> {
    const { allowedWorkflows, workflow, ...rest } = input;

    const payload: any = {
      ...rest,
      text: rest.text ?? "implicit_intent",
    };

    if (workflow) {
      payload.workflow = workflow;
    }

    if (allowedWorkflows) {
      payload.allowedWorkflows = allowedWorkflows;
    }

    const res = await axios.post(this.baseUrl, payload, {
      headers: {
        "x-api-key": this.apiKey,
        "x-api-client": this.client,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  }
}
