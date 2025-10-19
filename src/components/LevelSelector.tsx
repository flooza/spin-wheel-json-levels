"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface LevelSelectorProps {
  levels: number[];
  selectedLevels: number[]
  onLevelChange: (level: number) => void
  onSelectAll: () => void
  onClearAll: () => void
}

export default function LevelSelector({ levels, selectedLevels, onLevelChange, onSelectAll, onClearAll }: LevelSelectorProps) {
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
            variant={selectedLevels.includes(level) ? 'default' : 'outline'}
            size="lg"
            className="flex-1 text-lg py-6 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Level {level}
          </Button>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={onSelectAll} variant="secondary" className="w-1/2">Select All</Button>
        <Button onClick={onClearAll} variant="secondary" className="w-1/2">Clear</Button>
      </div>
    </Card>
  )
}