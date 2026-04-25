const fs = require('fs');

const file = 'app/page.tsx';
let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

const startMain = 'export default function CamreQuiz() {';
const endMain = '\n}\n';

const beforeMain = content.substring(0, content.indexOf(startMain));
const insideMain = content.substring(content.indexOf(startMain) + startMain.length, content.lastIndexOf(endMain));

const destructuringEnd = insideMain.indexOf('} = useCamreQuiz()') + '} = useCamreQuiz()'.length;
const destructuring = insideMain.substring(0, destructuringEnd);

const playingViewStart = '  return (\n    <div className="h-full p-4 flex flex-col">';
const playingView = insideMain.substring(insideMain.indexOf(playingViewStart));

const characterSelectionStart = '  if (showCharacterSelection) {\n    return (';
const characterSelectionEnd = '    )\n  }';
const charBlockStart = insideMain.indexOf(characterSelectionStart);
const charBlockEnd = insideMain.indexOf(characterSelectionEnd, charBlockStart) + characterSelectionEnd.length;

let characterSelectionView = insideMain.substring(charBlockStart, charBlockEnd);
characterSelectionView = characterSelectionView.replace('  if (showCharacterSelection) {\n    return (', '      return (').replace(/  \}\n?$/, '');

let updatedPlayingView = playingView.replace('  return (\n    <div className="h-full p-4 flex flex-col">', '      return (\n        <div className="h-full p-4 flex flex-col">').replace(/\n/g, '\n    ').replace(/    $/, '');

const newInsideMain = `
${destructuring}

  const renderContent = () => {
    if (gameState === "menu") {
      return <MainMenu startGame={startGame} />
    }

    if (gameState === "categorySelection" || gameState === "setup") {
      return (
        <SetupScreen
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
      )
    }

    if (gameState === "spinning") {
      return (
        <SpinningWheel
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
      )
    }

    if (gameState === "finished") {
      return (
        <GameFinished
          selectedCategories={selectedCategories}
          winner={winner}
          team1Name={team1Name}
          team2Name={team2Name}
          team1Characters={team1Characters}
          team2Characters={team2Characters}
          resetGame={resetGame}
        />
      )
    }

    if (showCharacterSelection) {
${characterSelectionView}
    }

    if (gameState === "playing" && currentQuestion) {
      const isCrownQuestion = availableCharactersForCrown.length > 0;
${updatedPlayingView}
    }

    // Default fallback robusto (evita pantalla en blanco si gameState no coincide o falta info)
    return <MainMenu startGame={startGame} />
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {renderContent()}
    </div>
  )
`;

content = beforeMain + startMain + newInsideMain + '\n}\n';
fs.writeFileSync(file, content);
console.log('Update app/page.tsx successful');
