"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Clock, Check, X, Play, RotateCcw } from "lucide-react"
import { categories } from "@/lib/data/gameData"
import { timeOptions } from "@/hooks/useCamreQuiz"

import { type GameState } from "@/hooks/useCamreQuiz"

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
}

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


  return null;
}
