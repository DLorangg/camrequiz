"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"
import { categories } from "@/lib/data/gameData"
import dynamic from "next/dynamic"

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
)

interface SpinningWheelProps {
  currentTeam: number;
  team1Name: string;
  team2Name: string;
  selectedCategories: string[];
  isSpinning: boolean;
  prizeNumber: number;
  showSpinButton: boolean;
  spinWheel: () => void;
  onStopSpinning: () => void;
}

const tailwindToHex: Record<string, string> = {
  "bg-emerald-500": "#10b981",
  "bg-red-500": "#ef4444",
  "bg-blue-500": "#3b82f6",
  "bg-orange-500": "#f97316",
  "bg-yellow-500": "#eab308",
  "text-white": "#ffffff",
  "text-black": "#000000",
};

export default function SpinningWheel({
  currentTeam,
  team1Name,
  team2Name,
  selectedCategories,
  isSpinning,
  prizeNumber,
  showSpinButton,
  spinWheel,
  onStopSpinning
}: SpinningWheelProps) {
    const availableCategories = categories.filter((c) => selectedCategories.includes(c.name))
    const wheelCategories = [...availableCategories]
    wheelCategories.push({ name: "Corona", color: "bg-yellow-500", icon: "👑", textColor: "text-black" })

    const data = wheelCategories.map((c) => ({
      option: `${c.icon} ${c.name}`,
      style: {
        backgroundColor: tailwindToHex[c.color] || "#cbd5e1",
        textColor: tailwindToHex[c.textColor] || "#ffffff"
      }
    }))

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
              <Wheel
                mustStartSpinning={isSpinning}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={onStopSpinning}
                outerBorderColor="#e2e8f0"
                outerBorderWidth={5}
                innerBorderColor="#e2e8f0"
                innerBorderWidth={5}
                innerRadius={15}
                radiusLineColor="#e2e8f0"
                radiusLineWidth={2}
                fontSize={16}
                textDistance={65}
                spinDuration={0.5}
              />

              {!isSpinning && showSpinButton && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <Button
                    onClick={spinWheel}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-20 w-20 rounded-full shadow-2xl flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )

}
