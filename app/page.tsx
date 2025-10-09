"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Trophy, Users, Play, RotateCcw, Check, X, Clock, Crown } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

const questions: Question[] = [
  // Iglesia (preguntas que no son de Don Bosco)
  {
    id: 4,
    question: "¿Cómo se llama la banda uruguaya que tiene canciones con temáticas salesianas?",
    options: ["Valdocco rock", "El rezo a un Don Bosco santificado", "Aristophanes", "Servidores"],
    correctAnswer: 2,
    category: "Iglesia",
  },
  {
    id: 7,
    question: "¿Cuántas estaciones tiene el Vía Christi?",
    options: ["15", "23", "25", "33"],
    correctAnswer: 1,
    category: "Iglesia",
  },
  {
    id: 60,
    question: "¿Quién fue la última persona santificada de nacionalidad argentina?",
    options: ["Artemides Zatti", "Nazaria Ignacia", "José Gabriel Brochero", "Mama Antula"],
    correctAnswer: 3,
    category: "Iglesia",
  },
  {
    id: 61,
    question: "¿Quién es el rector mayor de los salesianos?",
    options: ["Ángel Fernández", "Pascual Chávez", "Juan Vecchi", "Fabio Attard"],
    correctAnswer: 3,
    category: "Iglesia",
  },

  // Camrevoc
  {
    id: 11,
    question: "¿Cómo se llama la madre encargada de la comunicación de todos los grupos de wpp de CRV?",
    options: ["Laura", "Marta", "Norma", "Claudia"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 12,
    question: "¿Qué empresa de transporte desde hace años nos lleva a los campas?",
    options: ["Cata", "El Petróleo", "Hans", "Andesmar"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 13,
    question: "¿Cuál de estos No es un Coordi de los 4 originales?",
    options: ["Gustavo", "Raul", "Natalia", "Oscar"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 15,
    question: "¿Cuál de las siguientes citas No corresponde a la promesa de crvquista?",
    options: [
      "Me comprometo a recorrer este camino...",
      "María Auxiliadora mi protección...",
      "A compartir la última torta frita...",
      "Y mis compañeros crvquistas me lo demanden",
    ],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 16,
    question: "¿Cuánto mide el volcán Lanin?",
    options: ["3747 m", "3895 m", "3520 m", "2690 m"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 17,
    question: "¿Cuántas camadas terminaron 7ma etapa?",
    options: ["15", "10", "8", "7"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 18,
    question: "¿En qué ubicación se saca la clásica foto del campa de Regina?",
    options: ["El indio", "Orespa", "La isla", "Iglesia de Regina"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 19,
    question: "¿Si hablo de Zatti y servicio en que etapa estoy?",
    options: ["1ra", "2da", "3ra", "5ta"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 20,
    question:
      "¿Cómo se llama el camping donde nos hospedamos cuando vamos a Junín (y que el año pasado visito María Becerra)?",
    options: ["Bahía Huechulafquen", "Piedra mala", "Bahía Cañicul", "Laguna Gómez"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 21,
    question: "¿Qué personaje cinematográfico suele estar presente en los cartones de bingo de CRV?",
    options: ["Russell", "Forrest Gump", "Tom y Jerry", "Los Vengadores"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 22,
    question: "¿Qué articulo no puede faltar en un campamento para Vasco?",
    options: ["Brújula", "Pelota", "Sifón de soda", "Cantimplora"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 24,
    question: "¿Cómo se llama el Hogar donde nos hospedamos en Junín?",
    options: ["Miguel Magone", "Juan Gregui", "Ceferino Namuncura", "Mama Margarita"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 25,
    question: "¿Cuántos años cumplen las misiones Salesiana a la Argentina este año?",
    options: ["200", "100", "150", "125"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 26,
    question: "¿En cual de estas provincias No hay un CamReVoc funcionando?",
    options: ["Mendoza", "Entrerríos", "Rio Negro", "Corrientes"],
    correctAnswer: 3,
    category: "Camrevoc",
  },
  {
    id: 27,
    question: "¿Qué danza complementa el nombre de la coordinadora Natalia cabezas?",
    options: ["Zamba", "Zumba", "Chacarera", "Capoeira"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 28,
    question:
      "¿Cómo se llama el equipo conformado por madres y padres de crv que ayuda en cocina en encuentros, campamentos y bingos?",
    options: ["Cooperadores salesianos", "Ma/padres copados", "Mama Margarita", "Familias al servicio"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 29,
    question: "¿Cómo se llama el sacerdote que inicio con el proyecto de la refundación de CamReVoc Neuquén?",
    options: ["Guillermo 'Willy' Tanos", "Juan Carlos de Pablo", "Padre Sabino", "Natalino"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 30,
    question: "¿Cuántos oratorios funcionando tiene CamReVoc en este 2025?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 31,
    question: "¿Cuál es el primer nombre de vasco?",
    options: ["Ariel", "Jaime", "Florencio", "Adrián"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 32,
    question: "¿Cuál es el segundo nombre de Oscar?",
    options: ["Fernando", "Alberto", "Pablo", "No tiene segundo nombre"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 33,
    question: "¿En qué año salió el famoso álbum de figuritas de guías?",
    options: ["2024", "2023", "2022", "2021"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 34,
    question: "¿Si mis guías me hablan de un éxodo en que etapa estoy?",
    options: ["1ra", "2da", "3ra", "5ta"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 35,
    question: "¿Cómo se llama el rio que pasa a metros de donde nos hospedamos en Junín?",
    options: ["Agrio", "Varvarco", "Pulmari", "Chimehuin"],
    correctAnswer: 3,
    category: "Camrevoc",
  },
  {
    id: 36,
    question: "¿Quién No es de esta camada?",
    options: ["Guadita", "Sol Cornejo", "Mateo Gaido", "Nacho Bonorino"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 37,
    question: "¿Cuál es el lema de CamReVoc?",
    options: [
      "El que no vive para servir, no sirve para vivir.",
      "Servir hasta el cansancio",
      "Siempre con alegría",
      "Jóvenes para los jóvenes",
    ],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 38,
    question: "¿Cuál no es comida de campamento?",
    options: ["Guiso", "Hamburguesas de Pollolin", "Tortas fritas", "Sushi"],
    correctAnswer: 3,
    category: "Camrevoc",
  },
  {
    id: 39,
    question: "¿Con que objeto fue golpeada la parte posterior de Oscar en un campamento?",
    options: ["Cuchara de madera", "Palo de amasar", "Sartén", "Pelota de básquet"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 40,
    question: "¿Cómo se llama el Oratorio de 7ma?",
    options: ["Ohana", "La canchita de Magone", "Valdoquito", "Oratorio de 7ma"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 41,
    question: "¿Cuál de estos no es uno de los legendarios Cocineros originales?",
    options: ["Beti", "Mechi", "Rogelio", "Carlos"],
    correctAnswer: 3,
    category: "Camrevoc",
  },
  {
    id: 42,
    question: "¿En los primeros años que hacia Rogelio antes de cenar?",
    options: ["Contaba un chiste", "Inventaba un aro aro", "Preguntaba como salió Boca", "Cantaba el himno"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 43,
    question: "¿Según la famosa animación, en busca de que animal voy?",
    options: ["Un Hurón", "Un León", "Un lechón", "Un cóndor"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 44,
    question: "¿Según la famosa animación, que nombre tiene la tía que realiza llamativos movimientos?",
    options: ["Jacinta", "Josefina", "Rosa", "María"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 45,
    question: "¿Según la famosa animación, que le reclama su jefe a Curro?",
    options: ["Que no llega a tiempo", "Que no limpia su zona de trabajo", "Que no hace nada", "Que hace todo mal"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 46,
    question: "¿Según la famosa animación, que hay abajo del caballo que arriba tiene un gaucho tomando mate?",
    options: ["Un perro que mueve la cola", "El piojo Juancho", "Un largo y ancho puente", "Un ombú"],
    correctAnswer: 3,
    category: "Camrevoc",
  },
  {
    id: 47,
    question: "Si me toca organizar las CRVolimpiadas. ¿En qué etapa estoy?",
    options: ["Soy guía", "7ma", "6ta", "Se sortea a que etapa le toca cada año"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 48,
    question: "¿Cuál de estas no es una mención oficial de campamento?",
    options: ["Mejor crvquista", "Mas servicial", "Mas alegre", "Mas días sin bañarse"],
    correctAnswer: 3,
    category: "Camrevoc",
  },
  {
    id: 49,
    question: "¿Cómo se llama la medica que nos acompaña en los campas de verano?",
    options: ["Adelaida", "Claudia", "Andrea", "Paula"],
    correctAnswer: 0,
    category: "Camrevoc",
  },
  {
    id: 62,
    question: "¿Cuál fue el primer objetivo por el que fue fundado Camrevoc? Para ser...",
    options: ["Monaguillos", "Animadores", "Curas", "Profesores"],
    correctAnswer: 2,
    category: "Camrevoc",
  },
  {
    id: 63,
    question: "¿Cómo se llama el hogar de Regina?",
    options: ["La huella", "Orespa", "Arespa", "La mancha"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 64,
    question: '¿Quién dijo la célebre frase "El que no vive para servir no sirve para vivir"?',
    options: ["Madre Teresa de Calcuta", "Don Bosco", "San Francisco de Sales", "Ceferino Namuncurá"],
    correctAnswer: 0,
    category: "Camrevoc",
  },

  // Cultura general
  {
    id: 50,
    question: "¿Cuál es la capital de Argentina?",
    options: ["Córdoba", "Rosario", "Buenos Aires", "La Plata"],
    correctAnswer: 2,
    category: "Cultura general",
  },
  {
    id: 51,
    question: "¿Cuántos continentes hay en el mundo?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    category: "Cultura general",
  },
  {
    id: 52,
    question: "¿Cuál es el océano más grande del mundo?",
    options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
    correctAnswer: 3,
    category: "Cultura general",
  },
  {
    id: 53,
    question: "¿En qué año llegó Cristóbal Colón a América?",
    options: ["1492", "1500", "1482", "1510"],
    correctAnswer: 0,
    category: "Cultura general",
  },
  {
    id: 54,
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Saturno", "Júpiter", "Neptuno", "Urano"],
    correctAnswer: 1,
    category: "Cultura general",
  },
  {
    id: 55,
    question: "¿Quién pintó la Mona Lisa?",
    options: ["Miguel Ángel", "Leonardo da Vinci", "Rafael", "Donatello"],
    correctAnswer: 1,
    category: "Cultura general",
  },
  {
    id: 56,
    question: "¿Cuál es el río más largo del mundo?",
    options: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"],
    correctAnswer: 1,
    category: "Cultura general",
  },
  {
    id: 57,
    question: "¿En qué año se declaró la independencia de Argentina?",
    options: ["1810", "1816", "1820", "1825"],
    correctAnswer: 1,
    category: "Cultura general",
  },
  {
    id: 58,
    question: "¿Cuál es el animal terrestre más rápido?",
    options: ["León", "Guepardo", "Leopardo", "Tigre"],
    correctAnswer: 1,
    category: "Cultura general",
  },
  {
    id: 59,
    question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
    options: ["186", "206", "226", "246"],
    correctAnswer: 1,
    category: "Cultura general",
  },

  // Don Bosco
  {
    id: 70,
    question: "¿En que año se publica el primer Boletín Salesiano?",
    options: ["1877", "1914", "1815", "1954"],
    correctAnswer: 0,
    category: "Don Bosco",
  },
  {
    id: 71,
    question: "¿Cuál de estos no es un pilar del oratorio?",
    options: ["Patio", "Amorevolezza", "Casa", "Escuela"],
    correctAnswer: 1,
    category: "Camrevoc",
  },
  {
    id: 72,
    question: "¿Qué edad tenia Don Bosco cuando tuvo el primero de muchos, pero más recordado sueño?",
    options: ["9 años", "10 años", "33 años", "15 años"],
    correctAnswer: 0,
    category: "Don Bosco",
  },
  {
    id: 73,
    question: "¿Qué club de futbol fue fundado por un sacerdote salesiano?",
    options: ["River Plate", "Boca Juniors", "San Lorenzo de Almagro", "Desamparados de San Juan"],
    correctAnswer: 2,
    category: "Iglesia",
  },
  {
    id: 74,
    question: "¿Cuándo celebramos el día de María?",
    options: ["24 de marzo", "24 de mayo", "24 de agosto", "24 de julio"],
    correctAnswer: 1,
    category: "Iglesia",
  },
  {
    id: 75,
    question: "¿Cómo se llamo el primer rector mayor de los salesianos luego de Don Bosco?",
    options: ["Domingo Savio", "Miguel Rúa", "Juan Cagliero", "Pio IX"],
    correctAnswer: 1,
    category: "Don Bosco",
  },
  {
    id: 76,
    question: "¿En que año Don Bosco es declarado santo?",
    options: ["1934", "1916", "2002", "1898"],
    correctAnswer: 0,
    category: "Don Bosco",
  },
  {
    id: 77,
    question: "¿Qué significa MJS en la espiritualidad salesiana?",
    options: [
      "Movimiento Juvenil Sagrado",
      "Movimiento Juvenil Salesiano",
      "Misión Joven Solidaria",
      "Movimiento Joven del Sur",
    ],
    correctAnswer: 1,
    category: "Iglesia",
  },
  {
    id: 78,
    question: "¿En que etapa se ve la película de Don Bosco?",
    options: ["2da", "6ta", "3ra", "4ta"],
    correctAnswer: 3,
    category: "Camrevoc",
  },
]

const categories = [
  { name: "Iglesia", color: "bg-emerald-500", icon: "⛪", textColor: "text-white" },
  { name: "Camrevoc", color: "bg-red-500", icon: "🏕️", textColor: "text-white" },
  { name: "Cultura general", color: "bg-blue-500", icon: "🌍", textColor: "text-white" },
  { name: "Don Bosco", color: "bg-orange-500", icon: "👨🏻‍⚖️", textColor: "text-white" },
]

type GameState = "menu" | "categorySelection" | "spinning" | "playing" | "finished" | "setup"

interface TeamCharacters {
  [category: string]: boolean
}

const timeOptions = [
  { label: "Sin tiempo", value: 0 },
  { label: "20 segundos", value: 20 },
  { label: "30 segundos", value: 30 },
  { label: "45 segundos", value: 45 },
]

export default function CamreQuiz() {
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
    tickSoundRef.current = new Audio("/tick.mp3")
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

  const playSound = (soundRef: React.RefObject<HTMLAudioElement>) => {
    if (soundRef.current) {
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

  if (gameState === "menu") {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-20 h-20 flex items-center justify-center">
              <img src="/images/camrevoc-logo.png" alt="Camrevoc Logo" className="w-full h-full object-contain" />
            </div>
            <CardTitle className="text-3xl font-bold text-emerald-700">CamreQuiz</CardTitle>
            <p className="text-gray-600">¡Colecciona todos los personajes respondiendo preguntas!</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border-2 border-emerald-200">
                <Users className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <p className="font-semibold">Equipo 1</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-red-200">
                <Users className="w-6 h-6 mx-auto mb-2 text-red-600" />
                <p className="font-semibold">Equipo 2</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">Personajes a coleccionar:</p>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <div key={category.name} className="text-center p-2 bg-white rounded border">
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <p className="text-xs font-medium">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={startGame} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Play className="w-4 h-4 mr-2" />
              Comenzar Juego
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "categorySelection") {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-emerald-700">Configurar Juego</CardTitle>
            <p className="text-gray-600">Personaliza tu experiencia de juego</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-700">Nombres de equipos</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Equipo 1</label>
                  <Input
                    value={team1Name}
                    onChange={(e) => setTeam1Name(e.target.value)}
                    placeholder="Nombre del equipo 1"
                    className="border-emerald-300 focus:border-emerald-500"
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Equipo 2</label>
                  <Input
                    value={team2Name}
                    onChange={(e) => setTeam2Name(e.target.value)}
                    placeholder="Nombre del equipo 2"
                    className="border-red-300 focus:border-red-500"
                    maxLength={20}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-700">Tiempo por pregunta</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {timeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedTime === option.value ? "default" : "outline"}
                    className={`h-auto p-3 ${
                      selectedTime === option.value
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "border-2 hover:border-emerald-300"
                    }`}
                    onClick={() => setSelectedTime(option.value)}
                  >
                    <div className="text-center">
                      <div className="font-medium">{option.label}</div>
                      {option.value > 0 && <div className="text-xs opacity-75">{option.value}s</div>}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h3 className="font-semibold text-gray-700">Seleccionar Categorías</h3>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      selectedCategories.includes(category.name)
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "border-2 hover:border-emerald-300"
                    }`}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="text-2xl">{category.icon}</div>
                      {selectedCategories.includes(category.name) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-center">{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Categorías seleccionadas: {selectedCategories.length} de {categories.length}
              </p>
              <p className="text-xs text-gray-500">Necesitas al menos 1 categoría para jugar</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setGameState("menu")} className="flex-1">
                Volver
              </Button>
              <Button
                onClick={startGameWithCategories}
                disabled={selectedCategories.length === 0}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Jugar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "spinning") {
    const availableCategories = categories.filter((c) => selectedCategories.includes(c.name))
    const wheelCategories = [...availableCategories]
    wheelCategories.push({ name: "Corona", color: "bg-yellow-500", icon: "👑", textColor: "text-black" })

    const displayCategory = isSpinning ? spinningCategory : selectedCategory
    const currentCat = wheelCategories.find((c) => c.name === displayCategory)

    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-emerald-700">
              Turno de {currentTeam === 1 ? team1Name : team2Name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="relative mx-auto w-96 h-96 flex items-center justify-center">
              <div
                className={`w-64 h-64 rounded-3xl shadow-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                  currentCat ? currentCat.color : "bg-gray-200"
                } ${currentCat ? currentCat.textColor : "text-gray-500"}`}
              >
                {isSpinning ? (
                  <>
                    <div className="text-8xl mb-4 animate-bounce">{currentCat?.icon || "?"}</div>
                    <p className="text-2xl font-bold">{displayCategory || "..."}</p>
                  </>
                ) : displayCategory ? (
                  <>
                    <div className="text-8xl mb-4">{currentCat?.icon}</div>
                    <p className="text-3xl font-bold">{displayCategory}</p>
                  </>
                ) : (
                  <p className="text-xl font-semibold">Presiona GIRAR</p>
                )}
              </div>

              {!isSpinning && showSpinButton && (
                <div className="absolute bottom-0">
                  <Button
                    onClick={spinWheel}
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 text-xl shadow-xl"
                  >
                    <Play className="w-6 h-6 mr-2" />
                    GIRAR
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "setup") {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src="/images/camrevoc-logo.png" alt="Camrevoc Logo" className="w-24 h-24" />
            </div>
            <CardTitle className="text-4xl font-bold text-emerald-700">CamreQuiz</CardTitle>
            <p className="text-lg text-gray-600">Configura tu juego</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">Selecciona las categorías:</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCategories.includes(category.name)
                        ? `${category.color} ${category.textColor} border-emerald-600 shadow-lg`
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:border-emerald-400"
                    }`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setGameState("menu")}
                className="border-emerald-300 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <Button
                onClick={startGameWithCategories}
                disabled={selectedCategories.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Jugar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (gameState === "finished") {
    const enabledCategories = categories.filter((c) => selectedCategories.includes(c.name))

    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">¡Juego Terminado!</CardTitle>
            <div className="text-4xl">🏆</div>
            <p className="text-xl font-semibold text-emerald-700">¡{winner === 1 ? team1Name : team2Name} gana!</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border-2 border-emerald-200">
                <p className="font-semibold mb-2">{team1Name}</p>
                <div className="grid grid-cols-3 gap-1">
                  {enabledCategories.map((category) => (
                    <div
                      key={category.name}
                      className={`text-lg p-1 rounded ${team1Characters[category.name] ? "bg-green-200" : "bg-gray-200"}`}
                    >
                      {category.icon}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {Object.keys(team1Characters).filter((cat) => selectedCategories.includes(cat)).length}/
                  {selectedCategories.length} personajes
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border-2 border-red-200">
                <p className="font-semibold mb-2">{team2Name}</p>
                <div className="grid grid-cols-3 gap-1">
                  {enabledCategories.map((category) => (
                    <div
                      key={category.name}
                      className={`text-lg p-1 rounded ${team2Characters[category.name] ? "bg-green-200 border-green-400" : "bg-gray-100 border-gray-300"}`}
                    >
                      {category.icon}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {Object.keys(team2Characters).filter((cat) => selectedCategories.includes(cat)).length}/
                  {selectedCategories.length} personajes
                </p>
              </div>
            </div>
            <Button onClick={resetGame} size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Jugar de Nuevo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion && !showCharacterSelection) return null

  if (showCharacterSelection) {
    return (
      <div className="h-full p-4 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-yellow-600 mb-2">👑 ¡CORONA! 👑</h1>
            <p className="text-lg text-gray-700">
              {currentTeam === 1 ? team1Name : team2Name}, elige qué personaje quieres conseguir:
            </p>
          </div>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableCharactersForCrown.map((categoryName) => {
                  const category = categories.find((c) => c.name === categoryName)
                  if (!category) return null

                  return (
                    <Button
                      key={categoryName}
                      onClick={() => selectCharacterForCrown(categoryName)}
                      className="h-auto p-6 flex flex-col items-center space-y-3 bg-gradient-to-br from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 border-2 border-yellow-400 text-gray-800"
                    >
                      <div className="text-4xl">{category.icon}</div>
                      <span className="font-semibold text-center">{category.name}</span>
                      <span className="text-xs text-gray-600">¡Responde para conseguirlo!</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!currentQuestion) return null

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-700">CamreQuiz</h1>
          <div className="flex items-center space-x-4">
            {selectedTime > 0 && (
              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  timeLeft <= 10
                    ? "bg-red-100 text-red-700"
                    : timeLeft <= 20
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-emerald-100 text-emerald-700"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="font-bold">{timeLeft > 0 ? `${timeLeft}s` : "¡Tiempo!"}</span>
              </div>
            )}
            <Button variant="outline" onClick={resetGame} className="border-emerald-300 bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-emerald-700">{team1Name}</h3>
                    {currentTeam === 1 && <Badge className="bg-emerald-600">Turno Actual</Badge>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-600">Coronas ganadas:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(team1Characters)
                      .filter((cat) => selectedCategories.includes(cat))
                      .map((categoryName) => {
                        const category = categories.find((c) => c.name === categoryName)
                        return (
                          <div
                            key={categoryName}
                            className="flex items-center space-x-1 bg-yellow-100 border-2 border-yellow-400 rounded-full px-3 py-1"
                          >
                            <span className="text-lg">{category?.icon}</span>
                            <span className="text-xs font-semibold text-gray-700">{categoryName}</span>
                          </div>
                        )
                      })}
                    {Object.keys(team1Characters).filter((cat) => selectedCategories.includes(cat)).length === 0 && (
                      <span className="text-sm text-gray-400 italic">Ninguna aún</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {Object.keys(team1Characters).filter((cat) => selectedCategories.includes(cat)).length}/
                    {selectedCategories.length} personajes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-red-700">{team2Name}</h3>
                    {currentTeam === 2 && <Badge className="bg-red-600">Turno Actual</Badge>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-gray-600">Coronas ganadas:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(team2Characters)
                      .filter((cat) => selectedCategories.includes(cat))
                      .map((categoryName) => {
                        const category = categories.find((c) => c.name === categoryName)
                        return (
                          <div
                            key={categoryName}
                            className="flex items-center space-x-1 bg-yellow-100 border-2 border-yellow-400 rounded-full px-3 py-1"
                          >
                            <span className="text-lg">{category?.icon}</span>
                            <span className="text-xs font-semibold text-gray-700">{categoryName}</span>
                          </div>
                        )
                      })}
                    {Object.keys(team2Characters).filter((cat) => selectedCategories.includes(cat)).length === 0 && (
                      <span className="text-sm text-gray-400 italic">Ninguna aún</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {Object.keys(team2Characters).filter((cat) => selectedCategories.includes(cat)).length}/
                    {selectedCategories.length} personajes
                  </p>
                </div>
              </CardContent>
            </Card>

            {consecutiveCorrect > 0 && (
              <Card className="bg-green-100 border-green-300">
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="font-semibold text-green-700">
                      ¡Racha de {consecutiveCorrect}!{" "}
                      {consecutiveCorrect === 3
                        ? "¡Elige un personaje y responde bien para ganarlo!"
                        : `${3 - consecutiveCorrect} más para la corona!`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="bg-white flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-emerald-300">
                  {categories.find((c) => c.name === currentQuestion.category)?.icon} {currentQuestion.category}
                </Badge>
                <span className="text-sm text-gray-500">{currentTeam === 1 ? team1Name : team2Name}</span>
              </div>
              <CardTitle className="text-xl text-balance pt-2">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      showResult
                        ? index === currentQuestion.correctAnswer
                          ? "default"
                          : selectedAnswer === index
                            ? "destructive"
                            : "outline"
                        : selectedAnswer === index
                          ? "default"
                          : "outline"
                    }
                    className="justify-start text-left h-auto p-4"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult || (selectedTime > 0 && timeLeft === 0)}
                  >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
              </div>

              <div className="mt-auto pt-4">
                {!showResult && (
                  <Button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null || (selectedTime > 0 && timeLeft === 0)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                  >
                    Confirmar Respuesta
                  </Button>
                )}

                {showResult && (
                  <div className="space-y-4">
                    <div className="text-center p-4 rounded-lg bg-gray-50">
                      {isCorrectAnswer ? (
                        <div className="text-green-600">
                          <p className="font-semibold text-lg">¡Correcto! 🎉</p>
                          {isCrownQuestion ? (
                            <p className="font-bold text-green-700">
                              ¡Ganaste el personaje {categories.find((c) => c.name === currentQuestion.category)?.icon}
                              !
                            </p>
                          ) : consecutiveCorrect === 3 ? (
                            <p>¡Ahora elige un personaje para ganar!</p>
                          ) : (
                            <p>¡Continúa jugando!</p>
                          )}
                        </div>
                      ) : (
                        <div className="text-red-600">
                          <p className="font-semibold text-lg">
                            {selectedTime > 0 && timeLeft === 0 ? "¡Se acabó el tiempo! ⏰" : "Incorrecto 😔"}
                          </p>
                          <p>La respuesta correcta era: {currentQuestion.options[currentQuestion.correctAnswer]}</p>
                          <p className="text-sm">Turno para el otro equipo</p>
                        </div>
                      )}
                    </div>
                    <Button onClick={nextTurn} className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                      {isCorrectAnswer && consecutiveCorrect !== 3 ? "Continuar" : "Cambiar Turno"}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
