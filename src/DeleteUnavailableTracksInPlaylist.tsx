import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteUnavailableTracksInPlaylist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        console.log(`Fetching tracks for playlist ${id}...`);
        const tracksResponse = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        console.log('Tracks fetched:', tracksResponse.data.items);
        setTracks(tracksResponse.data.items);
      } catch (err) {
        setError('Failed to fetch tracks. Please try again.');
        console.error('Error fetching tracks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchTracks();
    }
  }, [accessToken, id]);

  const deleteUnavailableTracks = async () => {
    try {
      console.log(`Deleting unavailable tracks for playlist ${id}...`);
      const unavailableTracks = tracks.filter(item => item.track.is_local);

      if (unavailableTracks.length > 0) {
        const deleteResponse = await axios.delete(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          data: {
            tracks: unavailableTracks.map(item => ({ uri: item.track.uri }))
          }
        });

        console.log('Unavailable tracks deleted:', deleteResponse.data);
        setTracks(tracks.filter(item => !item.track.is_local));
      } else {
        console.log('No unavailable tracks to delete.');
      }
    } catch (err) {
      setError('Failed to delete unavailable tracks. Please try again.');
      console.error('Error deleting tracks:', err);
    }
  };

  return (
    <div>
      <h1>Delete Unavailable Tracks in Playlist</h1>
      {loading && <p>Loading tracks...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          <h2>Tracks in Playlist</h2>
          <ul>
            {tracks.map((item) => (
              <li key={item.track.id}>{item.track.name}</li>
            ))}
          </ul>
          <button onClick={deleteUnavailableTracks}>Delete Unavailable Tracks</button>
        </div>
      )}
    </div>
  );
};

export default DeleteUnavailableTracksInPlaylist;
