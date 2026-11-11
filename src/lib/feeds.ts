// Datos traídos al compilar (no en el navegador): rápido para quien visita y sin límites de API.
// Si una fuente falla, el sitio compila igual y esa parte simplemente no aparece.
import { XMLParser } from 'fast-xml-parser';
import { social } from '../config';

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

async function get(url: string, headers: Record<string, string> = {}) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'darkanita.dev', ...headers } });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res;
  } catch (err) {
    console.warn(`[feeds] ${(err as Error).message}`);
    return null;
  }
}

let starsCache: Promise<Map<string, number>> | undefined;

/** Estrellas de cada repo de la cuenta, por nombre. Vacío si GitHub no responde. */
export function getStars(): Promise<Map<string, number>> {
  starsCache ??= (async () => {
    const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
    const res = await get(`https://api.github.com/users/${social.github}/repos?per_page=100&type=owner`, {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
    if (!res) return new Map();
    const all: any[] = await res.json();
    return new Map(all.map((r) => [r.name as string, r.stargazers_count as number]));
  })();
  return starsCache;
}

export type Post = { title: string; url: string; date: string };

export async function getMediumPosts(limit = 20): Promise<Post[]> {
  if (!social.medium) return [];
  const res = await get(`https://medium.com/feed/@${social.medium}`);
  if (!res) return [];
  const xml = parser.parse(await res.text());
  const items = [xml?.rss?.channel?.item ?? []].flat();
  return items.slice(0, limit).map((it: any) => ({
    title: String(it.title),
    url: String(it.link).split('?')[0],
    date: new Date(it.pubDate).toISOString(),
  }));
}

export type Video = { title: string; url: string; date: string };

export async function getVideos(limit = 3): Promise<Video[]> {
  if (!social.youtubeChannelId) return [];
  const res = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${social.youtubeChannelId}`);
  if (!res) return [];
  const xml = parser.parse(await res.text());
  const entries = [xml?.feed?.entry ?? []].flat();
  return entries.slice(0, limit).map((e: any) => ({
    title: String(e.title),
    url: e.link?.href ?? '',
    date: e.published,
  }));
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
