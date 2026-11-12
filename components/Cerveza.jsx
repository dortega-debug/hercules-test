import Link from "next/link";
import { storyblokEditable, StoryblokServerRichText } from "@storyblok/react/rsc";
import { colorSrm } from "@/lib/cervezas";
import { foto } from "@/lib/utilidades";

const textos = {
  es: { todas: "Todas las cervezas", alc: "ABV", ibu: "Amargor (IBU)", srm: "Color (SRM)", tipo: "Tipo",
        linea: "De línea", temporada: "De temporada", marida: "Marida con", estilo: "Estilo",
        descripcion: "Descripción", notas: "Notas de cata" },
  en: { todas: "All beers", alc: "ABV", ibu: "Bitterness (IBU)", srm: "Color (SRM)", tipo: "Type",
        linea: "Year-round", temporada: "Seasonal", marida: "Pairs with", estilo: "Style",
        descripcion: "Description", notas: "Tasting notes" },
};

// Página de cada cerveza (tipo de contenido "cerveza" en Storyblok)
export default function Cerveza({ blok }) {
  const lang = blok._idioma || "es";
  const t = textos[lang] || textos.es;
  const color = colorSrm(blok.srm);

  const datos = [
    blok.abv && [t.alc, `${blok.abv}%`],
    blok.ibu && [t.ibu, blok.ibu],
    blok.srm && [
      t.srm,
      <span key="srm" className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="size-4 rounded-full ring-1 ring-carbon/20" style={{ background: color }} />
        {blok.srm}
      </span>,
    ],
    blok.line && [t.tipo, t[blok.line] || blok.line],
  ].filter(Boolean);

  return (
    <article {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
        <Link href={`/${lang}/cerveceria`} className="boton">
          ← {t.todas}
        </Link>

        {/* Ficha técnica: un solo bloque con líneas finas */}
        <div className="pieza mt-6 grid md:grid-cols-12">
          <div className="flex items-end justify-center border-b border-linea bg-arena px-6 py-10 md:col-span-5 md:border-b-0 md:border-r">
            {blok.image?.filename && (
              <img
                src={foto(blok.image, 1200)}
                alt={blok.image.alt || blok.name}
                fetchPriority="high"
                className="h-[48vh] max-h-[560px] min-h-[300px] w-auto max-w-full object-contain"
              />
            )}
          </div>

          <div className="p-6 md:col-span-7 md:p-10">
            <h1 className="titulo-1 border-b border-carbon pb-4">{blok.name}</h1>

            <dl className="mt-2">
              {blok.style && (
                <div className="border-b border-linea py-4">
                  <dt className="etiqueta">{t.estilo}</dt>
                  <dd className="mt-1 text-xl font-light">{blok.style}</dd>
                </div>
              )}
              {datos.map(([etiqueta, valor]) => (
                <div key={etiqueta} className="border-b border-linea py-4">
                  <dt className="etiqueta">{etiqueta}</dt>
                  <dd className="mt-1 text-xl font-light">{valor}</dd>
                </div>
              ))}
            </dl>

            {blok.description && (
              <div className="border-b border-linea py-4">
                <h2 className="etiqueta">{t.descripcion}</h2>
                <p className="mt-1 max-w-[52ch]">{blok.description}</p>
              </div>
            )}

            {blok.notes?.content?.length > 0 && (
              <div className="border-b border-linea py-4 [&_p+p]:mt-3">
                <h2 className="etiqueta">{t.notas}</h2>
                <div className="mt-1 max-w-[60ch]">
                  <StoryblokServerRichText document={blok.notes} />
                </div>
              </div>
            )}

            {blok.pairing && (
              <div className="py-4">
                <h2 className="etiqueta">{t.marida}</h2>
                <p className="mt-1">{blok.pairing}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
