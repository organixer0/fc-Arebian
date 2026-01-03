import { cn } from "@/lib/utils"
import { CameraTracking } from "@/components/camera-tracking"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Activity, Info, TrendingUp, Timer } from "lucide-react"
import Link from "next/link"

export default function FitnessPage() {
  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between glass-card p-4 rounded-2xl border-none">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Fitness Control</h1>
            <p className="text-xs text-muted-foreground">Advanced Motion Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <CameraTracking />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Posture Score", value: "94%", icon: Activity, color: "text-emerald-400" },
              { label: "Stability", value: "88%", icon: TrendingUp, color: "text-blue-400" },
              { label: "Session Time", value: "12:45", icon: Timer, color: "text-purple-400" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 rounded-2xl flex items-center gap-4">
                <div className={cn("p-2 rounded-xl bg-white/5", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">{stat.label}</span>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="glass-card p-6 rounded-3xl flex flex-col gap-6">
            <h2 className="text-lg font-bold">Analysis Settings</h2>
            <div className="flex flex-col gap-4">
              {["Posture Correction", "Repetition Counting", "Form Optimization", "Skeleton Overlay"].map(
                (setting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5"
                  >
                    <span className="text-sm font-medium">{setting}</span>
                    <div className="h-5 w-10 bg-primary/20 rounded-full relative">
                      <div className="absolute right-1 top-1 h-3 w-3 bg-primary rounded-full shadow-lg" />
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl bg-primary/10 border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-2">Aura Bio Tip</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Maintain a 45-degree angle from the camera for the most accurate spinal alignment scan. Aura AI will
              notify you if your posture dips below 85% efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
