"use client"

import { useState } from 'react'
import SpinWheel from '@/components/SpinWheel'
import LevelSelector from '@/components/LevelSelector'
import JsonDataInput from '@/components/JsonDataInput'
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WinnerPopup } from "@/components/ui/WinnerPopup";
import { PermanentWinnerDisplay } from "@/components/ui/PermanentWinnerDisplay";

export interface Level {
  level: number;
  data: string[];
}

export interface SpinWheelData {
  levels: Level[];
}

const initialData: SpinWheelData = {
  levels: [
    {
      level: 1,
      data: [
        "sample1",
        "sample2",
        "sample3",
        "sample4",
        "sample5",
      ]
    },
    {
      level: 2,
      data: [
        "sampleA",
        "sampleB",
        "sampleC",
        "sampleD",
        "sampleE",
      ]
    }
  ]
};

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [spinWheelData, setSpinWheelData] = useState<SpinWheelData>(initialData);
  const [winner, setWinner] = useState<string | null>(null)
  const [winners, setWinners] = useState<string[]>([]);

  const currentLevelData = spinWheelData.levels.find(l => l.level === currentLevel)?.data || [];

  const handleSpinComplete = (result: string) => {
    setWinner(result);
    setWinners(prevWinners => [...prevWinners, result]);
  }

  const handleClosePopup = () => {
    setWinner(null);
  }

  const levels = spinWheelData.levels.map(l => l.level);

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
              segments={currentLevelData}
              onSpinComplete={handleSpinComplete}
            />
            <WinnerPopup winner={winner} onClose={handleClosePopup} />
            <PermanentWinnerDisplay winners={winners} />
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            {/* Level Info Card */}
            <Card className="p-6 bg-chart-1/10 border-chart-1/20 shadow-xl">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Current Level</p>
                <p className="text-4xl font-bold text-primary">Level {currentLevel}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {currentLevelData.length} segments
                </p>
              </div>
            </Card>

            {/* Level Selector */}
            <LevelSelector
              levels={levels}
              currentLevel={currentLevel}
              onLevelChange={setCurrentLevel}
            />

            {/* JSON Data Input */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Load/Edit Data</Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Load JSON Data</DialogTitle>
                </DialogHeader>
                <JsonDataInput
                  onDataLoaded={setSpinWheelData}
                  currentData={spinWheelData}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}