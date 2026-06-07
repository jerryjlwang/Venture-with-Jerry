import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  speed = 28,
  startDelay = 400
) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [output, setOutput] = useState(reducedMotion ? text : "");

  useEffect(() => {
    if (reducedMotion) {
      setOutput(text);
      return;
    }

    setOutput("");
    let index = 0;
    let characterTimer: ReturnType<typeof setTimeout> | undefined;

    const startTimer = setTimeout(function typeNextCharacter() {
      setOutput(text.slice(0, index + 1));
      index += 1;

      if (index < text.length) {
        characterTimer = setTimeout(typeNextCharacter, speed);
      }
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (characterTimer) {
        clearTimeout(characterTimer);
      }
    };
  }, [reducedMotion, speed, startDelay, text]);

  return output;
}
