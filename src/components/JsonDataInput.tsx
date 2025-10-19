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
    return {
      levels: currentData.levels.map(level => level.data)
    };
  }, [currentData]);

  const [jsonInput, setJsonInput] = useState(JSON.stringify(userFormatData, null, 2));
  const [error, setError] = useState('');

  const handleLoadData = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!parsed.levels || !Array.isArray(parsed.levels)) {
        throw new Error('Invalid format. "levels" must be an array of arrays.');
      }

      const levels: Level[] = parsed.levels.map((data: any, index: number) => {
        if (!Array.isArray(data)) {
          throw new Error(`Invalid data for level ${index + 1}. Expected an array of strings.`);
        }
        return { level: index + 1, data: data.map(String) };
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
        placeholder={JSON.stringify({ levels: [["item1", "item2"], ["itemA", "itemB"]] }, null, 2)}
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