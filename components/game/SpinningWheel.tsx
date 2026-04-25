"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"
import { categories } from "@/lib/data/gameData"

interface SpinningWheelProps {
  currentTeam: number;
  team1Name: string;
  team2Name: string;
  selectedCategories: string[];
  isSpinning: boolean;
  spinningCategory: string;
  selectedCategory: string;
  showSpinButton: boolean;
  spinWheel: () => void;
}

export default function SpinningWheel({
  currentTeam,
  team1Name,
  team2Name,
  selectedCategories,
  isSpinning,
  spinningCategory,
  selectedCategory,
  showSpinButton,
  spinWheel
}: SpinningWheelProps) {
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
