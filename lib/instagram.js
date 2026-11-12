// Últimas publicaciones de Instagram (API de Instagram con inicio de sesión de Instagram).
// Necesita INSTAGRAM_TOKEN en .env.local / Vercel. Sin token, regresa [] y el sitio
// muestra solo la invitación a seguir la cuenta.
export async function cargarPublicaciones(cuantas = 6) {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) return [];

  const campos = "id,caption,media_type,media_url,thumbnail_url,permalink";
  const url = `https://graph.instagram.com/me/media?fields=${campos}&limit=${cuantas}&access_token=${token}`;

  try {
    // Se vuelve a pedir a Instagram como máximo una vez por hora
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error("Instagram:", res.status, await res.text());
      return [];
    }
    const { data = [] } = await res.json();
    return data
      .map((p) => ({
        id: p.id,
        imagen: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
        texto: p.caption || "",
        url: p.permalink,
      }))
      .filter((p) => p.imagen)
      .slice(0, cuantas);
  } catch (error) {
    console.error("Instagram:", error);
    return [];
  }
}
