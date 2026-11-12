import { storyblokEditable, StoryblokServerRichText } from "@storyblok/react/rsc";
import Acciones from "./Acciones";

// "normal": título a la izquierda y texto a la derecha
// "destacado": una frase grande, sin título
// "centrado": encabezado igual que el de Venues (título, línea) y el texto
//             debajo, con botones al final
export default function TextBlock({ blok }) {
  // Todos los estilos van entre líneas finas (arriba y abajo) para que el
  // texto quede dentro de un bloque y no "flotando" en la página.
  if (blok.style === "centrado") {
    return (
      <section {...storyblokEditable(blok)} className="seccion">
        <div className="contenedor">
        <div className="caja">
          {/* Mismo encabezado que Venues: título a la izquierda y línea debajo */}
          {blok.title && (
            <div className="cabecera">
              <h2 className="titulo-2">{blok.title}</h2>
            </div>
          )}
          <div className="bajo-cabecera">
            {blok.body && (
              <div className="max-w-[58ch] text-lg leading-snug [&_h2]:titulo-3 [&_h2]:mt-8 [&_h3]:titulo-3 [&_h3]:mt-8 [&_h2+p]:mt-2 [&_h3+p]:mt-2 [&_p+p]:mt-4">
                <StoryblokServerRichText document={blok.body} />
              </div>
            )}
            <Acciones blok={blok} className="mt-6" />
          </div>
        </div>
        </div>
      </section>
    );
  }

  if (blok.style === "destacado") {
    return (
      <section {...storyblokEditable(blok)} className="seccion">
        <div className="contenedor">
          <div className="caja texto-lead [&_p+p]:mt-4">
            {blok.body && <StoryblokServerRichText document={blok.body} />}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor">
        <div className="caja grid gap-4 md:grid-cols-12 md:gap-8">
          {blok.title && <h2 className="titulo-2 md:col-span-4">{blok.title}</h2>}
          {blok.body && (
            <div className="max-w-[62ch] md:col-span-7 md:col-start-6 [&_p+p]:mt-4">
              <StoryblokServerRichText document={blok.body} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
