"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = ".aparece, .aparece-foto";

// Animación automática al hacer scroll: marca con data-visible cada
// elemento .aparece / .aparece-foto cuando entra a la pantalla. También
// funciona dentro de los carruseles: cada tarjeta se anima cuando el
// carrusel la trae a la vista. Los que entran juntos salen escalonados.
export default function Animaciones() {
  const ruta = usePathname();

  useEffect(() => {
    const raiz = document.documentElement;
    if (!("animar" in raiz.dataset)) return; // el navegador pidió menos movimiento (lo marca el layout)

    const observador = new IntersectionObserver(
      (entradas) => {
        let orden = 0;
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.style.setProperty("--retraso", `${Math.min(orden++, 5) * 90}ms`);
          e.target.dataset.visible = "";
          observador.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    );

    const vigilar = (nodo) => {
      if (nodo.matches?.(SELECTOR) && !("visible" in nodo.dataset)) observador.observe(nodo);
      nodo.querySelectorAll?.(SELECTOR).forEach((el) => {
        if (!("visible" in el.dataset)) observador.observe(el);
      });
    };
    vigilar(document);

    // Contenido que llega después (navegación, Editor Visual de Storyblok)
    const cambios = new MutationObserver((lista) => {
      for (const c of lista) c.addedNodes.forEach((n) => n.nodeType === 1 && vigilar(n));
    });
    cambios.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      cambios.disconnect();
    };
  }, [ruta]);

  return null;
}

