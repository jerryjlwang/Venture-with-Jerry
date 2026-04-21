import { MouseQuadrantTracker } from "@/components/ui/mouse-quadrant-tracker"

export default function MouseQuadrantDemo() {
  return (
    <MouseQuadrantTracker
      containerClassName="h-full w-full"
      className="text-center font-bold tracking-[-0.08em]"
      text="Jerry Wang"
      hue={210}
      textColor="hsl(191 100% 92%)"
      fontSize="clamp(4rem,12vw,8rem)"
      shadowIntensity={6}
      layerCount={4}
      minHeight="100%"
      padding="0"
    />
  )
}
