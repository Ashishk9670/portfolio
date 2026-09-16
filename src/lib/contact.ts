import { mcpServer } from "@/lib/data";

const MESSAGES_BASE = mcpServer.remoteUrl;

export type SendMessageResult = "ok" | "rate_limited" | "error";

export async function sendContactMessage(input: {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot — always empty for real visitors
}): Promise<SendMessageResult> {
  if (!MESSAGES_BASE) return "error";
  try {
    const res = await fetch(`${MESSAGES_BASE}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.status === 429) return "rate_limited";
    if (!res.ok) return "error";
    return "ok";
  } catch {
    return "error";
  }
}
