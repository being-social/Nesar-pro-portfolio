import { NextResponse } from "next/server";
import { NESAR_KNOWLEDGE_BASE } from "@/lib/hermes/knowledge";

export async function POST(req: Request) {
  try {
    const { message, visitorName } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const lower = message.toLowerCase();
    const nameGreeting = visitorName ? `${visitorName}, ` : "";

    let response = "";

    // Knowledge-driven logic using exported KB object
    if (lower.includes("deck") || lower.includes("25m") || lower.includes("composio")) {
      response = `${nameGreeting}At Composio, I was the sole designer. I built the pitch deck that helped secure their $25M Series A led by Lightspeed Venture Partners. Also designed their SWE-Kit and MCP launch sites and videos.`;
    } else if (lower.includes("entelligence") || lower.includes("current")) {
      response = `${nameGreeting}I'm the founding designer at ${NESAR_KNOWLEDGE_BASE.profile.role.split("@ ")[1]}. For the first year, I owned product UX, brand, the live website, motion, and investor decks.`;
    } else if (lower.includes("available") || lower.includes("hiring") || lower.includes("job")) {
      response = `${nameGreeting}Nesar is committed to his current role during the final stages of the company's Series A. He's not actively looking right now, but always open to hearing about compelling AI product work.`;
    } else if (lower.includes("stack") || lower.includes("build") || lower.includes("code")) {
      response = `Nesar designs and ships in code: ${NESAR_KNOWLEDGE_BASE.stack.join(", ")}. No handoffs — designs the thing, then makes the thing.`;
    } else if (lower.includes("background") || lower.includes("story") || lower.includes("pivot")) {
      response = `Nesar's path: ${NESAR_KNOWLEDGE_BASE.experience.earliest.split("->")[0]} -> digital marketing -> design -> design engineer.`;
    } else {
      response = `${nameGreeting}I'm Hermes, Nesar's portfolio agent. I'm scope-locked to his work as a ${NESAR_KNOWLEDGE_BASE.profile.focus.toLowerCase()}. Ask me about his work at Entelligence, the Composio deck, or his design-engineering stack.`;
    }

    return NextResponse.json({ response, timestamp: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
