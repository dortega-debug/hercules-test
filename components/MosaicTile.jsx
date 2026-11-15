import { storyblokEditable } from "@storyblok/react/rsc";
import { foto, srcSet, srcSetMovil, estiloFoto } from "@/lib/utilidades";
import Acciones from "./Acciones";

// Una tarjeta de lugar: logo al centro de la foto, la ciudad, una línea de
// descripción y los botones abajo. Los botones son los únicos enlaces de la
// tarjeta: así cada acción es clara y no se anida un enlace dentro de otro,
// que confunde al teclado y a los lectores de pantalla.
export default function MosaicTile({ blok }) {
  const logo = blok.logo?.filename;

  return (
    <article {...storyblokEditable(blok)} className="celda-tarjeta h-full">
      <div className="pieza group/mosaico relative aspect-[4/5] bg-carbon text-crema">
        {blok.image?.filename && (
          <picture className="contents">
            {blok.image_mobile?.filename && (
              <source media="(max-width: 767px)" srcSet={srcSetMovil(blok.image_mobile)} sizes="100vw" />
            )}
            <img
              src={foto(blok.image, 900)}
              srcSet={srcSet(blok.image, [480, 900, 1300])}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 80vw"
              alt=""
              style={estiloFoto(blok.image, blok.image_mobile)}
              loading="lazy"
              className="[object-position:var(--pos-movil)] md:[object-position:var(--pos)] absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-carbon/50 transition-colors duration-300 group-hover/mosaico:bg-carbon/65"
        />

        <div className="sobre-foto relative flex h-full flex-col items-center justify-center gap-5 p-5 text-center">
          <div>
            {logo ? (
              <>
                <img src={logo} alt="" className="mx-auto h-auto max-h-20 w-auto max-w-[64%]" />
                <h3 className="sr-only">{blok.name}</h3>
              </>
            ) : (
              <h3 className="titulo-2">{blok.name}</h3>
            )}
            {blok.city && <p className="etiqueta mt-3 opacity-90">{blok.city}</p>}
            {blok.text && <p className="mx-auto mt-3 max-w-[30ch] text-[0.9375rem]">{blok.text}</p>}
          </div>
          <Acciones blok={blok} className="w-full" alineacion="sm:justify-center" />
        </div>
      </div>
    </article>
  );
}
