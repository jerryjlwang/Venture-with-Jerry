// SVG path definitions for organic golf green shapes
// These create smooth, natural-looking greens with both concave and convex curves
// Viewbox is 0-100 for both x and y, paths designed with curves inward and outward

export const greenSvgPaths: Record<number, string> = {
  // Hole 1 - Classic oval with gentle indent on left
  1: "M 5,50 C 5,20 20,5 50,5 C 80,5 95,20 95,50 C 95,80 80,95 50,95 C 20,95 5,80 5,50 Z",
  
  // Hole 2 - Kidney bean with strong indent
  2: "M 10,40 C 5,15 25,5 50,8 C 75,5 95,20 95,45 C 98,75 80,95 50,92 C 25,95 8,80 12,55 C 8,50 10,45 10,40 Z",
  
  // Hole 3 - Pinched hourglass
  3: "M 8,45 C 5,15 30,5 50,5 C 70,5 95,15 92,45 C 95,55 92,85 50,95 C 8,85 5,55 8,45 Z",
  
  // Hole 4 - Amoeba with two lobes
  4: "M 12,50 C 5,25 15,5 40,8 C 55,5 75,10 88,30 C 98,45 95,65 85,80 C 70,95 45,98 25,85 C 8,72 8,60 12,50 Z",
  
  // Hole 5 - Teardrop pointing right
  5: "M 15,50 C 10,25 25,8 50,5 C 80,5 98,35 95,55 C 92,78 70,95 45,95 C 20,95 8,75 15,50 Z",
  
  // Hole 6 - Cloud with dip at top
  6: "M 10,55 C 5,30 25,10 45,15 C 55,8 75,12 90,30 C 100,50 95,75 70,90 C 45,98 15,88 8,65 C 3,55 10,55 10,55 Z",
  
  // Hole 7 - Peanut/figure-8
  7: "M 15,45 C 8,20 25,5 45,10 C 55,8 70,8 82,20 C 95,35 92,55 85,70 C 75,88 55,95 40,90 C 22,85 8,70 15,45 Z",
  
  // Hole 8 - Blob with bite taken out
  8: "M 10,45 C 5,20 25,5 55,8 C 80,5 98,25 95,50 C 98,75 78,95 50,95 C 30,92 18,82 20,65 C 15,55 12,50 10,45 Z",
  
  // Hole 9 - Round with character bumps
  9: "M 8,50 C 5,20 30,3 55,5 C 82,5 98,25 95,52 C 95,80 75,98 48,95 C 18,95 5,75 8,50 Z",
  
  // Hole 10 - Peninsula jutting out
  10: "M 12,55 C 5,30 20,8 50,5 C 78,5 95,22 98,48 C 100,72 85,92 55,95 C 28,95 10,80 8,60 C 5,55 12,55 12,55 Z",
  
  // Hole 11 - Mushroom cap
  11: "M 8,60 C 3,35 18,10 45,5 C 75,5 92,20 95,45 C 98,68 85,90 55,95 C 25,95 5,78 8,60 Z",
  
  // Hole 12 - Leaf with stem indent
  12: "M 15,48 C 8,22 28,5 55,5 C 82,8 98,30 95,55 C 92,82 72,98 45,95 C 18,92 5,72 10,52 C 8,48 15,48 15,48 Z",
  
  // Hole 13 - Clover with curves
  13: "M 10,50 C 3,25 22,5 48,8 C 75,3 95,22 95,48 C 98,75 78,98 48,95 C 20,95 5,75 10,50 Z",
  
  // Hole 14 - Smooth wave
  14: "M 12,45 C 5,18 30,5 55,5 C 82,8 98,30 95,55 C 92,82 68,98 42,95 C 15,92 5,70 12,45 Z",
  
  // Hole 15 - Bowl with curved rim
  15: "M 8,52 C 3,25 25,3 52,5 C 80,5 98,28 95,55 C 92,82 70,98 42,95 C 15,92 3,72 8,52 Z",
  
  // Hole 16 - Heart-ish organic
  16: "M 12,48 C 8,22 28,3 50,5 C 72,3 92,22 92,48 C 95,75 75,98 50,95 C 25,98 5,75 12,48 Z",
  
  // Hole 17 - Famous island green inspired - distinct rounded shape
  17: "M 18,45 C 12,18 35,3 55,5 C 78,5 95,22 95,48 C 95,75 78,95 52,95 C 25,95 8,72 18,45 Z",
  
  // Hole 18 - Grand finale - expansive organic
  18: "M 8,48 C 3,18 28,3 52,5 C 78,3 98,22 95,52 C 95,82 75,98 48,95 C 20,98 3,75 8,48 Z",
};

export const getGreenSvgPath = (holeNumber: number): string => {
  return greenSvgPaths[holeNumber] || greenSvgPaths[1];
};
