import { useEffect, useState } from "react";

export const useDimensions = (ref: React.RefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const update = () => {
      setDimensions({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    };

    update(); // одразу встановлюємо значення

    // (опціонально) на майбутнє: якщо хочеш, щоб реагував на resize
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);

  return dimensions;
};
