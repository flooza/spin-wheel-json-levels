"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";

interface WinnerPopupProps {
    winner: string | null;
    onClose: () => void;
}

export const WinnerPopup = ({ winner, onClose }: WinnerPopupProps) => {
    return (
        <Dialog open={!!winner} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>We have a winner!</DialogTitle>
                </DialogHeader>
                <div className="text-center p-6">
                    <p className="text-6xl font-bold text-primary">{winner}</p>
                </div>
                <div className="text-center">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
