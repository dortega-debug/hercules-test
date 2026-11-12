import Link from "next/link";

export default function EnConstruccion({ titulo, texto, lang, t }) {
  return (
    <section className="seccion min-h-[60vh]">
      <div className="contenedor">
        <h1 className="titulo-1 max-w-[18ch] border-b border-linea pb-6">
          {titulo}
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg text-tenue">{texto}</p>
        <Link href={`/${lang}`} className="boton mt-8">
          {t.volver}
        </Link>
      </div>
    </section>
  );
}
