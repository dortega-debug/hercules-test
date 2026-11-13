import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Carril from "./Carril";

const textos = {
  es: { anterior: "Anterior", siguiente: "Siguiente", lugares: "Lugares" },
  en: { anterior: "Previous", siguiente: "Next", lugares: "Places" },
};

// Lugares, en dos formas:
// - cuadrícula: todas a la vista. En celular se apilan, separadas por una
//   línea; de tableta en adelante se dividen con líneas verticales.
// - carrusel: se desliza y avanza solo, para listas más largas.
export default function VenueMosaic({ blok }) {
  const t = textos[blok._idioma] || textos.es;
  // Por defecto, cuadrícula: todo a la vista. El carrusel se elige a mano
  // en Storyblok, en el campo "Cómo se muestra".
  const cuadricula = blok.display !== "carrusel";

  const cabecera = (
    <>
      {blok.title && <h2 className="titulo-2">{blok.title}</h2>}
      {blok.intro && <p className="texto-apoyo max-w-[46ch] text-tenue">{blok.intro}</p>}
    </>
  );

  const tarjetas = blok.items?.map((item) => (
    <StoryblokServerComponent blok={item} key={item._uid} />
  ));

  if (cuadricula) {
    return (
      <section {...storyblokEditable(blok)} className="seccion pb-0!">
        <div className="contenedor">
          {(blok.title || blok.intro) && <div className="cabecera">{cabecera}</div>}
          <div className="a-rieles grid [&>*+*]:border-t sm:grid-cols-2 sm:[&>*+*]:border-t-0 sm:[&>*:nth-child(n+3)]:border-t sm:[&>*:nth-child(even)]:border-l lg:grid-cols-4 lg:[&>*:nth-child(n+2)]:border-l lg:[&>*:nth-child(n+3)]:border-t-0">
            {tarjetas}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...storyblokEditable(blok)} className="seccion pb-0!">
      <Carril
        cabecera={cabecera}
        etiqueta={blok.title || t.lugares}
        anterior={t.anterior}
        siguiente={t.siguiente}
        auto
        anchos="[&>*]:w-full [&>*]:shrink-0 [&>*]:snap-start sm:[&>*]:w-1/2 lg:[&>*]:w-1/4 [&>*+*]:border-l"
      >
        {tarjetas}
      </Carril>
    </section>
  );
}
