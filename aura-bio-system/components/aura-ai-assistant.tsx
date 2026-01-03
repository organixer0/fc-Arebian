"use client"

import { useState } from "react"
import { Sparkles, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

export function AuraAIAssistant() {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    initialMessages: [
      {
        id: "initial",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! I'm Aura AI, your advanced bio-intelligence assistant. How can I help you with your health today?",
          },
        ],
      },
    ],
  })

  const handleSend = () => {
    if (!input.trim() || status !== "ready") return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <Card className="glass-card flex h-[500px] flex-col overflow-hidden border-none shadow-2xl">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-white/10 bg-white/5 p-4 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-bold tracking-tight">Aura AI</CardTitle>
          <span className="text-xs text-muted-foreground">Advanced Bio-Intelligence Active</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-[360px] p-4">
          <div className="flex flex-col gap-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                  m.role === "assistant"
                    ? "bg-white/10 text-foreground self-start rounded-tl-none border border-white/5"
                    : "bg-primary text-primary-foreground self-end rounded-tr-none",
                )}
              >
                {m.parts.map((part, i) => (
                  <div key={i}>{part.type === "text" ? part.text : null}</div>
                ))}
              </div>
            ))}
            {status === "submitted" && (
              <div className="bg-white/10 text-foreground self-start rounded-2xl rounded-tl-none border border-white/5 px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t border-white/10 bg-white/5 p-4">
          <div className="relative flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Aura anything about your health..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              disabled={status !== "ready"}
            />
            <Button
              size="icon"
              className="rounded-xl h-10 w-10 shrink-0"
              onClick={handleSend}
              disabled={status !== "ready"}
            >
              {status === "streaming" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
