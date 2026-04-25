const fs = require('fs');

const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// Helper to extract blocks
function extractBlock(startMarker, endMarker) {
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker, startIndex);
  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not find block from \n${startMarker}\n to \n${endMarker}`);
  }
  return content.substring(startIndex, endIndex);
}

// Extract MainMenu
const menuStart = '  if (gameState === "menu") {\n';
const menuEnd = '  if (gameState === "categorySelection") {\n';
const menuContent = extractBlock(menuStart, menuEnd);

// Extract SetupScreen (categorySelection)
const setup1Start = '  if (gameState === "categorySelection") {\n';
const setup1End = '  if (gameState === "spinning") {\n';
const setup1Content = extractBlock(setup1Start, setup1End);

// Extract SpinningWheel
const spinningStart = '  if (gameState === "spinning") {\n';
const spinningEnd = '  if (gameState === "setup") {\n';
const spinningContent = extractBlock(spinningStart, spinningEnd);

// Extract SetupScreen (setup)
const setup2Start = '  if (gameState === "setup") {\n';
const setup2End = '  if (gameState === "finished") {\n';
const setup2Content = extractBlock(setup2Start, setup2End);

// Extract GameFinished
const finishedStart = '  if (gameState === "finished") {\n';
const finishedEnd = '  if (!currentQuestion && !showCharacterSelection) return null\n';
const finishedContent = extractBlock(finishedStart, finishedEnd);

const mainMenuProps = `interface MainMenuProps {
  startGame: () => void;
}`;

const mainMenuFile = `"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Play } from "lucide-react"
import { categories } from "@/lib/data/gameData"

${mainMenuProps}

export default function MainMenu({ startGame }: MainMenuProps) {
${menuContent.replace('  if (gameState === "menu") {\n', '').replace(/  \}\n\n$/, '')}
}
`;

const setupScreenProps = `import { type GameState } from "@/hooks/useCamreQuiz"

interface SetupScreenProps {
  gameState: GameState;
  team1Name: string;
  setTeam1Name: (name: string) => void;
  team2Name: string;
  setTeam2Name: (name: string) => void;
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  setGameState: (state: GameState) => void;
  startGameWithCategories: () => void;
}`;

const setupScreenFile = `"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Clock, Check, X, Play, RotateCcw } from "lucide-react"
import { categories } from "@/lib/data/gameData"
import { timeOptions } from "@/hooks/useCamreQuiz"

${setupScreenProps}

export default function SetupScreen({
  gameState,
  team1Name,
  setTeam1Name,
  team2Name,
  setTeam2Name,
  selectedTime,
  setSelectedTime,
  selectedCategories,
  toggleCategory,
  setGameState,
  startGameWithCategories
}: SetupScreenProps) {
${setup1Content}
${setup2Content}
  return null;
}
`;

const spinningWheelProps = `interface SpinningWheelProps {
  currentTeam: number;
  team1Name: string;
  team2Name: string;
  selectedCategories: string[];
  isSpinning: boolean;
  spinningCategory: string;
  selectedCategory: string;
  showSpinButton: boolean;
  spinWheel: () => void;
}`;

const spinningWheelFile = `"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"
import { categories } from "@/lib/data/gameData"

${spinningWheelProps}

export default function SpinningWheel({
  currentTeam,
  team1Name,
  team2Name,
  selectedCategories,
  isSpinning,
  spinningCategory,
  selectedCategory,
  showSpinButton,
  spinWheel
}: SpinningWheelProps) {
${spinningContent.replace('  if (gameState === "spinning") {\n', '').replace(/  \}\n\n$/, '')}
}
`;

const gameFinishedProps = `import { type TeamCharacters } from "@/hooks/useCamreQuiz"

interface GameFinishedProps {
  selectedCategories: string[];
  winner: number | null;
  team1Name: string;
  team2Name: string;
  team1Characters: TeamCharacters;
  team2Characters: TeamCharacters;
  resetGame: () => void;
}`;

const gameFinishedFile = `"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw } from "lucide-react"
import { categories } from "@/lib/data/gameData"

${gameFinishedProps}

export default function GameFinished({
  selectedCategories,
  winner,
  team1Name,
  team2Name,
  team1Characters,
  team2Characters,
  resetGame
}: GameFinishedProps) {
${finishedContent.replace('  if (gameState === "finished") {\n', '').replace(/  \}\n\n$/, '')}
}
`;

fs.writeFileSync('components/game/MainMenu.tsx', mainMenuFile);
fs.writeFileSync('components/game/SetupScreen.tsx', setupScreenFile);
fs.writeFileSync('components/game/SpinningWheel.tsx', spinningWheelFile);
fs.writeFileSync('components/game/GameFinished.tsx', gameFinishedFile);

// Now remove the blocks from app/page.tsx and insert components
const replaceStart = menuStart;
const replaceEnd = finishedEnd;

const replacement = `  if (gameState === "menu") {
    return <MainMenu startGame={startGame} />
  }

  if (gameState === "categorySelection" || gameState === "setup") {
    return <SetupScreen
      gameState={gameState}
      team1Name={team1Name}
      setTeam1Name={setTeam1Name}
      team2Name={team2Name}
      setTeam2Name={setTeam2Name}
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
      selectedCategories={selectedCategories}
      toggleCategory={toggleCategory}
      setGameState={setGameState}
      startGameWithCategories={startGameWithCategories}
    />
  }

  if (gameState === "spinning") {
    return <SpinningWheel
      currentTeam={currentTeam}
      team1Name={team1Name}
      team2Name={team2Name}
      selectedCategories={selectedCategories}
      isSpinning={isSpinning}
      spinningCategory={spinningCategory}
      selectedCategory={selectedCategory}
      showSpinButton={showSpinButton}
      spinWheel={spinWheel}
    />
  }

  if (gameState === "finished") {
    return <GameFinished
      selectedCategories={selectedCategories}
      winner={winner}
      team1Name={team1Name}
      team2Name={team2Name}
      team1Characters={team1Characters}
      team2Characters={team2Characters}
      resetGame={resetGame}
    />
  }\n\n`;

content = content.replace(extractBlock(replaceStart, replaceEnd), replacement);

// Add imports
const imports = `import MainMenu from "@/components/game/MainMenu"
import SetupScreen from "@/components/game/SetupScreen"
import SpinningWheel from "@/components/game/SpinningWheel"
import GameFinished from "@/components/game/GameFinished"\n`;

content = content.replace('import { useCamreQuiz, timeOptions } from "@/hooks/useCamreQuiz"\n', 'import { useCamreQuiz, timeOptions } from "@/hooks/useCamreQuiz"\n' + imports);

fs.writeFileSync(file, content);
console.log('Successfully generated components and updated app/page.tsx');
