// PDF Generation utility for character sheets
// This would use a library like jsPDF or Puppeteer for actual PDF generation

export interface CharacterSheetData {
    name: string;
    level: number;
    class: string;
    subclass?: string;
    race: string;
    subrace?: string;
    background: string;
    alignment: string;
    abilities: Record<string, number>;
    hitPoints: number;
    armorClass: number;
    speed: number;
    proficiencyBonus: number;
    skills: string[];
    equipment: string[];
    selectedPack?: string;
    spells?: {
        cantrips: string[];
        level1: string[];
        level2: string[];
        level3: string[];
    };
    personality?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
    backstory?: string;
}

export class CharacterSheetPDFGenerator {
    static async generatePDF(character: CharacterSheetData): Promise<Blob> {
        // In a real implementation, this would use a PDF library
        // For now, we'll create a basic HTML structure that could be printed
        
        const htmlContent = this.generateHTMLCharacterSheet(character);
        
        // This would typically use jsPDF, Puppeteer, or similar
        // For demonstration, we'll create a simple text file
        const blob = new Blob([htmlContent], { type: 'text/html' });
        return blob;
    }
    
    static downloadPDF(character: CharacterSheetData, filename?: string): void {
        this.generatePDF(character).then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || `${character.name || 'character'}-sheet.html`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
    
    private static generateHTMLCharacterSheet(character: CharacterSheetData): string {
        const getAbilityModifier = (score: number) => Math.floor((score - 10) / 2);
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${character.name} - D&D Character Sheet</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 20px;
            line-height: 1.4;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .character-name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .character-info {
            font-size: 14px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        .abilities {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }
        .ability-score {
            text-align: center;
            border: 2px solid #333;
            padding: 10px;
            border-radius: 5px;
        }
        .ability-name {
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
        }
        .ability-value {
            font-size: 24px;
            font-weight: bold;
        }
        .ability-modifier {
            font-size: 14px;
            margin-top: 5px;
        }
        .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #333;
            margin-bottom: 10px;
            padding-bottom: 5px;
        }
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        .stat-box {
            border: 1px solid #333;
            padding: 10px;
            text-align: center;
        }
        .stat-value {
            font-size: 20px;
            font-weight: bold;
        }
        .stat-label {
            font-size: 12px;
            text-transform: uppercase;
        }
        ul {
            margin: 0;
            padding-left: 20px;
        }
        .equipment-list {
            columns: 2;
            column-gap: 20px;
        }
        .story-section {
            margin-top: 20px;
            border: 1px solid #333;
            padding: 15px;
            border-radius: 5px;
        }
        @media print {
            body { margin: 0.5in; }
            .header { page-break-after: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="character-name">${character.name || 'Character Name'}</div>
        <div class="character-info">
            <div><strong>Level ${character.level}</strong> ${character.class}${character.subclass ? ` (${character.subclass})` : ''}</div>
            <div>${character.race}${character.subrace ? ` (${character.subrace})` : ''}</div>
            <div>${character.background} • ${character.alignment}</div>
        </div>
    </div>

    <div class="two-column">
        <div>
            <div class="section">
                <div class="section-title">Ability Scores</div>
                <div class="abilities">
                    ${Object.entries(character.abilities).map(([ability, score]) => `
                        <div class="ability-score">
                            <div class="ability-name">${ability}</div>
                            <div class="ability-value">${score}</div>
                            <div class="ability-modifier">
                                ${getAbilityModifier(score) >= 0 ? '+' : ''}${getAbilityModifier(score)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="section">
                <div class="section-title">Combat Stats</div>
                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="stat-value">${character.hitPoints}</div>
                        <div class="stat-label">Hit Points</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${character.armorClass}</div>
                        <div class="stat-label">Armor Class</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${character.speed} ft</div>
                        <div class="stat-label">Speed</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">+${character.proficiencyBonus}</div>
                        <div class="stat-label">Proficiency Bonus</div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            ${character.equipment.length > 0 ? `
            <div class="section">
                <div class="section-title">Equipment</div>
                ${character.selectedPack ? `
                    <div><strong>Selected Pack:</strong> ${character.selectedPack}</div>
                    <br>
                ` : ''}
                <div class="equipment-list">
                    <ul>
                        ${character.equipment.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}

            ${character.spells && (character.spells.cantrips.length > 0 || character.spells.level1.length > 0 || character.spells.level2.length > 0 || character.spells.level3.length > 0) ? `
            <div class="section">
                <div class="section-title">Spells & Magic</div>
                ${character.spells.cantrips.length > 0 ? `
                    <div><strong>Cantrips Known:</strong></div>
                    <ul>${character.spells.cantrips.map(spell => `<li>${spell}</li>`).join('')}</ul>
                    <br>
                ` : ''}
                ${character.spells.level1.length > 0 ? `
                    <div><strong>1st Level Spells:</strong></div>
                    <ul>${character.spells.level1.map(spell => `<li>${spell}</li>`).join('')}</ul>
                    <br>
                ` : ''}
                ${character.spells.level2.length > 0 ? `
                    <div><strong>2nd Level Spells:</strong></div>
                    <ul>${character.spells.level2.map(spell => `<li>${spell}</li>`).join('')}</ul>
                    <br>
                ` : ''}
                ${character.spells.level3.length > 0 ? `
                    <div><strong>3rd Level Spells:</strong></div>
                    <ul>${character.spells.level3.map(spell => `<li>${spell}</li>`).join('')}</ul>
                    <br>
                ` : ''}
            </div>
            ` : ''}
        </div>
    </div>

    ${character.personality || character.ideals || character.bonds || character.flaws || character.backstory ? `
    <div class="story-section">
        <div class="section-title">Character Story</div>
        ${character.personality ? `<div><strong>Personality Traits:</strong> ${character.personality}</div><br>` : ''}
        ${character.ideals ? `<div><strong>Ideals:</strong> ${character.ideals}</div><br>` : ''}
        ${character.bonds ? `<div><strong>Bonds:</strong> ${character.bonds}</div><br>` : ''}
        ${character.flaws ? `<div><strong>Flaws:</strong> ${character.flaws}</div><br>` : ''}
        ${character.backstory ? `<div><strong>Backstory:</strong> ${character.backstory}</div>` : ''}
    </div>
    ` : ''}

    <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
        Generated by D&D ToolBox Character Creator
    </div>
</body>
</html>`;
    }
}

// Alternative approach using browser's print functionality
export const printCharacterSheet = (character: CharacterSheetData) => {
    const htmlContent = CharacterSheetPDFGenerator['generateHTMLCharacterSheet'](character);
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
};
