"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface JsonDataInputProps {
  levelNumber: number
  onDataLoaded: (data: string[]) => void
  currentData: string[]
}

export default function JsonDataInput({ levelNumber, onDataLoaded, currentData }: JsonDataInputProps) {
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState('')

  const handleLoadData = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      
      // Support both formats:
      // 1. New format: { "levels": { "level_1": [...], "level_2": [...] } }
      // 2. Simple array: ["item1", "item2", ...]
      
      let segments: string[]
      
      if (parsed.levels && parsed.levels[`level_${levelNumber}`]) {
        segments = parsed.levels[`level_${levelNumber}`]
      } else if (Array.isArray(parsed)) {
        segments = parsed
      } else {
        throw new Error('Invalid format. Expected array or levels object.')
      }

      if (!Array.isArray(segments) || segments.length === 0) {
        throw new Error('Data must be a non-empty array of strings')
      }

      onDataLoaded(segments)
      setError('')
      setJsonInput('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format')
    }
  }

  const exampleJson = JSON.stringify({
    levels: {
      level_1: ["1", "2", "3"],
      level_2: ["4", "5", "6"]
    }
  }, null, 2)

  return (
    <Card className="shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📝</span>
          Load JSON Data
        </CardTitle>
        <CardDescription>
          Paste your JSON data for Level {levelNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={exampleJson}
          className="font-mono text-sm min-h-[200px] resize-none"
        />
        
        {error && (
          <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button 
          onClick={handleLoadData}
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!jsonInput.trim()}
        >
          Load Data for Level {levelNumber}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 p-3 rounded-md">
          <p className="font-semibold">Current segments ({currentData.length}):</p>
          <p className="break-words">{currentData.join(', ')}</p>
        </div>
      </CardContent>
    </Card>
  )
}