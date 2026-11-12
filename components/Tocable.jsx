"use client";
import { useEffect, useRef, useState } from "react";

// En celular (pantallas sin mouse) la tarjeta se abre sola al hacer scroll:
// se marca con data-activo="true" mientras está en la franja central de la
// pantalla y se cierra al salir de ella. Con mouse no hace nada: ahí manda
// el hover. Si el navegador no soporta IntersectionObserver, se queda abierta.
export default function Tocable({ as: Etiqueta = "div", children, ...props }) {
  const ref = useRef(null);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (typeof IntersectionObserver !== "function") {
      setActivo(true);
      return;
    }
    // La franja central: ni arriba ni abajo de la pantalla, el 40% de en medio
    const observador = new IntersectionObserver(
      ([entrada]) => setActivo(entrada.isIntersecting),
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <Etiqueta ref={ref} data-activo={activo} {...props}>
      {children}
    </Etiqueta>
  );
}
