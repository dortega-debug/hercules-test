import { storyblokEditable } from "@storyblok/react/rsc";
import { encuadre, foto, srcSet, srcSetMovil, estiloFoto } from "@/lib/utilidades";
import Acciones from "./Acciones";
import Revelar from "./Revelar";

// Foto 4:3 y, pegada a ella (sin encimarse), una tarjeta color arena.
//
// Con logo (los venues): la tarjeta muestra al inicio el logo grande y el
// nombre. Al activarse, el logo se encoge y aparecen el texto y los botones:
//   - en laptop, al pasar el mouse por la tarjeta (o llegar con teclado)
//   - en celular, al pasar con el dedo por la mitad de la pantalla
// Sin logo, la tarjeta muestra todo desde el inicio.
export default function Feature({ blok }) {
  const derecha = blok.image_side === "derecha";
  const logo = blok.logo?.filename;

  const cuerpo = (
    <>
      {blok.text && <p className={`max-w-[40ch] pt-3 text-tenue ${logo ? "mx-auto" : ""}`}>{blok.text}</p>}
      <Acciones blok={blok} className={`pb-1 pt-6 ${logo ? "justify-center" : ""}`} />
    </>
  );

  return (
    // Foto y texto dentro de un mismo marco de línea fina
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
      <div className="pieza grid md:grid-cols-12">
        <div
          className={`aspect-[4/3] overflow-hidden md:row-start-1 md:col-span-7 ${derecha ? "md:col-start-6" : "md:col-start-1"}`}
        >
          {blok.image?.filename && (
            <picture className="contents">
              {blok.image_mobile?.filename && (
                <source media="(max-width: 767px)" srcSet={srcSetMovil(blok.image_mobile)} sizes="100vw" />
              )}
              <img
                src={foto(blok.image)}
                srcSet={srcSet(blok.image)}
                sizes="(min-width: 768px) 55vw, 100vw"
                alt={blok.image.alt || ""}
                style={estiloFoto(blok.image, blok.image_mobile)}
                loading="lazy"
                className="[object-position:var(--pos-movil)] md:[object-position:var(--pos)] h-full w-full object-cover"
              />
            </picture>
          )}
        </div>

        <Revelar
          className={`group/tarjeta flex flex-col justify-center border-t border-linea bg-crema px-6 py-10 md:row-start-1 md:col-span-5 md:border-t-0 md:px-10 lg:px-12 ${
            derecha ? "md:col-start-1 md:border-r" : "md:col-start-8 md:border-l"
          } ${logo ? "items-center text-center" : ""}`}
        >
          {logo && (
            <img
              src={logo}
              alt={blok.logo.alt || ""}
              className="mb-6 h-auto max-h-24 w-auto max-w-[13rem] transition-[max-width,max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tarjeta:max-h-12 group-hover/tarjeta:max-w-[7rem] group-focus-within/tarjeta:max-h-12 group-focus-within/tarjeta:max-w-[7rem] md:max-h-32 md:max-w-[16rem] tactil:group-data-[revelado=true]/tarjeta:max-h-12 tactil:group-data-[revelado=true]/tarjeta:max-w-[7rem]"
            />
          )}
          <h2 className="titulo-2">{blok.title}</h2>

          {logo ? (
            // Se despliega con el truco de grid: de 0fr (cerrado) a 1fr (abierto)
            <div className="grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tarjeta:grid-rows-[1fr] group-focus-within/tarjeta:grid-rows-[1fr] tactil:group-data-[revelado=true]/tarjeta:grid-rows-[1fr]">
              <div className="overflow-hidden opacity-0 transition-opacity duration-500 group-hover/tarjeta:opacity-100 group-hover/tarjeta:delay-100 group-focus-within/tarjeta:opacity-100 tactil:group-data-[revelado=true]/tarjeta:opacity-100 tactil:group-data-[revelado=true]/tarjeta:delay-100">
                {cuerpo}
              </div>
            </div>
          ) : (
            cuerpo
          )}
        </Revelar>
      </div>
      </div>
    </section>
  );
}
