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

    // Astra Persona Logic - truthful to local-only prototype
    if (lower.match(/avail|free|open to|hire him|when can/)) {
      response = `${nameGreeting}He's the founding designer at Entelligence AI and open to one serious conversation this quarter: a role, or a launch that needs motion, a site and product work from one person. If that's you, leave an email and he replies himself.`;
    } else if (lower.match(/built|work|portfolio|projects|show|what has|examples/)) {
      response = `The live entelligence.ai site in code, the Agent Insights launch film, Wrapped, the Leaderboard and the design system. Before that, the deck behind Composio's $25M Series A and the SWE-Kit and MCP launches. On his own time, a SaaS for cricket academies and a WhatsApp automation platform.`;
    } else if (lower.match(/call|meet|schedule|calendar/)) {
      response = `${nameGreeting}He does 20-minute calls. Leave your email and preferred times, and I'll make sure he sees it. (This prototype doesn't book calendars — I'll just make sure he gets the message.)`;
    } else if (lower.match(/hir|role|job|position|recruit|opening|team/)) {
      response = `${nameGreeting}Noted. What would the designer own, and the email he should reply to?`;
    } else if (lower.match(/project|film|video|site|website|launch|landing|deck|motion|build|design|need|want/)) {
      response = `${nameGreeting}Got it. Tell me what you're making, roughly when, and the email he should reply to. One message is fine.`;
    } else if (lower.match(/misread|not a pitch|real project|hiring|genuine|actually/)) {
      response = `${nameGreeting}Fair. What is it, when, and where should he reply?`;
    } else if (lower.match(/background|story|pivot/)) {
      response = `${nameGreeting}Nesar's path: Mechanical engineering -> digital marketing -> design -> design engineer. He designs the thing, then he makes the thing.`;
    } else if (lower.match(/@/)) {
      response = `${nameGreeting}Noted. Nesar will see that address and reply when he can.`;
    } else if (lower.match(/misread|not a pitch|real project|hiring|genuine|actually/)) {
      response = `${nameGreeting}Fair. What is it, when, and where should he reply?`;
    } else {
      response = `${nameGreeting}That one's not in my notes, so you'd have to ask him. Leave an email and I'll make sure he does.`;
    }

    return NextResponse.json({ response, timestamp: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}