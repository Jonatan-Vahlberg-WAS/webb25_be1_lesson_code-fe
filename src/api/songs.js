import { apiFetch } from './client';

export async function getSongs() {
    try {
        const response = await apiFetch('/api/songs');
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function createSong({ title, artist, albumId = null }) {
  const body = { title, artist };
  if (albumId) body.album = albumId;
  return apiFetch("/api/songs", { method: "POST" }, body);
}
