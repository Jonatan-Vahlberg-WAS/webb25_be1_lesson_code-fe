import { useEffect, useMemo, useState } from "react";
import { getArtists } from "../../api/artists";
import { getAlbumsByArtist } from "../../api/albums";
import { createSong } from "../../api/songs";

export default function CreateSongForm({ onCreated }) {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [albumId, setAlbumId] = useState("");

    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loadingArtists, setLoadingArtists] = useState(true);

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadArtists() {
            try {
                setLoadingArtists(true);

                const data = await getArtists();
                setArtists(data);

                setArtist(data?.[0]?._id || "");

            } catch (err) {
                setError(err.message || "Could not load artists");
            } finally {
                setLoadingArtists(false);
            }
        }

        loadArtists();
    }, []);

    useEffect(() => {
        async function loadAlbums() {
            if (!artist) return;

            try {
                const data = await getAlbumsByArtist(artist);
                setAlbums(data);
                setAlbumId("");
            } catch (err) {
                setAlbums([]);
                setAlbumId("");
            }
        }

        loadAlbums();
    }, [artist]);

    const canSubmit = useMemo(() => {
        return title.trim().length > 0 && artist && !submitting;
    }, [title, artist, submitting]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!canSubmit) return;

        try {
            setError(null);
            setSubmitting(true);

            await createSong({
                title: title.trim(),
                artist,
                albumId: albumId || null
            });

            setTitle("");

            onCreated?.();

        } catch (err) {
            setError(err.message || "Could not create song");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="create-song-form">
            <h2>Skapa song</h2>

            {error && <p className="create-song-form__error">{error}</p>}

            {loadingArtists ? (
                <p className="create-song-form__loading">Laddar artists...</p>
            ) : artists.length === 0 ? (
                <p className="create-song-form__empty">Du behöver skapa en artist först.</p>
            ) : (
                <form onSubmit={handleSubmit} className="create-song-form__form">
                    <label className="create-song-form__field">
                        <span className="create-song-form__label">Låtnamn</span>
                        <input
                            className="create-song-form__input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="t.ex. Creep"
                        />
                    </label>

                    <label className="create-song-form__field">
                        <span className="create-song-form__label">Artist</span>
                        <select
                            className="create-song-form__select"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                        >
                            {artists.map((a) => (
                                <option key={a._id} value={a._id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="create-song-form__field">
                        <span className="create-song-form__label">Album</span>
                        <select
                            className="create-song-form__select"
                            value={albumId}
                            onChange={(e) => setAlbumId(e.target.value)}
                        >
                            <option value="">Ingen (single)</option>
                            {albums.map((al) => (
                                <option key={al._id} value={al._id}>
                                    {al.title}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button className="create-song-form__button" disabled={!canSubmit}>
                        {submitting ? "Skapar..." : "Skapa"}
                    </button>
                </form>
            )}
        </div>
    );
}