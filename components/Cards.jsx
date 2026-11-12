import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

// Grupo de tarjetas: cervezas, habitaciones, espacios, productos...
export default function Cards({ blok }) {
  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
        {(blok.title || blok.intro) && (
          <div className="cabecera">
            {blok.title && (
              <h2 className="titulo-2">
                {blok.title}
              </h2>
            )}
            {blok.intro && (
              <p className="max-w-[52ch] text-tenue">{blok.intro}</p>
            )}
          </div>
        )}
        {/* Cuadrícula con líneas finas entre tarjetas */}
        <div className="bajo-cabecera grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blok.items?.map((item) => (
            <StoryblokServerComponent blok={item} key={item._uid} />
          ))}
        </div>
      </div>
    </section>
  );
}
