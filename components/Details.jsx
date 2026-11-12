import Link from "next/link";
import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { enlace } from "@/lib/utilidades";

// Datos prácticos: horarios, dirección, capacidad...
export default function Details({ blok }) {
  const href = enlace(blok.link);
  const externo = href?.startsWith("http");
  return (
    <section {...storyblokEditable(blok)} className="seccion">
      <div className="contenedor"><div className="caja grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="titulo-2">{blok.title}</h2>
          {href && blok.link_label && (
            <Link
              href={href}
              {...(externo && { target: "_blank", rel: "noopener noreferrer" })}
              className="boton mt-6"
            >
              {blok.link_label}
            </Link>
          )}
        </div>
        <dl className="border-b border-linea md:col-span-7 md:col-start-6">
          {blok.rows?.map((fila) => (
            <StoryblokServerComponent blok={fila} key={fila._uid} />
          ))}
        </dl>
      </div>
      </div>
    </section>
  );
}
