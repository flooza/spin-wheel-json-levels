"use client"

import { useState } from 'react'
import SpinWheel from '@/components/SpinWheel'
import LevelSelector from '@/components/LevelSelector'
import JsonDataInput from '@/components/JsonDataInput'
import { Card } from '@/components/ui/card'

// Sample data matching the new format
const initialLevel1Data = ["1", "2", "3"]
const initialLevel2Data = ["4", "5", "6"]

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [level1Data, setLevel1Data] = useState(initialLevel1Data)
  const [level2Data, setLevel2Data] = useState(initialLevel2Data)

  const currentData = currentLevel === 1 ? level1Data : level2Data
  const setCurrentData = currentLevel === 1 ? setLevel1Data : setLevel2Data

  return (
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
            Spin the Wheel
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a level, load your data, and spin to win
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 max-w-7xl mx-auto">
          {/* Left Column - Wheel */}
          <div className="flex flex-col items-center justify-center">
            <SpinWheel 
              segments={currentData}
              onSpinComplete={(result) => console.log('Won:', result)}
            />
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            {/* Level Info Card */}
            <Card className="p-6 bg-chart-1/10 border-chart-1/20 shadow-xl">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Current Level</p>
                <p className="text-4xl font-bold text-primary">Level {currentLevel}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentData.length} segments
                </p>
              </div>
            </Card>

            {/* Level Selector */}
            <LevelSelector 
              currentLevel={currentLevel}
              onLevelChange={setCurrentLevel}
            />

            {/* JSON Data Input */}
            <JsonDataInput 
              levelNumber={currentLevel}
              onDataLoaded={setCurrentData}
              currentData={currentData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}