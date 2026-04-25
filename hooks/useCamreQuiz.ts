"use client"

import { useState, useEffect, useRef } from "react"
import { type Question, questions, categories } from "@/lib/data/gameData"

export type GameState = "menu" | "categorySelection" | "spinning" | "playing" | "finished" | "setup"

export interface TeamCharacters {
  [category: string]: boolean
}

export const timeOptions = [
  { label: "Sin tiempo", value: 0 },
  { label: "20 segundos", value: 20 },
  { label: "30 segundos", value: 30 },
  { label: "45 segundos", value: 45 },
]

export function useCamreQuiz() {
  const [gameState, setGameState] = useState<GameState>("menu")
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentTeam, setCurrentTeam] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)

  const [team1Name, setTeam1Name] = useState("Equipo 1")
  const [team2Name, setTeam2Name] = useState("Equipo 2")

  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([])
  const [team1Characters, setTeam1Characters] = useState<TeamCharacters>({})
  const [team2Characters, setTeam2Characters] = useState<TeamCharacters>({})

  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories.map((c) => c.name))
  const [wheelRotation, setWheelRotation] = useState(0)
  const [spinningCategory, setSpinningCategory] = useState("")

  const [selectedTime, setSelectedTime] = useState(30) // 30 segundos por defecto
  const [timeLeft, setTimeLeft] = useState(0)
  const [timerActive, setTimerActive] = useState(false)

  const [showSpinButton, setShowSpinButton] = useState(true)

  const [isSoundEnabled, setIsSoundEnabled] = useState(true)

  const wheelSpinSoundRef = useRef<HTMLAudioElement | null>(null)
  const wheelStopSoundRef = useRef<HTMLAudioElement | null>(null)
  const tickSoundRef = useRef<HTMLAudioElement | null>(null)
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const incorrectSoundRef = useRef<HTMLAudioElement | null>(null)
  const timeWarningSoundRef = useRef<HTMLAudioElement | null>(null)
  const characterWonSoundRef = useRef<HTMLAudioElement | null>(null)

  const [showCharacterSelection, setShowCharacterSelection] = useState(false)
  const [availableCharactersForCrown, setAvailableCharactersForCrown] = useState<string[]>([])

  useEffect(() => {
    // Crear elementos de audio
    wheelSpinSoundRef.current = new Audio("/spinning.mp3")
    wheelStopSoundRef.current = new Audio("/stop.mp3")
    //tickSoundRef.current = new Audio("/tick.mp3")
    correctSoundRef.current = new Audio("/correct.mp3")
    incorrectSoundRef.current = new Audio("/wrong.mp3")
    timeWarningSoundRef.current = new Audio("/warning.mp3")
    characterWonSoundRef.current = new Audio("/character.mp3")

    // Configurar volumen
    if (wheelSpinSoundRef.current) wheelSpinSoundRef.current.volume = 0.6
    if (wheelStopSoundRef.current) wheelStopSoundRef.current.volume = 0.8
    if (tickSoundRef.current) tickSoundRef.current.volume = 0.4
    if (correctSoundRef.current) correctSoundRef.current.volume = 0.7
    if (incorrectSoundRef.current) incorrectSoundRef.current.volume = 0.7
    if (timeWarningSoundRef.current) timeWarningSoundRef.current.volume = 0.5
    if (characterWonSoundRef.current) characterWonSoundRef.current.volume = 0.8

    return () => {
      // Limpiar al desmontar
      wheelSpinSoundRef.current = null
      wheelStopSoundRef.current = null
      tickSoundRef.current = null
      correctSoundRef.current = null
      incorrectSoundRef.current = null
      timeWarningSoundRef.current = null
      characterWonSoundRef.current = null
    }
  }, [])

  const playSound = (soundRef: React.RefObject<HTMLAudioElement | null>) => {
    if (isSoundEnabled && soundRef.current) {
      soundRef.current.currentTime = 0
      soundRef.current.play().catch(() => {
        // Ignorar errores de reproducción (autoplay policy)
      })
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setTimerActive(false)
            playSound(incorrectSoundRef)
            if (!showResult && selectedAnswer !== null) {
              submitAnswer()
            } else if (!showResult) {
              setIsCorrectAnswer(false)
              setShowResult(true)
              setConsecutiveCorrect(0)
            }
            return 0
          }
          return time - 1
        })
      }, 1000)
    } else if (!timerActive) {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, timeLeft, showResult, selectedAnswer])

  const startGame = () => {
    setGameState("categorySelection")
  }

  const startGameWithCategories = () => {
    setGameState("spinning")
    setCurrentTeam(1)
    setTeam1Characters({})
    setTeam2Characters({})
    setSelectedAnswer(null)
    setUsedQuestionIds([])
    setShowResult(false)
    setConsecutiveCorrect(0)
    setShowSpinButton(true)
    setIsSpinning(false)
    setWheelRotation(0)
    setSelectedCategory("")
    setSpinningCategory("")
  }

  const spinWheel = () => {
    if (!showSpinButton) return

    playSound(wheelSpinSoundRef)
    setIsSpinning(true)
    setShowSpinButton(false)

    const availableCategories = categories.filter((c) => selectedCategories.includes(c.name))
    const wheelCategories = [...availableCategories]
    wheelCategories.push({ name: "Corona", color: "bg-yellow-500", icon: "👑", textColor: "text-black" })

    const isCrown = Math.random() < 0.2
    let finalCategory: { name: string; color: string; icon: string; textColor: string }

    if (isCrown) {
      finalCategory = { name: "Corona", color: "bg-yellow-500", icon: "👑", textColor: "text-black" }
    } else {
      const randomIndex = Math.floor(Math.random() * availableCategories.length)
      finalCategory = availableCategories[randomIndex]
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
          alert(`¡No hay más preguntas en la categoría ${finalCategory.name}! Gira de nuevo.`)
          setShowSpinButton(true)
          setGameState("spinning")
        }
      }
    }, 5000) // 5 segundos de animación
  }

  const selectCharacterForCrown = (categoryName: string) => {
    setShowCharacterSelection(false)
    setSelectedCategory(categoryName)

    // Reiniciar estado para la nueva pregunta
    setShowResult(false)
    setSelectedAnswer(null)

    const categoryQuestions = questions.filter((q) => q.category === categoryName && !usedQuestionIds.includes(q.id))
    if (categoryQuestions.length > 0) {
      const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)]
      setCurrentQuestion(randomQuestion)
      setUsedQuestionIds((prev) => [...prev, randomQuestion.id])
    }

    if (selectedTime > 0) {
      setTimeLeft(selectedTime)
      setTimerActive(true)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return

    setTimerActive(false)

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrectAnswer(isCorrect)
    setShowResult(true)

    if (isCorrect) {
      playSound(correctSoundRef)
    } else {
      playSound(incorrectSoundRef)
    }

    const isCrownQuestion = availableCharactersForCrown.length > 0

    if (isCorrect) {
      if (isCrownQuestion) {
        // Si es una pregunta de corona (por racha o por ruleta) y es correcta, se gana el personaje.
        playSound(characterWonSoundRef)
        if (currentTeam === 1) {
          setTeam1Characters((prev) => ({ ...prev, [currentQuestion.category]: true }))
        } else {
          setTeam2Characters((prev) => ({ ...prev, [currentQuestion.category]: true }))
        }
        setConsecutiveCorrect(0) // La racha se reinicia al ganar un personaje.
      } else if (consecutiveCorrect + 1 === 3) {
        // Se alcanzó la racha de 3, se activa el menú corona.
        const currentTeamCharacters = currentTeam === 1 ? team1Characters : team2Characters
        const missingCharacters = categories
          .filter((cat) => selectedCategories.includes(cat.name))
          .filter((cat) => !currentTeamCharacters[cat.name])
          .map((cat) => cat.name)

        if (missingCharacters.length > 0) {
          setAvailableCharactersForCrown(missingCharacters)
          setShowCharacterSelection(true)
        }
        setConsecutiveCorrect((prev) => prev + 1)
      } else {
        setConsecutiveCorrect((prev) => prev + 1)
      }
    } else {
      setConsecutiveCorrect(0)
    }
  }

  const nextTurn = () => {
    if (isCorrectAnswer && consecutiveCorrect === 3) {
      // Después de una racha de 2, se mostró el menú corona.
      // El jugador sigue su turno para la 3ra pregunta.
      setShowResult(false)
      setSelectedAnswer(null)
    } else if (isCorrectAnswer) {
      setGameState("spinning")
      setShowSpinButton(true)
      setIsSpinning(false)
    } else {
      setCurrentTeam(currentTeam === 1 ? 2 : 1)
      setGameState("spinning")
      setShowSpinButton(true)
      setIsSpinning(false)
    }

    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(0)
    setTimerActive(false)
    setCurrentQuestion(null)
    setSelectedCategory("")
    setWheelRotation(0)
    setShowCharacterSelection(false)
    setAvailableCharactersForCrown([])
  }

  const checkWinner = () => {
    const enabledCategories = categories.filter((c) => selectedCategories.includes(c.name))
    const team1Count = Object.keys(team1Characters).filter((cat) => selectedCategories.includes(cat)).length
    const team2Count = Object.keys(team2Characters).filter((cat) => selectedCategories.includes(cat)).length

    if (team1Count === enabledCategories.length) return 1
    if (team2Count === enabledCategories.length) return 2
    return null
  }

  const winner = checkWinner()
  if (winner && gameState !== "finished") {
    setGameState("finished")
  }

  const resetGame = () => {
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

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryName)) {
        if (prev.length === 1) return prev
        return prev.filter((c) => c !== categoryName)
      } else {
        return [...prev, categoryName]
      }
    })
  }

  useEffect(() => {
    if (timerActive && timeLeft <= 10 && timeLeft > 0) {
      playSound(tickSoundRef)
    }
    if (timeLeft === 10) {
      playSound(timeWarningSoundRef)
    }
  }, [timeLeft, timerActive])

  return {
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
    checkWinner,
    winner,
    resetGame,
    toggleCategory,
    wheelRotation,
    setWheelRotation
  }
}
