// Encabezado de sección, igual en todo el sitio: título en mayúsculas a la
// izquierda (6 columnas), descripción a la derecha (desde la columna 7) y
// una línea fina debajo. "accion" va pegado a la derecha (flechas, enlace).
export default function Encabezado({ titulo, intro, accion, nivel = 2, id, className = "" }) {
  if (!titulo && !intro && !accion) return null;
  const Titulo = `h${nivel}`;
  return (
    <div className={`cabecera aparece grid gap-4 md:grid-cols-12 md:items-end md:gap-x-6 ${className}`}>
      {titulo && (
        <Titulo id={id} className="titulo-2 md:col-span-6">
          {titulo}
        </Titulo>
      )}
      {(intro || accion) && (
        <div className="flex flex-wrap items-end justify-between gap-4 md:col-span-6 md:col-start-7 md:flex-nowrap">
          {intro && <p className="texto min-w-0 max-w-[46ch] basis-full md:basis-auto md:flex-1">{intro}</p>}
          {accion && <div className="ml-auto shrink-0">{accion}</div>}
        </div>
      )}
    </div>
  );
}
