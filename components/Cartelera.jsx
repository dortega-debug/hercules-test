import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Acciones from "./Acciones";

// Cartelera de eventos: una línea por evento, con fecha, nombre y lugar.
export default function Cartelera({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
        {(blok.title || blok.intro) && (
          <div className="cabecera">
            {blok.title && <h2 className="titulo-2">{blok.title}</h2>}
            {blok.intro && <p className="texto-apoyo max-w-[52ch] text-tenue">{blok.intro}</p>}
          </div>
        )}
        {/* Lista vertical: cada evento separado por la misma línea, que llega
            hasta los rieles. Si hay muchos, la lista se desplaza por dentro. */}
        <ul className="a-rieles max-h-[36rem] overflow-y-auto">
          {blok.items?.map((item) => (
            <StoryblokServerComponent blok={item} key={item._uid} />
          ))}
        </ul>
        <Acciones blok={blok} className="mt-8" />
      </div>
    </section>
  );
}
