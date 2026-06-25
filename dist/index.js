// src/client.ts
import axios from "axios";
var EricSDK = class {
  constructor(options) {
    this.apiKey = options.apiKey;
    this.client = options.client;
    this.baseUrl = options.baseUrl ?? "https://us-central1-eric-ai-prod.cloudfunctions.net/decide";
  }
  async decide(input) {
    const { allowedWorkflows, workflow, ...rest } = input;
    const payload = {
      ...rest,
      text: rest.text ?? "implicit_intent"
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
        "Content-Type": "application/json"
      }
    });
    return res.data;
  }
};
export {
  EricSDK
};
