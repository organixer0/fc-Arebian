"use client"

import { cn } from "@/lib/utils"

import { Footprints, Heart, Zap, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function HealthMetrics() {
  const metrics = [
    { label: "Steps", value: "8,432", goal: "10,000", icon: Footprints, color: "text-blue-400", progress: 84 },
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Heart, color: "text-rose-400", progress: 70 },
    { label: "Calories", value: "1,240", unit: "kcal", icon: Flame, color: "text-orange-400", progress: 62 },
    { label: "Energy", value: "85", unit: "%", icon: Zap, color: "text-yellow-400", progress: 85 },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <Card
          key={i}
          className="glass-card border-none overflow-hidden hover:scale-105 transition-transform cursor-pointer"
        >
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className={cn("p-2 rounded-lg bg-white/5", m.color)}>
                <m.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">
                {m.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">{m.unit || ""}</span>
              </span>
              <div className="mt-2 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-1000", m.color.replace("text", "bg"))}
                  style={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
