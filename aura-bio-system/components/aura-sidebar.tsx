"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Activity,
  Calendar,
  Settings,
  User,
  Languages,
  Moon,
  Sun,
  Shield,
  Bell,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AuraSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const navItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/" },
    { title: "Fitness Control", icon: Activity, url: "/fitness" },
    { title: "Aura Calendar", icon: Calendar, url: "/calendar" },
  ]

  const languages = [
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
    { label: "Français", value: "fr" },
    { label: "Deutsch", value: "de" },
    { label: "日本語", value: "ja" },
    { label: "中文", value: "zh" },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="glass-strong border-none">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-lg font-bold tracking-tight">Aura Bio</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                  System v1.0
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
              <SidebarGroupLabel>Preferences</SidebarGroupLabel>
              <SidebarGroupContent className="flex flex-col gap-4 p-2">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold px-1">Language</span>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full glass-card border-none h-9 text-xs">
                      <Languages className="h-3 w-3 mr-1" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong border-none">
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between glass-card p-2 rounded-xl border-none">
                  <span className="text-xs font-medium px-1">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="glass-card border-none hover:bg-white/10 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-xs">
                    JD
                  </div>
                  <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                    <span className="text-xs font-bold">Janat Doe</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                      Pro Access
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-strong border-none shadow-2xl p-2 rounded-2xl" side="right">
                <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  My Profile
                </DropdownMenuLabel>
                <DropdownMenuItem className="rounded-xl focus:bg-primary/10 focus:text-primary cursor-pointer gap-2">
                  <User className="h-4 w-4" /> Account Details
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl focus:bg-primary/10 focus:text-primary cursor-pointer gap-2">
                  <Shield className="h-4 w-4" /> Bio-Security
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  System
                </DropdownMenuLabel>
                <DropdownMenuItem className="rounded-xl focus:bg-primary/10 focus:text-primary cursor-pointer gap-2">
                  <Settings className="h-4 w-4" /> Permissions
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl focus:bg-primary/10 focus:text-primary cursor-pointer gap-2">
                  <Bell className="h-4 w-4" /> Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="rounded-xl focus:bg-rose-500/10 focus:text-rose-500 text-rose-500 cursor-pointer gap-2 font-bold">
                  <LogOut className="h-4 w-4" /> Logout System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}
