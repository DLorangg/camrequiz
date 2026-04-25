"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Trophy,
  Users,
  Play,
  RotateCcw,
  Check,
  X,
  Clock,
  Crown,
  Volume2,
  VolumeX,
} from "lucide-react"

import { type Question, questions, categories } from "@/lib/data/gameData"

import { useCamreQuiz, timeOptions } from "@/hooks/useCamreQuiz"

export default function CamreQuiz() {
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

  const isCrownQuestion = availableCharactersForCrown.length > 0

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
            <Button variant="outline" size="icon" onClick={() => setIsSoundEnabled(!isSoundEnabled)}>
              {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="sr-only">{isSoundEnabled ? "Desactivar sonido" : "Activar sonido"}</span>
            </Button>
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
