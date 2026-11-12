import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import { cargarCervezas, colorSrm } from "@/lib/cervezas";
import { foto } from "@/lib/utilidades";

const textos = { es: { alc: "alc. vol." }, en: { alc: "ABV" } };

// Lista de cervezas: toma solas las cervezas de la carpeta "Cervezas" de
// Storyblok y las muestra como cuadrícula de producto con líneas finas.
export default async function BeerList({ blok }) {
  const lang = blok._idioma || "es";
  const t = textos[lang] || textos.es;
  const cervezas = await cargarCervezas(lang, blok.filter, blok.limit);
  if (!cervezas.length) return null;

  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
        {(blok.title || blok.intro) && (
          <div className="cabecera">
            {blok.title && <h2 className="titulo-2">{blok.title}</h2>}
            {blok.intro && <p className="max-w-[52ch] text-tenue">{blok.intro}</p>}
          </div>
        )}

        {/* Cuadrícula de producto con líneas finas, como una tienda */}
        <ul className="bajo-cabecera grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {cervezas.map(({ slug, content: c }) => {
            const color = colorSrm(c.srm);
            return (
              <li key={slug} className="pieza group/cerveza bg-crema">
                <Link href={`/${lang}/cervezas/${slug}`} className="flex h-full flex-col">
                  <div className="flex h-56 items-end justify-center bg-arena px-4 pb-6 pt-8 sm:h-64 lg:h-72">
                    {c.image?.filename && (
                      <img
                        src={foto(c.image, 700)}
                        alt={c.image.alt || c.name}
                        loading="lazy"
                        className="h-full w-auto max-w-full object-contain transition-transform duration-300 ease-out raton:group-hover/cerveza:-translate-y-2"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col border-t border-linea p-4 md:p-5">
                    <h3 className="titulo-3">{c.name}</h3>
                    {(c.style || c.abv) && (
                      <p className="etiqueta mt-2 flex items-center gap-2 text-tenue">
                        {color && (
                          <span aria-hidden="true" className="size-2.5 rounded-full ring-1 ring-carbon/20" style={{ background: color }} />
                        )}
                        {c.style}
                        {c.style && c.abv ? " · " : ""}
                        {c.abv && `${c.abv}% ${t.alc}`}
                      </p>
                    )}
                    {c.description && <p className="mt-2 line-clamp-2 text-sm text-tenue">{c.description}</p>}
                    {blok.link_label && (
                      <span className="etiqueta mt-auto pt-4 underline-offset-4 group-hover/cerveza:underline">
                        {blok.link_label} →
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
