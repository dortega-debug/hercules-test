import Link from "next/link";
import { enlace } from "@/lib/utilidades";

// Pie de página: datos de contacto, redes y avisos legales, tomados de
// "Configuración del sitio" en Storyblok. No repite el menú de arriba.
// Cualquier dato vacío en Storyblok simplemente no se muestra.
export default function Footer({ lang, config, t }) {
  const soloNumeros = (n) => n.replace(/[^\d+]/g, "");
  const redes = [
    { nombre: "Instagram", url: config.instagram },
    { nombre: "Facebook", url: config.facebook },
    { nombre: "TikTok", url: config.tiktok },
  ].filter((r) => r.url);
  const mapa = enlace(config.mapa, lang);
  const aviso = enlace(config.aviso, lang);
  const terminos = enlace(config.terminos, lang);

  return (
    <footer className="border-t border-linea bg-arena text-carbon">
      <div className="contenedor grid gap-10 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-4">
        <div>
          <Link href={`/${lang}`} aria-label={t.inicio}>
            <span className="logo w-16" />
          </Link>
          <p className="mt-4 max-w-[24ch] text-tenue">Compañía Cervecera Hércules</p>
        </div>

        {(config.direccion || config.horario) && (
          <div>
            <h2 className="etiqueta">{t.visitanos}</h2>
            {config.direccion && <address className="mt-3 whitespace-pre-line not-italic">{config.direccion}</address>}
            {config.horario && <p className="mt-3 whitespace-pre-line text-tenue">{config.horario}</p>}
            {mapa && (
              <a href={mapa} target="_blank" rel="noopener noreferrer" className="enlace mt-3 inline-block">
                {t.comoLlegar}
              </a>
            )}
          </div>
        )}

        {(config.telefono || config.whatsapp || config.correo) && (
          <div>
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
          </div>
        )}

        {redes.length > 0 && (
          <div>
            <h2 className="etiqueta">{t.siguenos}</h2>
            <ul className="mt-3 space-y-1.5">
              {redes.map((r) => (
                <li key={r.nombre}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="enlace">{r.nombre}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-linea">
        <div className="contenedor flex flex-col gap-3 py-5 text-sm text-tenue md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Compañía Cervecera Hércules</p>
          {(aviso || terminos) && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {aviso && <li><Link href={aviso} className="hover:text-carbon hover:underline">{t.aviso}</Link></li>}
              {terminos && <li><Link href={terminos} className="hover:text-carbon hover:underline">{t.terminos}</Link></li>}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
