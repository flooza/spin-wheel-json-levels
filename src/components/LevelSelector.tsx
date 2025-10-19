"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface LevelSelectorProps {
  levels: number[];
  currentLevel: number
  onLevelChange: (level: number) => void
}

export default function LevelSelector({ levels, currentLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-xl">
      <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">
        Select Level
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {levels.map(level => (
          <Button
            key={level}
            onClick={() => onLevelChange(level)}
            variant={currentLevel === level ? 'default' : 'outline'}
            size="lg"
            className="flex-1 text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Level {level}
          </Button>
        ))}
      </div>
    </Card>
  )
}