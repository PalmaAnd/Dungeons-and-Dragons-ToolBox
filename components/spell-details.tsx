import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Spell } from "@/components/spell-list";

export function SpellDetails({
    spell,
    onClose,
}: {
    spell: Spell;
    onClose: () => void;
}) {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{spell.name}</DialogTitle>
                    <DialogDescription>
                        Level {spell.level} {spell.school}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4">
                        <p>
                            <strong>Casting Time:</strong> {spell.casting_time}
                        </p>
                        <p>
                            <strong>Range:</strong> {spell.range}
                        </p>
                        <p>
                            <strong>Components:</strong> {spell.components}
                        </p>
                        {spell.material_components && (
                            <p>
                                <strong>Material Components:</strong>{" "}
                                {spell.material_components}
                            </p>
                        )}
                        <p>
                            <strong>Duration:</strong> {spell.duration}
                        </p>
                        <p>
                            <strong>Description:</strong> {spell.description}
                        </p>
                        {spell.damage_or_effect && (
                            <p>
                                <strong>Damage/Effect:</strong>{" "}
                                {spell.damage_or_effect}
                            </p>
                        )}
                        {spell.higher_levels && (
                            <p>
                                <strong>At Higher Levels:</strong>{" "}
                                {spell.higher_levels}
                            </p>
                        )}
                        <p>
                            <strong>Classes:</strong> {spell.classes}
                        </p>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
