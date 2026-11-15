import Link from "next/link";
import { enlace } from "@/lib/utilidades";

// Los botones de cualquier bloque: el principal (relleno) y el secundario
// (solo borde), en ese orden. Si solo se captura uno en Storyblok, se muestra
// ese; si no hay ninguno, no se dibuja nada.
//
// En celular van apilados a ancho completo (más fáciles de tocar) y de tableta
// en adelante lado a lado. El color lo decide el fondo: dentro de .sobre-foto
// o del pie de página toman la versión clara, sin tener que indicarlo aquí.
export default function Acciones({ blok, className = "", alineacion = "" }) {
  const lang = blok._idioma;
  const principal = enlace(blok.button_link, lang);
  const secundario = enlace(blok.link, lang);
  const externo = (url) => (url?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

  const botones = [
    principal && blok.button_label && { href: principal, texto: blok.button_label, clase: "boton" },
    secundario && blok.link_label && { href: secundario, texto: blok.link_label, clase: "boton-secundario" },
  ].filter(Boolean);

  if (!botones.length) return null;

  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center ${alineacion} ${className}`}>
      {botones.map((b) => (
        <Link key={b.texto} href={b.href} {...externo(b.href)} className={b.clase}>
          {b.texto}
        </Link>
      ))}
    </div>
  );
}
