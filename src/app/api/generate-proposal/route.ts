import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { scope, tone, industry } = await req.json();

    const messages = [
        {
            role: "system",
            content: `You are an expert freelance proposal writer.`,
        },
        {
            role: "user",
            content: `Write a complete project proposal in the following format:

1. Proposal Description
2. Deliverables
3. Timeline
4. Pricing Estimate
5. Terms

Use this input:
- Project Scope: ${scope}
- Tone: ${tone}
- Industry: ${industry}
`,
        },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct", // or try: "nousresearch/nous-capybara-7b"
            messages,
        }),
    });

    const data = await response.json();
    const output = data.choices?.[0]?.message?.content;

    return NextResponse.json({
        proposal: output || "❌ Failed to generate proposal",
    });
}
