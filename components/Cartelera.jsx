import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import Acciones from "./Acciones";

// Cartelera de eventos: una línea por evento, con fecha, nombre y lugar.
export default function Cartelera({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor"><div className="caja">
        {(blok.title || blok.intro) && (
          <div className="cabecera">
            {blok.title && <h2 className="titulo-2">{blok.title}</h2>}
            {blok.intro && <p className="max-w-[52ch] text-tenue">{blok.intro}</p>}
          </div>
        )}
        <ul className="bajo-cabecera">
          {blok.items?.map((item) => (
            <StoryblokServerComponent blok={item} key={item._uid} />
          ))}
        </ul>
        <Acciones blok={blok} className="mt-8" />
      </div>
      </div>
    </section>
  );
}
