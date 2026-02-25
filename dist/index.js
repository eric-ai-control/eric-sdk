// src/client.ts
import axios from "axios";
var EricSDK = class {
  constructor(options) {
    this.apiKey = options.apiKey;
    this.client = options.client;
    this.baseUrl = options.baseUrl ?? "https://us-central1-eric-ai-prod.cloudfunctions.net/decide";
  }
  /* -------------------------------------------------------------
   * DECIDE — policy-governed execution
   * ------------------------------------------------------------- */
  async decide(input) {
    const { allowedFlows, requestType, ...rest } = input;
    const payload = {
      data: {
        ...rest,
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
export {
  EricSDK
};
