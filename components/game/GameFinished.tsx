"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, RotateCcw } from "lucide-react"
import { categories } from "@/lib/data/gameData"

import { type TeamCharacters } from "@/hooks/useCamreQuiz"

interface GameFinishedProps {
  selectedCategories: string[];
  winner: number | null;
  team1Name: string;
  team2Name: string;
  team1Characters: TeamCharacters;
  team2Characters: TeamCharacters;
  resetGame: () => void;
}

export default function GameFinished({
  selectedCategories,
  winner,
  team1Name,
  team2Name,
  team1Characters,
  team2Characters,
  resetGame
}: GameFinishedProps) {
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
