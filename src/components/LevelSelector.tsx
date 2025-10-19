"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface LevelSelectorProps {
  currentLevel: number
  onLevelChange: (level: number) => void
}

export default function LevelSelector({ currentLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-xl">
      <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">
        Select Level
      </h3>
      <div className="flex gap-4">
        <Button
          onClick={() => onLevelChange(1)}
          variant={currentLevel === 1 ? 'default' : 'outline'}
          size="lg"
          className="flex-1 text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Level 1
        </Button>
        <Button
          onClick={() => onLevelChange(2)}
          variant={currentLevel === 2 ? 'default' : 'outline'}
          size="lg"
          className="flex-1 text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Level 2
        </Button>
      </div>
    </Card>
  )
}