"use client"

import { Card } from "@/components/ui/card";

interface PermanentWinnerDisplayProps {
    winners: string[];
}

export const PermanentWinnerDisplay = ({ winners }: PermanentWinnerDisplayProps) => {
    if (winners.length === 0) {
        return null;
    }

    return (
        <Card className="p-6 bg-chart-2/10 border-chart-2/20 shadow-xl mt-6">
            <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Previous Winners</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {winners.map((winner, index) => (
                        <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            {winner}
                        </span>
                    ))}
                </div>
            </div>
        </Card>
    );
};
