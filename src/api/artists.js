import { apiFetch } from './client';

export async function getArtists() {
    try {
        const response = await apiFetch('/api/artists');
        return response;
    } catch (error) {
        console.error(error);
        return [];
    }
}