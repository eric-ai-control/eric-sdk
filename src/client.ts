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

export interface DecideInput {
  text?: string;
  topic?: string;
  requestType?: string;
  userState?: any;
  allowedFlows?: string[];
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

  /* -------------------------------------------------------------
   * DECIDE — policy-governed execution
   * ------------------------------------------------------------- */
  async decide(input: DecideInput): Promise<EricResponse> {
    const { allowedFlows, requestType, ...rest } = input;

    const payload: any = {
      data: {
        ...rest,
        client: this.client,
        text: rest.text ?? "implicit_intent",
      },
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
      },
    });

    return res.data.output;
  }
}
