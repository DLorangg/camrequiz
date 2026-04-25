"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Play } from "lucide-react"
import { categories } from "@/lib/data/gameData"

interface MainMenuProps {
  startGame: () => void;
}

export default function MainMenu({ startGame }: MainMenuProps) {
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
