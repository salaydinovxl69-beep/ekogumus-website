import { useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

/**
 * Логотипы компании (header + footer), показываются рядом.
 * Сначала пробуем оптимизированный webp из public/images/optimized/
 * (генерирует scripts/optimize-images.mjs: 80px для 1x, 160px для 2x),
 * при ошибке откатываемся на исходный png, затем — иконка-росток.
 * size — базовый размер; на узких экранах CSS уменьшает его
 * через переменную --brand-logo (см. earthy.css).
 */
const LOGOS = [
  {
    webp: "/images/optimized/logo-80.webp",
    webp2x: "/images/optimized/logo-160.webp",
    png: "/images/originals/logo.png",
  },
  {
    webp: "/images/optimized/logo_1-80.webp",
    webp2x: "/images/optimized/logo_1-160.webp",
    png: "/images/originals/Logo_1.png",
  },
];

// Стадии загрузки: 0 — webp, 1 — исходный png, 2 — не загрузился.
export function BrandLogo({ size = 70 }: { size?: number }) {
  const [stage, setStage] = useState<number[]>(() => LOGOS.map(() => 0));

  const bump = (i: number) =>
    setStage((prev) => prev.map((s, j) => (j === i ? s + 1 : s)));

  const box = { "--brand-logo": `${size}px` } as CSSProperties;

  if (stage.every((s) => s >= 2)) {
    return (
      <span className="brand__marks" style={box}>
        <span className="brand__mark">
          <Icon name="sprout" size={Math.round(size * 0.55)} />
        </span>
      </span>
    );
  }

  return (
    <span className="brand__marks" style={box}>
      {LOGOS.map((logo, i) =>
        stage[i] >= 2 ? null : (
          <span key={logo.png} className="brand__mark brand__mark--logo">
            <img
              src={stage[i] === 0 ? logo.webp : logo.png}
              srcSet={
                stage[i] === 0
                  ? `${logo.webp} 1x, ${logo.webp2x} 2x`
                  : undefined
              }
              alt=""
              width={size}
              height={size}
              loading="eager"
              decoding="async"
              onError={() => bump(i)}
            />
          </span>
        )
      )}
    </span>
  );
}
