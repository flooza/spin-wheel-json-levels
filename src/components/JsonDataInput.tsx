import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SpinWheelData, Level } from '@/app/page';

interface JsonDataInputProps {
  onDataLoaded: (data: SpinWheelData) => void;
  currentData: SpinWheelData;
}

export default function JsonDataInput({ onDataLoaded, currentData }: JsonDataInputProps) {
  const userFormatData = useMemo(() => {
    const levelsObject = currentData.levels.reduce((acc, level) => {
      acc[`level_${level.level}`] = level.data;
      return acc;
    }, {} as Record<string, string[]>);
    return { levels: levelsObject };
  }, [currentData]);

  const [jsonInput, setJsonInput] = useState(JSON.stringify(userFormatData, null, 2));
  const [error, setError] = useState('');

  const handleLoadData = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!parsed.levels || typeof parsed.levels !== 'object' || Array.isArray(parsed.levels)) {
        throw new Error('Invalid format. "levels" must be an object.');
      }

      const levels: Level[] = Object.entries(parsed.levels).map(([key, data]) => {
        const levelMatch = key.match(/^level_(\d+)$/);
        if (!levelMatch) {
          throw new Error(`Invalid level key format: ${key}. Expected format like "level_1".`);
        }
        const level = parseInt(levelMatch[1], 10);

        if (!Array.isArray(data)) {
          throw new Error(`Invalid data for ${key}. Expected an array of strings.`);
        }
        return { level, data: data.map(String) };
      });

      onDataLoaded({ levels });
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder={JSON.stringify({ levels: { level_1: ["item1", "item2"], level_2: ["itemA", "itemB"]} }, null, 2)}
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
        Load Data
      </Button>
    </div>
  );
}