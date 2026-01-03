"use client"

import { useRef, useEffect, useState } from "react"
import { Camera, RefreshCcw, Maximize2, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CameraTracking() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isPermissionGranted, setIsPermissionGranted] = useState(false)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsActive(true)
        setIsPermissionGranted(true)
      }
    } catch (err) {
      console.error("[v0] Camera access denied:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsActive(false)
    }
  }

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-card group border-none">
      {!isActive ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/40 backdrop-blur-md">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
            <Camera className="h-10 w-10" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">Aura Bio Vision</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-[280px]">
              Secure posture and motion analysis powered by Aura AI.
            </p>
          </div>
          <Button onClick={startCamera} className="rounded-xl px-8 bg-primary hover:bg-primary/90">
            Enable Camera
          </Button>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />

          {/* Top Right Outline Overlay */}
          <div className="absolute top-4 right-4 w-32 h-48 glass-strong rounded-2xl overflow-hidden border border-white/20 p-2 group-hover:scale-105 transition-transform shadow-2xl">
            <div className="relative w-full h-full bg-black/20 rounded-xl flex items-center justify-center">
              <span className="absolute top-2 left-2 text-[8px] font-bold uppercase tracking-widest text-primary">
                Aura Outline
              </span>
              {/* Stylized Human Skeleton SVG */}
              <svg viewBox="0 0 100 150" className="w-full h-full opacity-80">
                <circle
                  cx="50"
                  cy="20"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary animate-pulse"
                />
                <line x1="50" y1="30" x2="50" y2="80" stroke="currentColor" strokeWidth="2" className="text-primary" />
                <line x1="50" y1="40" x2="20" y2="60" stroke="currentColor" strokeWidth="2" className="text-primary" />
                <line x1="50" y1="40" x2="80" y2="60" stroke="currentColor" strokeWidth="2" className="text-primary" />
                <line x1="50" y1="80" x2="30" y2="130" stroke="currentColor" strokeWidth="2" className="text-primary" />
                <line x1="50" y1="80" x2="70" y2="130" stroke="currentColor" strokeWidth="2" className="text-primary" />
              </svg>
            </div>
          </div>

          {/* Camera Controls Overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 glass-strong rounded-2xl border-none">
            <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
              <RefreshCcw className="h-5 w-5" />
            </Button>
            <div className="h-8 w-[1px] bg-white/10" />
            <Button
              variant="destructive"
              size="icon"
              className="rounded-xl h-12 w-12 bg-rose-500 hover:bg-rose-600"
              onClick={stopCamera}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="h-8 w-[1px] bg-white/10" />
            <Button variant="ghost" size="icon" className="rounded-xl text-white hover:bg-white/10">
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Security Indicator */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 glass-strong rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Encrypted Stream</span>
          </div>
        </>
      )}
    </div>
  )
}
