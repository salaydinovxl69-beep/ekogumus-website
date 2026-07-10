import { useEffect } from "react";

/* Счётчик блокировок: скролл возвращается только когда закрыт
   последний modal/drawer (вложенные окна не сбрасывают друг друга). */
let locks = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    document.body.style.overflow = "hidden";
    return () => {
      locks -= 1;
      if (locks === 0) document.body.style.overflow = "";
    };
  }, [active]);
}
