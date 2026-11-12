import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

// Secciones principales (Cervecería, Jardín, Hotel, Almacén) en cuadrícula
// de 2: título primero, después la foto 4:3 y los botones.
export default function SectionsGrid({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
        {blok.title && (
          <h2 className="titulo-2 cabecera">{blok.title}</h2>
        )}
        <div className="bajo-cabecera grid gap-4 md:grid-cols-2">
          {blok.items?.map((item) => (
            <StoryblokServerComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
