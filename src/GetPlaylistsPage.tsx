import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

interface Playlist {
  id: string;
  name: string;
}

const GetPlaylistsPage: React.FC = () => {
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        console.log('Fetching user playlists...');
        const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        console.log('Playlists fetched:', playlistsResponse.data.items);
        setPlaylists(playlistsResponse.data.items);
      } catch (err) {
        setError('Failed to fetch playlists. Please try again.');
        console.error('Error fetching playlists:', err);
      }
    };

    if (accessToken) {
      fetchPlaylists();
    }
  }, [accessToken]);

  return (
    <div>
      <h1>Login Successful</h1>
      {error && <p>{error}</p>}
      {!error && playlists.length > 0 && (
        <div>
          <h2>Your Playlists</h2>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link to={`/delete/${playlist.id}`} state={{ accessToken }}>
                  {playlist.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetPlaylistsPage;
