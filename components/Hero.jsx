import { storyblokEditable } from "@storyblok/react/rsc";
import { foto, srcSet, encuadre, srcSetMovil, estiloFoto } from "@/lib/utilidades";
import HerculesScroll from "./HerculesScroll";
import HeroFotos from "./HeroFotos";

const textos = {
  es: { foto: "Foto", pausar: "Pausar fotos", reanudar: "Reanudar fotos" },
  en: { foto: "Photo", pausar: "Pause photos", reanudar: "Play photos" },
};

// Dos tamaños:
//  - "completa" (Home): foto a pantalla completa (o carrusel de fotos) con el
//    logo y el título encima
//  - "media" (páginas interiores): título y después la foto 4:3
export default function Hero({ blok }) {
  if (blok.size !== "completa") return <HeroMedia blok={blok} />;

  // Carrusel (images) o una sola foto (image). Las versiones para celular
  // (images_mobile / image_mobile) son opcionales y van en el mismo orden.
  const conCarrusel = blok.images?.filter((f) => f?.filename).length > 0;
  const lista = conCarrusel ? blok.images.filter((f) => f?.filename) : [blok.image].filter((f) => f?.filename);
  const moviles = conCarrusel ? (blok.images_mobile || []).filter((f) => f?.filename) : [blok.image_mobile];
  const fotos = lista.map((f, k) => {
    const movil = moviles[k]?.filename ? moviles[k] : null;
    return {
      src: foto(f, 2200),
      srcSet: srcSet(f),
      srcSetMovil: movil ? srcSetMovil(movil) : null,
      alt: f.alt || "",
      estilo: estiloFoto(f, movil),
    };
  });

  return (
    // Ocupa la pantalla menos la altura del menú fijo (4rem)
    <section {...storyblokEditable(blok)} className="relative h-[calc(100svh-4rem)] min-h-[520px] touch-pan-y overflow-hidden bg-carbon text-crema">
      <HeroFotos fotos={fotos} t={textos[blok._idioma] || textos.es} />
      {/* Sombra suave solo abajo, detrás del título, para que se lea */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-carbon/65 to-transparent" />
      <div className="contenedor relative flex h-full flex-col justify-end pb-16 md:pb-20">
        <h1 className="titulo-1 max-w-[16ch]">{blok.title}</h1>
        {blok.subtitle && <p className="mt-3 max-w-[46ch] text-lg font-light">{blok.subtitle}</p>}
      </div>
    </section>
  );
}

function HeroMedia({ blok }) {
  const conHercules = blok.hercules;
  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
        <div className="relative">
          {conHercules && <HerculesScroll />}
          <div className={conHercules ? "pr-24 sm:pr-36 md:pr-44 lg:pr-56" : ""}>
            <h1 className="titulo-1 max-w-[16ch]">{blok.title}</h1>
            {blok.subtitle && <p className="texto-lead mt-4 max-w-[36ch]">{blok.subtitle}</p>}
          </div>
          {blok.image?.filename && (
            <div className="bajo-cabecera a-rieles aspect-[4/3] border-y border-linea md:aspect-[16/9]">
              <picture className="contents">
                {blok.image_mobile?.filename && (
                  <source media="(max-width: 767px)" srcSet={srcSetMovil(blok.image_mobile)} sizes="100vw" />
                )}
                <img
                  src={foto(blok.image, 2200)}
                  srcSet={srcSet(blok.image)}
                  sizes="(min-width: 1440px) 1312px, 100vw"
                  alt={blok.image.alt || ""}
                  style={estiloFoto(blok.image, blok.image_mobile)}
                  fetchPriority="high"
                  className="[object-position:var(--pos-movil)] md:[object-position:var(--pos)] h-full w-full object-cover"
                />
              </picture>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
