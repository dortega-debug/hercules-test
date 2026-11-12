"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { idiomas } from "@/lib/i18n";

// Misma página en el otro idioma: /es/hotel -> /en/hotel
function rutaEn(ruta, lang) {
  return `/${lang}${ruta.replace(/^\/(es|en)(?=\/|$)/, "")}`;
}

function SelectorIdioma({ ruta, lang, t }) {
  return (
    <ul aria-label={t.idioma} className="etiqueta flex gap-3">
      {idiomas.map((l) => (
        <li key={l}>
          <Link
            href={rutaEn(ruta, l)}
            hrefLang={l}
            aria-current={l === lang ? "true" : undefined}
            className="text-tenue hover:text-carbon aria-[current=true]:text-carbon aria-[current=true]:underline aria-[current=true]:underline-offset-4"
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Las tres rayitas del menú; al abrir se convierten en una X
function Rayitas({ abierto }) {
  const linea = "absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300";
  return (
    <span aria-hidden="true" className="pointer-events-none relative block h-3.5 w-6">
      <span className={`${linea} top-0 ${abierto ? "translate-y-[6px] rotate-45" : ""}`} />
      <span className={`${linea} top-[6px] ${abierto ? "opacity-0" : ""}`} />
      <span className={`${linea} top-3 ${abierto ? "-translate-y-[6px] -rotate-45" : ""}`} />
    </span>
  );
}

// Menú fijo arriba, con el logo al centro.
// Celular: ES/EN a la izquierda, logo al centro, menú hamburguesa a la derecha.
// Laptop: enlaces a la izquierda, logo al centro, ES/EN a la derecha.
export default function Nav({ lang, menu, t }) {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);

  useEffect(() => setAbierto(false), [ruta]);
  useEffect(() => {
    if (!abierto) return;
    const conTecla = (e) => e.key === "Escape" && setAbierto(false);
    const ancho = window.matchMedia("(min-width: 64rem)");
    const conAncho = () => ancho.matches && setAbierto(false);
    window.addEventListener("keydown", conTecla);
    ancho.addEventListener("change", conAncho);
    return () => {
      window.removeEventListener("keydown", conTecla);
      ancho.removeEventListener("change", conAncho);
    };
  }, [abierto]);

  return (
    <header className="linea-pasante sticky top-0 z-40 bg-crema text-carbon">
      {/* Tres columnas iguales: así el logo queda centrado de verdad */}
      <div className="contenedor grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="justify-self-start">
          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="etiqueta flex gap-7">
              {menu.map((m) => (
                <li key={m.ruta}>
                  <Link
                    href={m.ruta}
                    aria-current={ruta === m.ruta ? "page" : undefined}
                    className="underline-offset-4 hover:underline aria-[current=page]:underline"
                  >
                    {m.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:hidden">
            <SelectorIdioma ruta={ruta} lang={lang} t={t} />
          </div>
        </div>

        <Link href={`/${lang}`} aria-label={t.inicio} className="justify-self-center">
          <span className="logo w-10 md:w-11" />
        </Link>

        <div className="justify-self-end">
          <div className="hidden lg:block">
            <SelectorIdioma ruta={ruta} lang={lang} t={t} />
          </div>
          <button
            type="button"
            className="-mr-2 flex h-11 w-11 cursor-pointer touch-manipulation items-center justify-center [-webkit-tap-highlight-color:transparent] lg:hidden"
            aria-label={abierto ? t.cerrar : t.menu}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            onClick={() => setAbierto(!abierto)}
          >
            <Rayitas abierto={abierto} />
          </button>
        </div>
      </div>

      {/* Panel del celular: lista con una línea entre cada opción */}
      <div
        id="menu-movil"
        inert={!abierto}
        className={`grid border-linea transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          abierto ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label="Principal" className="contenedor pb-4">
            <ul>
              {menu.map((m) => (
                <li key={m.ruta} className="border-b border-linea last:border-b-0">
                  <Link href={m.ruta} className="titulo-3 flex items-center justify-between py-4">
                    {m.nombre}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
