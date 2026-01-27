// SVG path definitions for organic golf green shapes
// These create smooth, natural-looking greens with both concave and convex curves
// The paths are designed to frame content without clipping

export const greenSvgPaths: Record<number, string> = {
  // Hole 1 - Classic oval with gentle waves
  1: "M 10,50 Q 10,10 50,8 Q 90,6 95,50 Q 98,90 50,95 Q 10,92 10,50",
  
  // Hole 2 - Kidney bean with indent
  2: "M 8,40 Q 5,10 40,5 Q 75,2 95,30 Q 100,60 90,85 Q 70,100 40,95 Q 10,90 5,60 Q 2,45 8,40",
  
  // Hole 3 - Elongated with pinched middle
  3: "M 5,50 Q 3,15 35,5 Q 65,0 95,15 Q 100,50 95,85 Q 65,100 35,95 Q 5,85 5,50",
  
  // Hole 4 - Figure-8 inspired subtle
  4: "M 10,45 Q 8,10 45,5 Q 80,2 95,35 Q 102,55 95,75 Q 80,98 45,95 Q 10,90 8,60 Q 6,50 10,45",
  
  // Hole 5 - Teardrop with curve
  5: "M 15,35 Q 20,5 55,3 Q 90,5 98,40 Q 100,75 85,92 Q 55,100 25,92 Q 5,80 5,50 Q 5,40 15,35",
  
  // Hole 6 - Cloud with dip
  6: "M 5,45 Q 2,15 40,5 Q 55,8 70,5 Q 98,10 98,50 Q 100,85 60,95 Q 25,98 8,75 Q 0,55 5,45",
  
  // Hole 7 - Peanut shape
  7: "M 12,50 Q 10,20 35,8 Q 55,5 75,10 Q 95,20 95,50 Q 95,80 75,92 Q 55,98 35,92 Q 10,80 12,50",
  
  // Hole 8 - Amoeba with indent
  8: "M 8,55 Q 5,25 30,10 Q 55,2 80,12 Q 98,30 95,55 Q 92,80 70,95 Q 40,100 15,85 Q 2,70 8,55",
  
  // Hole 9 - Classic with character bumps
  9: "M 10,50 Q 8,18 45,6 Q 80,4 95,35 Q 100,55 95,75 Q 80,96 45,96 Q 12,94 8,65 Q 5,55 10,50",
  
  // Hole 10 - Peninsula with bay
  10: "M 5,40 Q 3,12 45,4 Q 85,2 98,35 Q 102,60 92,82 Q 70,98 40,96 Q 12,92 5,65 Q 0,50 5,40",
  
  // Hole 11 - Mushroom cap organic
  11: "M 8,55 Q 5,20 35,6 Q 65,2 90,18 Q 100,45 95,70 Q 82,95 50,98 Q 18,95 5,72 Q 2,60 8,55",
  
  // Hole 12 - Leaf with stem indent
  12: "M 12,45 Q 15,10 50,4 Q 85,6 98,35 Q 100,65 88,88 Q 60,100 30,95 Q 8,85 4,60 Q 2,48 12,45",
  
  // Hole 13 - Clover-ish with curves
  13: "M 8,50 Q 5,18 40,5 Q 70,2 92,22 Q 100,50 92,78 Q 70,98 40,95 Q 10,88 5,62 Q 2,52 8,50",
  
  // Hole 14 - Smooth wave with dip
  14: "M 10,48 Q 8,15 48,5 Q 88,8 98,40 Q 100,70 88,90 Q 55,100 22,92 Q 5,78 5,55 Q 4,50 10,48",
  
  // Hole 15 - Bowl with curved rim
  15: "M 6,45 Q 4,12 45,4 Q 85,5 98,38 Q 102,65 90,88 Q 58,100 25,94 Q 5,82 3,55 Q 2,48 6,45",
  
  // Hole 16 - Butterfly wing organic
  16: "M 10,42 Q 12,8 50,3 Q 88,8 98,38 Q 100,68 85,90 Q 50,100 20,90 Q 5,72 3,48 Q 2,42 10,42",
  
  // Hole 17 - Island signature (famous hole 17 style)
  17: "M 15,40 Q 20,5 55,2 Q 92,8 100,42 Q 98,78 80,95 Q 45,102 18,88 Q 2,68 5,42 Q 8,38 15,40",
  
  // Hole 18 - Grand finale expansive
  18: "M 8,48 Q 6,12 48,4 Q 90,6 98,42 Q 102,75 85,92 Q 50,100 18,92 Q 2,72 4,48 Q 5,45 8,48",
};

export const getGreenSvgPath = (holeNumber: number): string => {
  return greenSvgPaths[holeNumber] || greenSvgPaths[1];
};
