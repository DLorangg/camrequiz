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
import MainMenu from "@/components/game/MainMenu"
import SetupScreen from "@/components/game/SetupScreen"
import SpinningWheel from "@/components/game/SpinningWheel"
import GameFinished from "@/components/game/GameFinished"

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
