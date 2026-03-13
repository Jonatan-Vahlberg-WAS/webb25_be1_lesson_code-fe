import { useEffect, useState } from "react";
import { getSongs } from "../../api/songs";

export default function SongList() {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function load() {
        try {
            setError(null);
            setLoading(true);

            const data = await getSongs();
            setSongs(data);

        } catch (err) {
            setError(err.message || "Could not load songs");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    if (loading) return (
        <div className="song-list song-list--loading">
            <h2>Songs</h2>
            <p className="song-list__status">Laddar songs...</p>
        </div>
    );
    if (error) return (
        <div className="song-list song-list--error">
            <h2>Songs</h2>
            <p className="song-list__error">{error}</p>
            <button className="song-list__btn" onClick={load}>Försök igen</button>
        </div>
    );

    return (
        <div className="song-list">
            <h2>Songs</h2>

            {songs.length === 0 ? (
                <p className="song-list__status">Inga songs ännu.</p>
            ) : (
                <ul className="song-list__list">
                    {songs.map((s) => (
                        <li key={s._id} className="song-list__item">
                            <span className="song-list__name">{s.title}</span>
                            {s.artist?.name && (
                                <span className="song-list__artist"> — {s.artist.name}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <button className="song-list__btn" onClick={load}>Uppdatera</button>
        </div>
    );
}