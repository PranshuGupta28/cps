import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Lightweight file-based content layer. Non-developers edit JSON files in
 * /content — see CONTENT_GUIDE.md.
 */

const contentDir = path.join(process.cwd(), "content");

export interface LocalText {
  en: string;
  hi?: string;
}

export interface NewsItem {
  slug: string;
  date: string; // ISO
  category: string;
  image: string | null; // filename under /public/images
  title: LocalText;
  excerpt: LocalText;
  body: { en: string[]; hi?: string[] };
}

export interface EventItem {
  date: string;
  title: LocalText;
  category: string;
  description: LocalText;
}

export interface NoticeItem {
  date: string;
  title: LocalText;
  body: LocalText;
  /** id of a document in src/data/documents.ts, or null */
  document: string | null;
}

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt: LocalText;
  caption: LocalText;
}

export interface GalleryAlbum {
  id: string;
  title: LocalText;
  date: string;
  photos: GalleryPhoto[];
}

async function readJson<T>(file: string): Promise<T> {
  const raw = await readFile(path.join(contentDir, file), "utf-8");
  return JSON.parse(raw) as T;
}

export async function getNews(): Promise<NewsItem[]> {
  const items = await readJson<NewsItem[]>("news.json");
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNewsItem(slug: string): Promise<NewsItem | undefined> {
  return (await getNews()).find((n) => n.slug === slug);
}

export async function getEvents(): Promise<EventItem[]> {
  const items = await readJson<EventItem[]>("events.json");
  return items.sort((a, b) => (a.date < b.date ? -1 : 1));
}

export async function getNotices(): Promise<NoticeItem[]> {
  const items = await readJson<NoticeItem[]>("notices.json");
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getGallery(): Promise<GalleryAlbum[]> {
  const data = await readJson<{ albums: GalleryAlbum[] }>("gallery.json");
  return data.albums.sort((a, b) => (a.date < b.date ? 1 : -1));
}
