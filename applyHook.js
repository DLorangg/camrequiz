const fs = require('fs');
let content = fs.readFileSync('hooks/useCamreQuiz.ts', 'utf8').replace(/\r\n/g, '\n');

// 1. Add isLoaded state and effect
const isLoadedMarker = '  const [showCharacterSelection, setShowCharacterSelection] = useState(false)\n  const [availableCharactersForCrown, setAvailableCharactersForCrown] = useState<string[]>([])\n';

const newEffects = `
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("camrequiz_state")
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState)
          if (parsed.gameState) setGameState(parsed.gameState)
          if (parsed.currentTeam) setCurrentTeam(parsed.currentTeam)
          if (parsed.team1Characters) setTeam1Characters(parsed.team1Characters)
          if (parsed.team2Characters) setTeam2Characters(parsed.team2Characters)
          if (parsed.consecutiveCorrect !== undefined) setConsecutiveCorrect(parsed.consecutiveCorrect)
          if (parsed.usedQuestionIds) setUsedQuestionIds(parsed.usedQuestionIds)
          if (parsed.team1Name) setTeam1Name(parsed.team1Name)
          if (parsed.team2Name) setTeam2Name(parsed.team2Name)
        } catch (e) {
          console.error("Error parsing saved state", e)
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Save state on change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      const stateToSave = {
        gameState,
        currentTeam,
        team1Characters,
        team2Characters,
        consecutiveCorrect,
        usedQuestionIds,
        team1Name,
        team2Name,
      }
      localStorage.setItem("camrequiz_state", JSON.stringify(stateToSave))
    }
  }, [
    isLoaded,
    gameState,
    currentTeam,
    team1Characters,
    team2Characters,
    consecutiveCorrect,
    usedQuestionIds,
    team1Name,
    team2Name,
  ])
`;

content = content.replace(isLoadedMarker, isLoadedMarker + newEffects);

// 2. Replace spinWheel
const spinWheelStart = '  const spinWheel = () => {\n';
const spinWheelEnd = '    }, 5000) // 5 segundos de animación\n  }\n';

const startIdxSpin = content.indexOf(spinWheelStart);
const endIdxSpin = content.indexOf(spinWheelEnd, startIdxSpin) + spinWheelEnd.length;

if (startIdxSpin !== -1 && endIdxSpin !== -1) {
  const newSpinWheel = `  const spinWheel = () => {
    if (!showSpinButton) return

    const availableCategoriesWithQuestions = categories.filter((c) => {
      if (!selectedCategories.includes(c.name)) return false
      const categoryQuestions = questions.filter(
        (q) => q.category === c.name && !usedQuestionIds.includes(q.id)
      )
      return categoryQuestions.length > 0
    })

    if (availableCategoriesWithQuestions.length === 0) {
      console.warn("No hay más preguntas disponibles en TODAS las categorías seleccionadas.")
      return
    }

    playSound(wheelSpinSoundRef)
    setIsSpinning(true)
    setShowSpinButton(false)

    const wheelCategories = [...availableCategoriesWithQuestions]
    wheelCategories.push({ name: "Corona", color: "bg-yellow-500", icon: "👑", textColor: "text-black" })

    const isCrown = Math.random() < 0.2
    let finalCategory: { name: string; color: string; icon: string; textColor: string }

    if (isCrown) {
      finalCategory = { name: "Corona", color: "bg-yellow-500", icon: "👑", textColor: "text-black" }
    } else {
      const randomIndex = Math.floor(Math.random() * availableCategoriesWithQuestions.length)
      finalCategory = availableCategoriesWithQuestions[randomIndex]
    }

    let currentIndex = 0
    const spinInterval = setInterval(() => {
      setSpinningCategory(wheelCategories[currentIndex % wheelCategories.length].name)
      currentIndex++
    }, 100) // Cambia cada 100ms

    setTimeout(() => {
      clearInterval(spinInterval)
      setSelectedCategory(finalCategory.name)
      setSpinningCategory("")
      setIsSpinning(false)

      playSound(wheelStopSoundRef)

      if (finalCategory.name === "Corona") {
        const currentTeamCharacters = currentTeam === 1 ? team1Characters : team2Characters
        const missingCharacters = categories
          .filter((cat) => selectedCategories.includes(cat.name))
          .filter((cat) => !currentTeamCharacters[cat.name])
          .map((cat) => cat.name)

        if (missingCharacters.length > 0) {
          setAvailableCharactersForCrown(missingCharacters)
          setShowCharacterSelection(true)
          setGameState("playing")
        } else {
          setShowSpinButton(true)
          setGameState("spinning")
        }
      } else {
        const categoryQuestions = questions.filter(
          (q) => q.category === finalCategory.name && !usedQuestionIds.includes(q.id),
        )
        if (categoryQuestions.length > 0) {
          const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)]
          setCurrentQuestion(randomQuestion)
          setUsedQuestionIds((prev) => [...prev, randomQuestion.id])
          setGameState("playing")

          if (selectedTime > 0) {
            setTimeLeft(selectedTime)
            setTimerActive(true)
          }
        } else {
          console.warn(\`¡No hay más preguntas en la categoría \${finalCategory.name}! Gira de nuevo.\`)
          setShowSpinButton(true)
          setGameState("spinning")
        }
      }
    }, 5000) // 5 segundos de animación
  }
`;
  content = content.substring(0, startIdxSpin) + newSpinWheel + content.substring(endIdxSpin);
}

// 3. Export isLoaded
const exportReturnStart = '  return {\n';
content = content.replace(exportReturnStart, '  return {\n    isLoaded,\n');

// 4. Update resetGame
const resetStart = '  const resetGame = () => {\n';
const resetEnd = '    setTeam2Name("Equipo 2")\n  }\n';

const startIdxReset = content.indexOf(resetStart);
const endIdxReset = content.indexOf(resetEnd, startIdxReset) + resetEnd.length;

if (startIdxReset !== -1 && endIdxReset !== -1) {
  const newResetGame = `  const resetGame = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("camrequiz_state")
    }
    setGameState("menu")
    setCurrentQuestion(null)
    setCurrentTeam(1)
    setTeam1Characters({})
    setUsedQuestionIds([])
    setTeam2Characters({})
    setSelectedAnswer(null)
    setShowResult(false)
    setConsecutiveCorrect(0)
    setSelectedCategories(categories.map((c) => c.name))
    setSelectedTime(30)
    setTimeLeft(0)
    setTimerActive(false)
    setShowSpinButton(true)
    setWheelRotation(0)
    setShowCharacterSelection(false)
    setAvailableCharactersForCrown([])
    setTeam1Name("Equipo 1")
    setTeam2Name("Equipo 2")
  }
`;
  content = content.substring(0, startIdxReset) + newResetGame + content.substring(endIdxReset);
}

fs.writeFileSync('hooks/useCamreQuiz.ts', content);
console.log('Update hooks/useCamreQuiz.ts completed');
