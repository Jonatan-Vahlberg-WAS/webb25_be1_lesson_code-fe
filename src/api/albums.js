import { apiFetch } from "./client";

export async function getAlbumsByArtist(artistId) {
  try {
    return await apiFetch(`/api/albums/artist/${artistId}`);
  } catch (error) {
    console.error(error);
    return [];
  }
}
