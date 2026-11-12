import { encuadre, foto, srcSet } from "@/lib/utilidades";

// Foto estándar del sitio: proporción fija, recorte con el punto de enfoque
// de Storyblok, marcas en las esquinas y animación al entrar a la pantalla.
export default function Foto({
  imagen,
  ancho = 1600,
  anchos,
  sizes = "100vw",
  proporcion = "aspect-[4/3]",
  alt,
  prioridad = false,
  esquinas = true,
  className = "",
  claseImg = "",
}) {
  if (!imagen?.filename) return null;
  return (
    <div className={`${esquinas ? "esquinas" : ""} aparece-foto overflow-hidden bg-arena ${proporcion} ${className}`}>
      <img
        src={foto(imagen, ancho)}
        srcSet={srcSet(imagen, anchos)}
        sizes={sizes}
        alt={alt ?? imagen.alt ?? ""}
        style={{ objectPosition: encuadre(imagen) }}
        loading={prioridad ? "eager" : "lazy"}
        fetchPriority={prioridad ? "high" : undefined}
        className={`h-full w-full object-cover ${claseImg}`}
      />
    </div>
  );
}
