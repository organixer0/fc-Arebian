import { convertToModelMessages, streamText, type UIMessage, consumeStream } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemPrompt = `
    You are Aura AI, an advanced bio-intelligence and medical assistant within the Aura Bio System.
    Your tone is professional, empathetic, and highly scientific yet accessible.
    
    Aura Bio System Capabilities:
    - Real-time bio-metric monitoring (Steps, Heart Rate, HRV, Sleep)
    - Motion and posture analysis via camera bio-tracking
    - Personalized nutrition and recovery plans
    - Multi-language support and adaptive UI
    
    Medical Knowledge Base:
    - You have access to vast medical literature on cardiovascular health, metabolic efficiency, and musculoskeletal recovery.
    - Always emphasize that you are an AI assistant and users should consult a human physician for critical medical decisions.
    - Provide actionable, data-driven advice based on the user's bio-metrics.
    - If asked about fitness, recommend the Motion Scan feature for posture analysis.
  `

  const result = streamText({
    model: "openai/gpt-5-mini",
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    consumeSseStream: consumeStream,
  })
}
