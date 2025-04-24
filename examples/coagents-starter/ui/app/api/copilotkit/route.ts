import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { experimental_createMCPClient } from "ai";

import { NextRequest } from "next/server";

const serviceAdapter = new OpenAIAdapter();
const runtime = new CopilotRuntime({
  mcpServers: [
    {
      endpoint:
        "https://mcp.composio.dev/hackernews/rapping-fluffy-lighter-fCaF5V",
    },
  ],
  // @ts-ignore
  createMCPClient: async (config) => {
    return await experimental_createMCPClient({
      transport: {
        type: "sse",
        url: config.endpoint,
        headers: config.apiKey
          ? { Authorization: `Bearer ${config.apiKey}` }
          : undefined,
      },
    });
  },
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
