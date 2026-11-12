import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { encuadre, enlace, foto, srcSet } from "@/lib/utilidades";

const meses = {
  es: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"],
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
};

// Un evento de la cartelera. En laptop: fecha, foto, texto y botón en una
// misma fila; en celular se apilan. La fecha se guarda en Storyblok como
// "2026-12-05 21:00" y aquí se parte en día y mes para mostrarla grande.
export default function Evento({ blok }) {
  const lang = blok._idioma || "es";
  const fecha = typeof blok.date === "string" ? blok.date.slice(0, 10).split("-") : null;
  const dia = fecha?.[2];
  const mes = fecha ? meses[lang]?.[Number(fecha[1]) - 1] : null;
  const href = enlace(blok.link, lang);
  const conFoto = Boolean(blok.image?.filename);

  const contenido = (
    <div
      className={`grid items-center gap-x-6 gap-y-4 py-4 sm:py-5 ${
        conFoto
          ? "sm:grid-cols-[4.5rem_9rem_1fr_auto]"
          : "sm:grid-cols-[4.5rem_1fr_auto]"
      }`}
    >
      {/* Fecha: en celular en una línea, en laptop apilada */}
      {dia && (
        <p className="flex items-baseline gap-2 sm:block">
          <span className="titulo-2 leading-none">{dia}</span>
          <span className="etiqueta text-tenue">{mes}</span>
        </p>
      )}

      {conFoto && (
        <div className="pieza aspect-[4/3] w-full sm:aspect-square">
          <img
            src={foto(blok.image, 500)}
            srcSet={srcSet(blok.image, [300, 500, 700])}
            sizes="(min-width: 640px) 9rem, 100vw"
            alt={blok.image.alt || ""}
            style={{ objectPosition: encuadre(blok.image) }}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/evento:scale-[1.04]"
          />
        </div>
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
    <li {...storyblokEditable(blok)} className="border-t border-linea first:border-t-0">
      {href ? (
        <Link href={href} className="group/evento block">
          {contenido}
        </Link>
      ) : (
        contenido
      )}
    </li>
  );
}
