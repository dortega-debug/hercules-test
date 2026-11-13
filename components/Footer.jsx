import Link from "next/link";
import { enlace } from "@/lib/utilidades";

// Pie de página en negativo: fondo oscuro y texto claro. Toma todo de
// "Configuración del sitio" en Storyblok; lo que esté vacío no se muestra.
export default function Footer({ lang, config, t }) {
  const soloNumeros = (n) => n.replace(/[^\d+]/g, "");
  const mapa = enlace(config.mapa, lang);

  // Si en Storyblok todavía no se captura el dato, se usan estos valores
  const direccion = config.direccion || "Av. Hércules Ote. 1, Hércules\n76069 Santiago de Querétaro, Qro.";
  const ruta = (campo, respaldo) => enlace(campo, lang) || `/${lang}${respaldo}`;

  const redes = [
    { nombre: "Instagram", url: config.instagram },
    { nombre: "Facebook", url: config.facebook },
    { nombre: "TikTok", url: config.tiktok },
  ].filter((r) => r.url);

  // Enlaces de servicio: ayuda, trámites y avisos legales
  const ayuda = [
    { texto: t.contacto, href: ruta(config.contacto, "/contacto") },
    { texto: t.faq, href: ruta(config.faq, "/preguntas-frecuentes") },
    { texto: t.facturacion, href: ruta(config.facturacion, "/facturacion") },
    { texto: t.terminos, href: ruta(config.terminos, "/terminos-y-condiciones") },
    { texto: t.aviso, href: ruta(config.aviso, "/politica-de-privacidad") },
  ];

  return (
    <footer className="border-t border-carbon bg-carbon text-crema">
      <div className="contenedor grid gap-10 py-12 sm:grid-cols-2 md:py-14 lg:grid-cols-4">
        <div>
          <Link href={`/${lang}`} aria-label={t.inicio}>
            <span className="logo w-16" />
          </Link>
          <p className="mt-4 max-w-[24ch] text-crema/70">Compañía Cervecera Hércules</p>
        </div>

        {(
          <div>
            <h2 className="etiqueta">{t.visitanos}</h2>
            <address className="mt-3 whitespace-pre-line not-italic">{direccion}</address>
            {config.horario && <p className="mt-3 whitespace-pre-line text-crema/70">{config.horario}</p>}
            {mapa && (
              <a href={mapa} target="_blank" rel="noopener noreferrer" className="enlace mt-3 inline-block">
                {t.comoLlegar}
              </a>
            )}
          </div>
        )}

        {(
          <div>
            <h2 className="etiqueta">{t.ayuda}</h2>
            <ul className="mt-3 space-y-1.5">
              {ayuda.map((e) => (
                <li key={e.texto}>
                  <Link href={e.href} className="enlace">{e.texto}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          {(config.telefono || config.whatsapp || config.correo) && (
            <>
              <h2 className="etiqueta">{t.contacto}</h2>
              <ul className="mt-3 space-y-1.5">
                {config.telefono && (
                  <li><a href={`tel:${soloNumeros(config.telefono)}`} className="enlace">{config.telefono}</a></li>
                )}
                {config.whatsapp && (
                  <li>
                    <a href={`https://wa.me/${soloNumeros(config.whatsapp).replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="enlace">
                      WhatsApp
                    </a>
                  </li>
                )}
                {config.correo && (
                  <li><a href={`mailto:${config.correo}`} className="enlace">{config.correo}</a></li>
                )}
              </ul>
            </>
          )}
          {redes.length > 0 && (
            <>
              <h2 className="etiqueta mt-8">{t.siguenos}</h2>
              <ul className="mt-3 space-y-1.5">
                {redes.map((r) => (
                  <li key={r.nombre}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="enlace">{r.nombre}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-crema/20">
        <div className="contenedor py-5 text-sm text-crema/60">
          © {new Date().getFullYear()} Compañía Cervecera Hércules
        </div>
      </div>
    </footer>
  );
}
