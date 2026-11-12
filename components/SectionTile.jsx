import { storyblokEditable } from "@storyblok/react/rsc";
import { encuadre, foto, srcSet, srcSetMovil, estiloFoto } from "@/lib/utilidades";
import Acciones from "./Acciones";

export default function SectionTile({ blok }) {
  const logo = blok.logo?.filename;
  return (
    <article {...storyblokEditable(blok)} className="pieza flex flex-col bg-crema p-4 md:p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="titulo-2">{blok.title}</h2>
          {blok.text && <p className="mt-2 max-w-[42ch] text-tenue md:min-h-[2.9rem]">{blok.text}</p>}
        </div>
        {logo && (
          <img src={logo} alt={blok.logo.alt || ""} className="h-auto max-h-14 w-auto max-w-[6.5rem] shrink-0 md:max-h-20 md:max-w-[8rem]" />
        )}
      </div>
      {blok.image?.filename && (
        <div className="mt-4 aspect-[4/3]">
          <picture className="contents">
            {blok.image_mobile?.filename && (
              <source media="(max-width: 767px)" srcSet={srcSetMovil(blok.image_mobile)} sizes="100vw" />
            )}
            <img
              src={foto(blok.image, 1400)}
              srcSet={srcSet(blok.image, [640, 1000, 1400])}
              sizes="(min-width: 768px) 48vw, 100vw"
              alt={blok.image.alt || ""}
              style={estiloFoto(blok.image, blok.image_mobile)}
              loading="lazy"
              className="[object-position:var(--pos-movil)] md:[object-position:var(--pos)] h-full w-full object-cover"
            />
          </picture>
        </div>
      )}
      <Acciones blok={blok} className="mt-4" />
    </article>
  );
}
