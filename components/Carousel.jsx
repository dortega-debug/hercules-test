import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Carril from "./Carril";

const textos = {
  es: { anterior: "Anterior", siguiente: "Siguiente", fotos: "Fotos" },
  en: { anterior: "Previous", siguiente: "Next", fotos: "Photos" },
};

// Carrusel: un carrete de fotos, o tarjetas con texto y botones (venues)
export default function Carousel({ blok }) {
  const t = textos[blok._idioma] || textos.es;
  const cabecera = (blok.title || blok.intro) && (
    <>
      {blok.title && <h2 className="titulo-2">{blok.title}</h2>}
      {blok.intro && <p className="max-w-[52ch] text-tenue">{blok.intro}</p>}
    </>
  );

  return (
    <section {...storyblokEditable(blok)} className="seccion pb-0!">
      <Carril cabecera={cabecera} etiqueta={blok.title || t.fotos} anterior={t.anterior} siguiente={t.siguiente}>
        {blok.items?.map((item) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </Carril>
    </section>
  );
}
