import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Carril from "./Carril";

const textos = {
  es: { anterior: "Anterior", siguiente: "Siguiente", lugares: "Lugares" },
  en: { anterior: "Previous", siguiente: "Next", lugares: "Places" },
};

// Carrusel de lugares: cada foto lleva su logo encima y avanza sola.
export default function VenueMosaic({ blok }) {
  const t = textos[blok._idioma] || textos.es;
  const cabecera = (
    <>
      {blok.title && <h2 className="titulo-2">{blok.title}</h2>}
      {blok.intro && <p className="max-w-[46ch] text-tenue">{blok.intro}</p>}
    </>
  );

  return (
    <section {...storyblokEditable(blok)} className="seccion pb-0!">
      <Carril cabecera={cabecera} etiqueta={blok.title || t.lugares} anterior={t.anterior} siguiente={t.siguiente} auto>
        {blok.items?.map((item) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </Carril>
    </section>
  );
}
