import axios from "axios";

export interface EricClientOptions {
  apiKey: string;
  client: string;               // ingomu, eventinterface, etc.
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
  private baseUrl: string;

  constructor(options: EricClientOptions) {
    this.apiKey = options.apiKey;
    this.client = options.client;
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
    text?: string;
    topic?: string;
    requestType?: string;
    userState?: any;
    allowedFlows?: string[];
  }): Promise<EricResponse> {
    const { allowedFlows, requestType, ...rest } = data;

    const payload: any = {
      flow: "decisionRouter",
      data: {
        ...rest,
        client: this.client,
        text: rest.text ?? "implicit_intent",
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
        "Content-Type": "application/json",
      }
    });

    return res.data.output;
  }
}
