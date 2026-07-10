/* «Земля и Зерно» — small shared presentational primitives. */
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";
import type { ImgSource } from "../../utils/img";

/* ---------------- Eyebrow ---------------- */
export function Eyebrow({
  children,
  variant = "",
  className = "",
}: {
  children: ReactNode;
  variant?: "green" | "clay" | "";
  className?: string;
}) {
  const v = variant === "green" ? "eyebrow--green" : "";
  return <span className={`eyebrow ${v} ${className}`.trim()}>{children}</span>;
}

/* ---------------- Section header ---------------- */
export function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
  light = false,
  maxSub = 560,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  light?: boolean;
  maxSub?: number;
}) {
  return (
    <div
      className={`sec-head ${center ? "sec-head--center" : ""}`}
      style={{ ["--maxsub" as string]: maxSub + "px" }}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow variant={light ? "" : "green"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={1}>
        <h2 className="h-section" style={light ? { color: "var(--cream)" } : undefined}>
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={2}>
          <p
            className="lead sec-head__sub"
            style={light ? { color: "rgba(243,236,221,.8)" } : undefined}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Image slot (real photo or styled placeholder) ----------------
   The handoff used drag-to-fill <image-slot> web components. In the real app we
   render an actual <img> when we have a matching asset, otherwise an earthy
   striped placeholder that matches the prototype's empty-slot language. */
export function Slot({
  src,
  alt = "",
  placeholder,
  radius,
  fit = "cover",
  className = "",
  style = {},
  sources = null,
  sizes,
  priority = false,
  width,
  height,
}: {
  src?: string;
  alt?: string;
  placeholder: string;
  radius?: number;
  fit?: "cover" | "contain";
  className?: string;
  style?: CSSProperties;
  /** AVIF/WebP-варианты для <picture>; оригинал из src остаётся фолбэком. */
  sources?: ImgSource[] | null;
  sizes?: string;
  /** Для LCP-изображения первого экрана: eager + fetchpriority=high вместо lazy. */
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const radiusStyle: CSSProperties =
    radius != null ? { borderRadius: radius + "px" } : {};
  // Если файл по src не нашёлся — показываем плейсхолдер вместо битой картинки.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (src && failedSrc !== src) {
    const img = (
      <img
        src={src}
        alt={alt || placeholder}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={width}
        height={height}
        className={`eko-img ${className}`.trim()}
        style={{ objectFit: fit, ...radiusStyle, ...style }}
        onError={() => setFailedSrc(src)}
        // React 18 пропускает неизвестные атрибуты только в lowercase-записи
        {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : null)}
      />
    );
    if (sources && sources.length) {
      // .eko picture { display: contents } — обёртка не участвует в раскладке.
      return (
        <picture>
          {sources.map((s) => (
            <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />
          ))}
          {img}
        </picture>
      );
    }
    return img;
  }

  return (
    <div className={`ph ${className}`.trim()} style={{ ...radiusStyle, ...style }} role="img" aria-label={placeholder}>
      <span className="ph__label">{placeholder}</span>
    </div>
  );
}
