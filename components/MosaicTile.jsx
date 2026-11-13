import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { enlace, foto, srcSet, srcSetMovil, estiloFoto } from "@/lib/utilidades";

// Una tarjeta de lugar, al estilo Freitag: foto, logo al centro, la ciudad
// debajo y una línea de acción abajo. Sin animaciones: toda la tarjeta es
// un enlace y lo único que cambia al pasar el mouse es el velo de la foto.
export default function MosaicTile({ blok }) {
  const lang = blok._idioma;
  const href = enlace(blok.button_link, lang) || enlace(blok.link, lang);
  const accion = blok.button_label || blok.link_label;
  const logo = blok.logo?.filename;

  const contenido = (
    <>
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
        className="absolute inset-0 bg-carbon/35 transition-colors duration-300 group-hover/mosaico:bg-carbon/55"
      />
      <div className="sobre-foto relative flex h-full flex-col items-center justify-center p-6 text-center">
        {logo ? (
          <>
            <img src={logo} alt="" className="h-auto max-h-28 w-auto max-w-[72%]" />
            <h3 className="sr-only">{blok.name}</h3>
          </>
        ) : (
          <h3 className="titulo-2">{blok.name}</h3>
        )}
        {blok.city && <p className="etiqueta mt-3 opacity-90">{blok.city}</p>}
        {accion && (
          <p className="etiqueta absolute inset-x-6 bottom-6 underline-offset-4 group-hover/mosaico:underline">
            {accion} →
          </p>
        )}
      </div>
    </>
  );

  return (
    // El envoltorio ocupa toda la altura de la banda: su línea izquierda toca
    // la del encabezado arriba y la de la siguiente sección abajo.
    <div className="celda-tarjeta">
      <article
        {...storyblokEditable(blok)}
        className="pieza group/mosaico relative aspect-[4/5] bg-carbon text-crema"
      >
      {href ? (
        <Link href={href} className="absolute inset-0">
          {contenido}
        </Link>
      ) : (
        contenido
      )}
      </article>
    </div>
  );
}
