// Unique golf green border-radius shapes for each hole
// These create smooth, organic blob-like shapes inspired by real golf greens
// Format: border-radius with 8 values (4 corners x 2 radii each)

export const greenBorderRadius: Record<number, string> = {
  // Hole 1 - Gentle oval
  1: "60% 40% 45% 55% / 50% 55% 45% 50%",
  
  // Hole 2 - Kidney bean
  2: "70% 30% 40% 60% / 45% 60% 40% 55%",
  
  // Hole 3 - Elongated blob
  3: "45% 55% 60% 40% / 55% 45% 50% 50%",
  
  // Hole 4 - Organic wave
  4: "55% 45% 50% 50% / 60% 40% 55% 45%",
  
  // Hole 5 - Teardrop
  5: "65% 35% 45% 55% / 50% 50% 45% 55%",
  
  // Hole 6 - Soft cloud
  6: "50% 50% 55% 45% / 55% 45% 50% 50%",
  
  // Hole 7 - Pebble
  7: "58% 42% 48% 52% / 52% 48% 55% 45%",
  
  // Hole 8 - Amoeba
  8: "42% 58% 55% 45% / 48% 52% 45% 55%",
  
  // Hole 9 - Classic round with character
  9: "52% 48% 50% 50% / 50% 50% 52% 48%",
  
  // Hole 10 - Peninsula
  10: "62% 38% 42% 58% / 48% 52% 58% 42%",
  
  // Hole 11 - Mushroom cap
  11: "55% 45% 52% 48% / 58% 42% 48% 52%",
  
  // Hole 12 - Leaf
  12: "68% 32% 38% 62% / 45% 55% 60% 40%",
  
  // Hole 13 - Clover-ish
  13: "48% 52% 58% 42% / 55% 45% 42% 58%",
  
  // Hole 14 - Smooth wave
  14: "55% 45% 48% 52% / 52% 48% 55% 45%",
  
  // Hole 15 - Bowl
  15: "50% 50% 45% 55% / 60% 40% 50% 50%",
  
  // Hole 16 - Butterfly wing
  16: "62% 38% 55% 45% / 45% 55% 38% 62%",
  
  // Hole 17 - Island signature
  17: "70% 30% 35% 65% / 55% 45% 65% 35%",
  
  // Hole 18 - Grand finale
  18: "58% 42% 45% 55% / 52% 48% 58% 42%",
};

export const getGreenBorderRadius = (holeNumber: number): string => {
  return greenBorderRadius[holeNumber] || greenBorderRadius[1];
};
