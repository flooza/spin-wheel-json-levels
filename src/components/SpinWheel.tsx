"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, useAnimation } from 'framer-motion'

interface SpinWheelProps {
  segments: string[]
  onSpinComplete?: (result: string) => void
}

// Simple 2-color palette: alternating light and dark shades of primary accent
const generateColors = (count: number): string[] => {
  const colors = []
  for (let i = 0; i < count; i++) {
    // Alternate between lighter and darker shade of accent color
    colors.push(i % 2 === 0 ? 'from-chart-1/90 to-chart-1' : 'from-chart-1/70 to-chart-1/90')
  }
  return colors
}

export default function SpinWheel({ segments, onSpinComplete }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const controls = useAnimation()
  const rotation = useRef(0)
  const colors = generateColors(segments.length)

  const spinWheel = async () => {
    if (isSpinning || segments.length === 0) return

    setIsSpinning(true)
    setResult(null)

    const extraSpins = 5 + Math.random() * 3
    const randomDegree = Math.random() * 360
    const totalRotation = extraSpins * 360 + randomDegree

    const segmentAngle = 360 / segments.length
    const normalizedAngle = (360 - (randomDegree % 360)) % 360
    const winningIndex = Math.floor(normalizedAngle / segmentAngle)
    const winner = segments[winningIndex]

    await controls.start({
      rotate: rotation.current + totalRotation,
      transition: {
        duration: 4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    })

    rotation.current += totalRotation
    setResult(winner)
    setIsSpinning(false)
    onSpinComplete?.(winner)
  }

  const segmentAngle = 360 / segments.length

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Pointer Triangle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20">
          <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-t-[48px] border-t-primary drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
        </div>

        {/* Wheel */}
        <div className="relative w-[420px] h-[420px] md:w-[520px] md:h-[520px] p-4">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-chart-1/20 blur-3xl" />
          
          {/* Main wheel container */}
          <div className="relative w-full h-full rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden border-4 border-primary/20">
            <motion.div
              animate={controls}
              className="absolute inset-0"
            >
              {/* Segments */}
              {segments.map((segment, index) => {
                const angle = segmentAngle * index
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0 origin-center"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]}`} />
                    
                    {/* Segment text */}
                    <div 
                      className="absolute left-1/2 top-[25%] -translate-x-1/2"
                      style={{
                        transform: `translateX(-50%) rotate(${segmentAngle / 2}deg)`
                      }}
                    >
                      <div className="text-primary font-bold text-xl md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] whitespace-nowrap">
                        {segment}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Segment dividers */}
              {segments.map((_, index) => (
                <div
                  key={`divider-${index}`}
                  className="absolute inset-0 origin-center"
                  style={{
                    transform: `rotate(${segmentAngle * index}deg)`
                  }}
                >
                  <div className="absolute left-1/2 top-0 w-[2px] h-1/2 bg-primary/20 -translate-x-1/2" />
                </div>
              ))}
            </motion.div>

            {/* Center circle - simple and minimal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center z-10 border-4 border-background">
              <div className="w-16 h-16 rounded-full bg-chart-1 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        size="lg"
        className="text-xl px-16 py-8 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 bg-chart-1 hover:bg-chart-1/90 hover:scale-105 font-bold tracking-wide text-primary"
      >
        {isSpinning ? 'SPINNING...' : 'SPIN'}
      </Button>

      {/* Result Display */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <Card className="px-12 py-8 bg-chart-1/20 border-2 border-chart-1/40 shadow-2xl">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-2 font-medium">WINNER</p>
              <p className="text-5xl font-bold text-primary">
                {result}
              </p>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}