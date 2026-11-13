import { notFound } from "next/navigation";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Instagram from "@/components/Instagram";
import { cargarConfig } from "@/lib/contenido";
import { enlace } from "@/lib/utilidades";
import { esIdioma, idiomas, textos } from "@/lib/i18n";

export function generateStaticParams() {
  return idiomas.map((lang) => ({ lang }));
}

export const metadata = {
  title: "Compañía Cervecera Hércules",
  description: "Cervecería, jardín de cerveza y hotel en una fábrica textil de 1846 en Querétaro.",
};

export default async function Layout({ children, params }) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();

  const config = await cargarConfig(lang);
  const menu = config.menu.map((m) => ({ nombre: m.nombre, ruta: enlace(m.link, lang) }));
  const secundario = config.secundario.map((m) => ({ nombre: m.nombre, ruta: enlace(m.link, lang) }));

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;200;400;700&family=Roboto+Condensed:wght@700&display=swap"
        />
      </head>
      <body>
        {/* Todo el sitio vive dentro del marco: dos líneas verticales,
            separadas un poco de la orilla de la pantalla, que corren sin
            cortarse desde el menú hasta el pie de página. */}
        <div className="marco">
          <Nav lang={lang} menu={menu} t={textos[lang]} />
          <main>
            {children}
            <Instagram lang={lang} perfil={config.instagram} t={textos[lang]} />
          </main>
          <Footer lang={lang} config={config} t={textos[lang]} />
        </div>
      </body>
    </html>
  );
}
