import { storyblokEditable } from "@storyblok/react/rsc";
import NewsletterForm from "./NewsletterForm";
import { fondos } from "./Cta";

export default function Newsletter({ blok }) {
  const estilo = fondos[blok.background] || fondos["arena-textura"];
  const oscuro = estilo.seccion.includes("text-crema");
  return (
    <section {...storyblokEditable(blok)} className={`${estilo.seccion} border-t border-linea py-8 md:py-10`}>
      <div className="contenedor grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
        <div className="md:col-span-6">
          <h2 className="titulo-3">{blok.title}</h2>
          {blok.text && <p className="mt-2 max-w-[46ch] text-sm opacity-80">{blok.text}</p>}
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <NewsletterForm
            boton={blok.button_label || "Suscribirme"}
            placeholder={blok.placeholder || "tu@correo.com"}
            gracias={blok.success_message || "Listo, te escribiremos cuando haya algo nuevo."}
            oscuro={oscuro}
          />
        </div>
      </div>
    </section>
  );
}
