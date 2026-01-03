"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, TrendingUp, Info, ChevronRight, Apple, Beef, Salad } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const dailyRecipes = [
    { name: "Breakfast: Avocado Bio-Toast", cal: "350", time: "10m", icon: Apple },
    { name: "Lunch: Lean Bio-Protein Bowl", cal: "520", time: "20m", icon: Beef },
    { name: "Dinner: Zucchini Noodle Detox", cal: "280", time: "15m", icon: Salad },
  ]

  const progressEvents = [
    { title: "Metabolic Peak", time: "09:00 AM", status: "Optimal" },
    { title: "Bio-Sync Completed", time: "11:30 AM", status: "Synced" },
    { title: "Neural Recovery Session", time: "04:00 PM", status: "Pending" },
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Aura Calendar</h1>
        <p className="text-muted-foreground">Schedule your bio-optimization and nutrition plans.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Selection */}
        <Card className="lg:col-span-5 glass-card border-none shadow-2xl h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Bio-Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-0 pb-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-3xl border-none bg-transparent"
              classNames={{
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-primary/10 text-primary font-bold",
              }}
            />
          </CardContent>
        </Card>

        {/* Daily Insights */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Recipes Section */}
          <Card className="glass-card border-none shadow-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Utensils className="h-5 w-5 text-secondary" />
                Aura Nutrition: {date?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">
                View All <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3">
              {dailyRecipes.map((recipe, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <recipe.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm group-hover:text-primary transition-colors">
                        {recipe.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-widest">
                        {recipe.time} • {recipe.cal} kcal
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Timeline */}
          <Card className="glass-card border-none shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Physical Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="relative border-l border-white/10 ml-3 pl-6 space-y-6">
                {progressEvents.map((event, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full bg-primary border-4 border-background ring-4 ring-primary/20 shadow-lg" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                        {event.time}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{event.title}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            event.status === "Optimal"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : event.status === "Synced"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
