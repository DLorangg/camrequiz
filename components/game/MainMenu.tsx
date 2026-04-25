"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Play } from "lucide-react"
import { categories } from "@/lib/data/gameData"
import Image from "next/image"
import { motion } from "framer-motion"

interface MainMenuProps {
  startGame: () => void;
}

export default function MainMenu({ startGame }: MainMenuProps) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="w-full text-center">
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
                    <div className="mb-2 flex justify-center">
                      <Image src={category.image} alt={category.name} width={24} height={24} className="object-contain inline-block" />
                    </div>
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
        </motion.div>
      </div>
    )

}
