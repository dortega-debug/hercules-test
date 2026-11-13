import Carril from "./Carril";

// Carrusel en vivo de Instagram, arriba del pie de página en todo el sitio.
// Lee el feed JSON de Behold (behold.so): la URL va en la variable de
// entorno INSTAGRAM_FEED_URL. Behold se encarga de los permisos de Instagram
// y de renovar el acceso; aquí solo leemos las publicaciones.
// Se vuelve a pedir como máximo una vez por hora. Sin URL o si falla, no se muestra.
async function cargarPublicaciones() {
  const url = process.env.INSTAGRAM_FEED_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function Instagram({ lang, perfil, t }) {
  const feed = await cargarPublicaciones();
  const posts = feed?.posts?.filter((p) => p.sizes?.medium?.mediaUrl || p.mediaUrl) || [];
  if (!posts.length) return null;

  const usuario = feed.username ? `@${feed.username}` : null;
  const urlPerfil = perfil || (feed.username ? `https://www.instagram.com/${feed.username}/` : null);

  const cabecera = (
    <>
      <h2 className="titulo-2">{t.instagram}</h2>
      {urlPerfil && (
        <a href={urlPerfil} target="_blank" rel="noopener noreferrer" className="enlace etiqueta">
          {usuario || t.verPerfil}
        </a>
      )}
    </>
  );
  const flechas = lang === "en" ? ["Previous", "Next"] : ["Anterior", "Siguiente"];

  return (
    <section className="seccion pb-0!" lang={lang}>
      <Carril anchos="[&>*+*]:border-l" cabecera={cabecera} etiqueta={t.instagram} anterior={flechas[0]} siguiente={flechas[1]}>
        {posts.map((p) => {
          const img = p.sizes?.medium?.mediaUrl || p.sizes?.small?.mediaUrl || p.thumbnailUrl || p.mediaUrl;
          const texto = (p.caption || "").split("\n")[0].slice(0, 120);
          return (
            <a
              key={p.id}
              href={p.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="celda-tarjeta group block w-full shrink-0 snap-start sm:w-1/2 lg:w-1/4"
            >
              <img
                src={img}
                alt={texto || "Publicación de Instagram"}
                loading="lazy"
                className="pieza aspect-square w-full object-cover transition-opacity duration-300 group-hover:opacity-85"
              />
            </a>
          );
        })}
      </Carril>
    </section>
  );
}
