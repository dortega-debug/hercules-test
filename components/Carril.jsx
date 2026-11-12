"use client";
import { useEffect, useRef } from "react";

// Pista horizontal con scroll suave: en celular se desliza con el dedo,
// en laptop también con las flechas. Con "auto" avanza sola cada 5 s y se
// detiene cuando el visitante pasa el mouse, lo toca o usa el teclado.
export default function Carril({ cabecera, etiqueta, anterior, siguiente, auto = false, children }) {
  const pista = useRef(null);
  const quieto = useRef(false);

  const paso = (el) => {
    const primera = el.firstElementChild;
    return primera ? primera.getBoundingClientRect().width : el.clientWidth * 0.8;
  };

  const mover = (direccion) => {
    const el = pista.current;
    if (el) el.scrollBy({ left: direccion * paso(el), behavior: "smooth" });
  };

  useEffect(() => {
    const el = pista.current;
    if (!auto || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pausar = () => { quieto.current = true; };
    const seguir = () => { quieto.current = false; };
    for (const evento of ["pointerdown", "pointerenter", "focusin"]) el.addEventListener(evento, pausar);
    el.addEventListener("pointerleave", seguir);

    const id = setInterval(() => {
      if (quieto.current || document.hidden) return;
      const fin = el.scrollWidth - el.clientWidth - 8;
      // Al llegar al final regresa al principio
      if (el.scrollLeft >= fin) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: paso(el), behavior: "smooth" });
    }, 5000);

    return () => {
      clearInterval(id);
      for (const evento of ["pointerdown", "pointerenter", "focusin"]) el.removeEventListener(evento, pausar);
      el.removeEventListener("pointerleave", seguir);
    };
  }, [auto]);

  const flecha = "flex size-11 items-center justify-center rounded-[--radius-pieza] border border-carbon bg-crema transition-colors hover:bg-carbon hover:text-crema";

  return (
    <div>
      <div className="contenedor">
        <div className="cabecera">
          <div className="flex flex-1 flex-wrap items-end justify-between gap-x-8 gap-y-3">{cabecera}</div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <button type="button" aria-label={anterior} onClick={() => mover(-1)} className={flecha}>←</button>
            <button type="button" aria-label={siguiente} onClick={() => mover(1)} className={flecha}>→</button>
          </div>
        </div>
      </div>
      <div
        ref={pista}
        role="region"
        aria-label={etiqueta}
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto"
      >
        {children}
      </div>
    </div>
  );
}
