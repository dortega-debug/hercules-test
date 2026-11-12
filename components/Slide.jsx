import { storyblokEditable } from "@storyblok/react/rsc";
import { encuadre, foto, srcSet, srcSetMovil, estiloFoto } from "@/lib/utilidades";
import Acciones from "./Acciones";

// Una foto del carrusel (4:3), con título, 2 o 3 líneas y botones opcionales
export default function Slide({ blok }) {
  return (
    <article {...storyblokEditable(blok)} className="w-[82%] shrink-0 snap-start border-l border-linea p-5 first:border-l-0 sm:w-1/2 lg:w-1/3">
      {blok.image?.filename && (
        <picture className="contents">
          {blok.image_mobile?.filename && (
            <source media="(max-width: 767px)" srcSet={srcSetMovil(blok.image_mobile)} sizes="100vw" />
          )}
          <img
            src={foto(blok.image, 1400)}
            srcSet={srcSet(blok.image, [640, 1000, 1400])}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 58vw, 82vw"
            alt={blok.image.alt || ""}
            style={estiloFoto(blok.image, blok.image_mobile)}
            loading="lazy"
            className="[object-position:var(--pos-movil)] md:[object-position:var(--pos)] pieza aspect-[4/3] w-full object-cover"
          />
        </picture>
      )}
      {blok.title && <h3 className="titulo-3 mt-4">{blok.title}</h3>}
      {blok.text && <p className="mt-2 max-w-[44ch] text-tenue">{blok.text}</p>}
      <Acciones blok={blok} className="mt-4" />
    </article>
  );
}
