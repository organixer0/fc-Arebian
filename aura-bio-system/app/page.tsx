import { AuraAIAssistant } from "@/components/aura-ai-assistant"
import { HealthMetrics } from "@/components/health-metrics"
import { Button } from "@/components/ui/button"
import { Bell, User, Calendar, Activity, Utensils, Smartphone, SidebarClose as SidebarTrigger } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between glass-card p-4 rounded-2xl border-none">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <SidebarTrigger className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Aura Bio</h1>
            <p className="text-xs text-muted-foreground">Systems Online • Jan 3, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20">
            <Smartphone className="h-3 w-3" />
            Watch Connected
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Metrics & Daily Progress */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <HealthMetrics />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-3xl flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Daily Progress</h2>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-center py-4">
                <div className="relative h-40 w-40">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-white/5 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="75.36"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold">70%</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      Overall Goal
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">Workout</span>
                  <span className="font-bold">45 min</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <span className="text-xs text-muted-foreground block mb-1">Sleep</span>
                  <span className="font-bold">7.2 hrs</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Aura Recipes</h2>
                <Utensils className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Quinoa Energy Bowl", time: "15m", cal: "320", tag: "High Protein" },
                  { name: "Green Bio-Shake", time: "5m", cal: "180", tag: "Detox" },
                  { name: "Salmon Recovery", time: "25m", cal: "450", tag: "Post-Workout" },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm group-hover:text-primary transition-colors">{r.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {r.time} • {r.cal} kcal
                      </span>
                    </div>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                      {r.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="lg:col-span-4">
          <AuraAIAssistant />

          <div className="mt-8 glass-card p-6 rounded-3xl border-none relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <Activity className="h-24 w-24 text-primary/10 -mr-8 -mt-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold mb-2">Fitness Tracking</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Launch camera bio-tracking to analyze your movement patterns and posture.
            </p>
            <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">Start Motion Scan</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
