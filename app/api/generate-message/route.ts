import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { NETWORKING_GOALS, NetworkingGoal } from "@/lib/types/swipe";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { profile, userProfile, networkingGoal } = await request.json();

    if (!profile?.name || !profile?.title || !profile?.company) {
      return NextResponse.json(
        { error: "Missing required profile fields" },
        { status: 400 }
      );
    }

    const userContext = userProfile
      ? `
ABOUT THE SENDER (you are writing on behalf of this person):
Name: ${userProfile.name}
Title: ${userProfile.title}
Company: ${userProfile.company}
Headline: ${userProfile.headline}
Background: ${userProfile.summary}
`
      : "";

    const goalConfig = NETWORKING_GOALS.find(
      (g) => g.id === (networkingGoal as NetworkingGoal)
    );
    const goalContext = goalConfig
      ? `
NETWORKING GOAL: ${goalConfig.label}
TONE GUIDANCE: ${goalConfig.promptHint}
`
      : "";

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `Generate a professional, warm, and concise LinkedIn networking message (2-3 paragraphs, under 200 words) to connect with this person:

RECIPIENT:
Name: ${profile.name}
Title: ${profile.title}
Company: ${profile.company}
Headline: ${profile.headline}
About: ${profile.summary}
Mutual connections: ${profile.mutualConnections}
${userContext}${goalContext}
The message should:
- Start with a personalized opener referencing something specific about the recipient's work
- Clearly articulate what value the sender brings — highlight relevant experience, skills, or shared interests that would make this connection mutually beneficial
- Position the sender as someone who can contribute, not just someone who wants something
- Find genuine common ground between the sender's background and the recipient's work
- Match the tone and intent described in the NETWORKING GOAL and TONE GUIDANCE above
- Be conversational but professional, not overly formal or salesy
- End with a soft call to action (e.g., "Would love to exchange ideas sometime")
- NOT include a subject line, just the message body
- Feel authentic and human, not templated
- Keep it under 150 words — busy professionals appreciate brevity`,
        },
      ],
    });

    const generatedText = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return NextResponse.json({ message: generatedText });
  } catch (error) {
    console.error("Error generating message:", error);

    return NextResponse.json(
      {
        error: "Failed to generate message",
        fallback:
          "Hi! I came across your profile and was really impressed by your work. I'd love to connect and learn more about what you're building. Would you be open to a brief chat sometime?",
      },
      { status: 500 }
    );
  }
}
