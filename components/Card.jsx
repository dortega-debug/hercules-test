import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { enlace, foto, srcSet, encuadre, srcSetMovil, estiloFoto } from "@/lib/utilidades";

export default function Card({ blok }) {
  const href = enlace(blok.link);
  return (
    <article {...storyblokEditable(blok)} className="group flex flex-col bg-crema p-5">
      {blok.image?.filename && (
        <div className="overflow-hidden">
        <picture className="contents">
          {blok.image_mobile?.filename && (
            <source media="(max-width: 767px)" srcSet={srcSetMovil(blok.image_mobile)} sizes="100vw" />
          )}
          <img
            src={foto(blok.image, 900)}
            srcSet={srcSet(blok.image, [480, 900, 1300])}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            alt={blok.image.alt || ""}
              style={estiloFoto(blok.image, blok.image_mobile)}
            loading="lazy"
            className="[object-position:var(--pos-movil)] md:[object-position:var(--pos)] aspect-[4/3] w-full object-cover"
          />
        </picture>
        </div>
      )}
      <h3 className="titulo-3 mt-4">{blok.title}</h3>
      {blok.detail && <p className="etiqueta mt-2 text-tenue">{blok.detail}</p>}
      {blok.text && <p className="mt-2 max-w-[40ch] text-tenue">{blok.text}</p>}
      {href && blok.link_label && (
        <Link href={href} className="boton mt-4 self-start">
          {blok.link_label}
        </Link>
      )}
    </article>
  );
}
