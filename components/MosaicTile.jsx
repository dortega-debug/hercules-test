import { storyblokEditable } from "@storyblok/react/rsc";
import { encuadre, foto, srcSet, srcSetMovil, estiloFoto } from "@/lib/utilidades";
import Acciones from "./Acciones";
import Tocable from "./Tocable";

// Una foto del carrusel de lugares: el logo grande al centro y la ciudad
// debajo. Con mouse, al pasar por encima; en celular, al apoyar el dedo:
// la foto se oscurece, el logo se encoge y aparecen el texto y los botones.
export default function MosaicTile({ blok }) {
  const logo = blok.logo?.filename;

  return (
    <Tocable
      as="article"
      {...storyblokEditable(blok)}
      className="group/mosaico pieza relative aspect-[4/5] w-[78%] shrink-0 snap-start bg-carbon text-crema [-webkit-tap-highlight-color:transparent] sm:w-[46%] lg:w-[30%] xl:w-[23%]"
    >
      {blok.image?.filename && (
        <picture className="contents">
          {blok.image_mobile?.filename && (
            <source media="(max-width: 767px)" srcSet={srcSetMovil(blok.image_mobile)} sizes="100vw" />
          )}
          <img
            src={foto(blok.image, 900)}
            srcSet={srcSet(blok.image, [480, 900, 1300])}
            sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
            alt=""
            style={estiloFoto(blok.image, blok.image_mobile)}
            loading="lazy"
            className="[object-position:var(--pos-movil)] md:[object-position:var(--pos)] absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-carbon/25 transition-colors duration-300 group-hover/mosaico:bg-carbon/65 group-focus-within/mosaico:bg-carbon/65 group-data-[activo=true]/mosaico:bg-carbon/65"
      />
      <div className="sobre-foto relative flex h-full flex-col items-center justify-center p-6 text-center">
        {logo ? (
          <>
            <img
              src={logo}
              alt=""
              className="h-auto max-h-36 w-auto max-w-[80%] transition-[max-width,max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mosaico:max-h-20 group-hover/mosaico:max-w-[55%] group-focus-within/mosaico:max-h-20 group-focus-within/mosaico:max-w-[55%] group-data-[activo=true]/mosaico:max-h-20 group-data-[activo=true]/mosaico:max-w-[55%]"
            />
            <h3 className="sr-only">{blok.name}</h3>
          </>
        ) : (
          <h3 className="titulo-2">{blok.name}</h3>
        )}
        {blok.city && <p className="etiqueta mt-3 opacity-90">{blok.city}</p>}
        <div className="grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mosaico:grid-rows-[1fr] group-focus-within/mosaico:grid-rows-[1fr] group-data-[activo=true]/mosaico:grid-rows-[1fr]">
          <div className="translate-y-2 overflow-hidden opacity-0 transition-[opacity,translate] duration-500 ease-out group-hover/mosaico:translate-y-0 group-hover/mosaico:opacity-100 group-hover/mosaico:delay-100 group-focus-within/mosaico:translate-y-0 group-focus-within/mosaico:opacity-100 group-data-[activo=true]/mosaico:translate-y-0 group-data-[activo=true]/mosaico:opacity-100 group-data-[activo=true]/mosaico:delay-100">
            {blok.text && <p className="mx-auto max-w-[28ch] pt-3 text-[0.9375rem] leading-snug">{blok.text}</p>}
            <Acciones blok={blok} className="justify-center pb-1 pt-4" />
          </div>
        </div>
      </div>
    </Tocable>
  );
}
