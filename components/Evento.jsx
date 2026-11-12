import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { enlace } from "@/lib/utilidades";

const meses = {
  es: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"],
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
};

// Un evento de la cartelera. La fecha se guarda en Storyblok como
// "2026-12-05 21:00" y aquí se parte en día y mes para mostrarla grande.
export default function Evento({ blok }) {
  const lang = blok._idioma || "es";
  const fecha = typeof blok.date === "string" ? blok.date.slice(0, 10).split("-") : null;
  const dia = fecha?.[2];
  const mes = fecha ? meses[lang]?.[Number(fecha[1]) - 1] : null;
  const href = enlace(blok.link, lang);

  const contenido = (
    <div className="grid gap-x-6 gap-y-3 border-t border-linea py-5 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline">
      {dia && (
        <p className="flex items-baseline gap-2 sm:block">
          <span className="titulo-2">{dia}</span>
          <span className="etiqueta text-tenue">{mes}</span>
        </p>
      )}
      <div className="min-w-0">
        <h3 className="titulo-3">{blok.title}</h3>
        {(blok.place || blok.time) && (
          <p className="etiqueta mt-2 text-tenue">
            {[blok.place, blok.time].filter(Boolean).join(" · ")}
          </p>
        )}
        {blok.text && <p className="mt-2 max-w-[52ch] text-tenue">{blok.text}</p>}
      </div>
      {href && blok.link_label && (
        <span className="boton w-full justify-self-start sm:w-auto">{blok.link_label}</span>
      )}
    </div>
  );

  return (
    <li {...storyblokEditable(blok)} className="last:border-b last:border-linea">
      {href ? (
        <Link href={href} className="group block hover:bg-arena">
          {contenido}
        </Link>
      ) : (
        contenido
      )}
    </li>
  );
}
