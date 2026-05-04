import { useEffect, useEffectEvent } from "react";

export function useKeyboard({
  key,
  onKeyPressed
}) {
  let keyDownHandler = useEffectEvent((e) => {
    if (e.key === key) {
      e.preventDefault();
      onKeyPressed();
    }
  })
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
}
