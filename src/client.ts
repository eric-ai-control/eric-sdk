import axios from "axios";

export interface EricClientOptions {
  apiKey: string;
  client: string;               // ingomu, eventinterface, etc.
  appId: "wellness" | "events" | "business"; // REQUIRED for policy engine
  baseUrl?: string;
}

export interface EricResponse {
  flow: string;
  type: string;
  data: any;
}

export class EricSDK {
  private apiKey: string;
  private client: string;
  private appId: string;
  private baseUrl: string;

  constructor(options: EricClientOptions) {
    this.apiKey = options.apiKey;
    this.client = options.client;
    this.appId = options.appId;   // <-- FIXED: needed for policy input
    this.baseUrl =
      options.baseUrl ??
      "https://us-central1-eric-ai-prod.cloudfunctions.net/runFlow";
  }

  /* -------------------------------------------------------------
   * 1) DIRECT CALL — developer explicitly chooses the flow
   * ------------------------------------------------------------- */
  async call(flowName: string, data: any): Promise<EricResponse> {
    const payload = {
      flow: flowName,
      data: {
        ...data,
        client: this.client,
        appId: this.appId
      }
    };

    const res = await axios.post(this.baseUrl, payload, {
      headers: {
        "x-api-key": this.apiKey,
        "x-api-client": this.client,
        "Content-Type": "application/json",
      }
    });

    return res.data.output;
  }

  /* -------------------------------------------------------------
   * 2) DECIDE — agentic routing with optional allowedFlows
   * ------------------------------------------------------------- */
  async decide(data: {
    text: string;
    topic?: string;
    userState?: any;
    allowedFlows?: string[];
  }): Promise<EricResponse> {
    const { allowedFlows, ...rest } = data;

    const payload: any = {
      flow: "decisionRouter",
      data: {
        ...rest,
        client: this.client,
        appId: this.appId
      }
    };

    if (allowedFlows) {
      payload.data.allowedFlows = allowedFlows;
    }

    const res = await axios.post(this.baseUrl, payload, {
      headers: {
        "x-api-key": this.apiKey,
        "x-api-client": this.client,
        "Content-Type": "application/json",
      }
    });

    return res.data.output;
  }
}
