// Datos traídos al compilar (no en el navegador): rápido para quien visita y sin límites de API.
// Si una fuente falla, el sitio compila igual y la sección muestra su estado vacío.
import { XMLParser } from 'fast-xml-parser';
import { social } from '../config';
import { featuredRepos } from '../data/profile';

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

export type Repo = {
  name: string;
  url: string;
  description: string;
  stars: number | null;
  forks: number | null;
  language: string;
  updated: string;
};

export async function getRepos(limit = 10): Promise<Repo[]> {
  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  const res = await get(`https://api.github.com/users/${social.github}/repos?per_page=100&type=owner`, {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });
  const fallback = featuredRepos.map((name) => ({
    name,
    url: `https://github.com/${social.github}/${name}`,
    description: '',
    stars: null,
    forks: null,
    language: '',
    updated: '',
  }));
  if (!res) return fallback.slice(0, limit);

  const all: any[] = await res.json();
  const repos: Repo[] = all
    .filter((r) => !r.fork && !r.archived)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      description: r.description ?? '',
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language ?? '',
      updated: r.pushed_at,
    }));
  // Los destacados entran siempre; los huecos restantes son para los más estrellados.
  const byStars = (a: Repo, b: Repo) => (b.stars ?? 0) - (a.stars ?? 0);
  const featured = repos.filter((r) => featuredRepos.includes(r.name));
  const rest = repos.filter((r) => !featuredRepos.includes(r.name)).sort(byStars);
  return [...featured, ...rest].slice(0, Math.max(limit, featured.length)).sort(byStars);
}

export type Post = { title: string; url: string; date: string; tags: string[] };

export async function getMediumPosts(limit = 6): Promise<Post[]> {
  if (!social.medium) return [];
  const res = await get(`https://medium.com/feed/@${social.medium}`);
  if (!res) return [];
  const xml = parser.parse(await res.text());
  const items = [xml?.rss?.channel?.item ?? []].flat();
  return items.slice(0, limit).map((it: any) => ({
    title: String(it.title),
    url: String(it.link).split('?')[0],
    date: new Date(it.pubDate).toISOString(),
    tags: [it.category ?? []].flat().map(String).slice(0, 3),
  }));
}

export type Video = { title: string; url: string; date: string; thumb: string };

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
    thumb: e['media:group']?.['media:thumbnail']?.url ?? '',
  }));
}
