const fs = require('fs');
const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Reemplazar imports
content = content.replace(
  /import \{ useState, useEffect, useRef \} from "react"\r?\n/g,
  ''
);

// 2. Reemplazar GameState, TeamCharacters, timeOptions
content = content.replace(
  /type GameState =.*?\]\r?\n\r?\n/s,
  'import { useCamreQuiz, timeOptions } from "@/hooks/useCamreQuiz"\n\n'
);

// 3. Reemplazar lógica dentro de CamreQuiz
const startRegex = /export default function CamreQuiz\(\) \{\r?\n/;
const endRegex = /  if \(gameState === "menu"\) \{\r?\n/;

const startMatch = content.match(startRegex);
const endMatch = content.match(endRegex);

if (startMatch && endMatch) {
  const startIndex = startMatch.index;
  const endIndex = endMatch.index;

  const newLogic = `export default function CamreQuiz() {
  const {
    gameState,
    setGameState,
    currentQuestion,
    currentTeam,
    selectedAnswer,
    showResult,
    isCorrectAnswer,
    team1Name,
    setTeam1Name,
    team2Name,
    setTeam2Name,
    team1Characters,
    team2Characters,
    selectedCategory,
    isSpinning,
    consecutiveCorrect,
    selectedCategories,
    spinningCategory,
    selectedTime,
    setSelectedTime,
    timeLeft,
    showSpinButton,
    isSoundEnabled,
    setIsSoundEnabled,
    showCharacterSelection,
    availableCharactersForCrown,
    startGame,
    startGameWithCategories,
    spinWheel,
    selectCharacterForCrown,
    handleAnswerSelect,
    submitAnswer,
    nextTurn,
    winner,
    resetGame,
    toggleCategory
  } = useCamreQuiz()

  if (gameState === "menu") {\n`;
  
  content = content.substring(0, startIndex) + newLogic + content.substring(endIndex + endMatch[0].length);
  fs.writeFileSync(file, content);
  console.log('File successfully updated!');
} else {
  console.error('Could not find start or end match.');
}
