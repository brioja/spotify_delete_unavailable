import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteUnavailableTracksInPlaylist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const accessToken = location.state?.accessToken;
  const [unavailableTracks, setUnavailableTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalTracks, setTotalTracks] = useState<number>(0);
  const [fetchedTracks, setFetchedTracks] = useState<number>(0);

  useEffect(() => {
    const fetchAllTracks = async () => {
      let allTracks: any[] = [];
      let offset = 0;
      const limit = 50;
      let hasMoreTracks = true;

      try {
        // First, fetch the total number of tracks
        const totalResponse = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setTotalTracks(totalResponse.data.tracks.total);

        // Now, fetch all tracks with pagination
        while (hasMoreTracks) {
          console.log(`Fetching tracks for playlist ${id}...`);
          const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            params: {
              limit,
              offset
            }
          });

          allTracks = [...allTracks, ...response.data.items];
          offset += limit;
          setFetchedTracks(allTracks.length);
          hasMoreTracks = response.data.items.length === limit;
        }

        console.log('All tracks fetched:', allTracks);

        // Filter unavailable tracks
        const unavailableTracks = allTracks.filter(item => item.track.available_markets.length === 0);
        setUnavailableTracks(unavailableTracks);
      } catch (err) {
        setError('Failed to fetch tracks. Please try again.');
        console.error('Error fetching tracks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchAllTracks();
    }
  }, [accessToken, id]);

  const deleteUnavailableTracks = async () => {
    try {
      console.log(`Deleting unavailable tracks for playlist ${id}...`);

      if (unavailableTracks.length > 0) {
        // Split the unavailable tracks into batches of 100
        const batches = [];
        for (let i = 0; i < unavailableTracks.length; i += 100) {
          batches.push(unavailableTracks.slice(i, i + 100));
        }

        // Send a delete request for each batch
        for (const batch of batches) {
          await axios.delete(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            data: {
              tracks: batch.map(item => ({ uri: item.track.uri }))
            }
          });
        }

        console.log('Unavailable tracks deleted');
        setUnavailableTracks([]);
      } else {
        console.log('No unavailable tracks to delete.');
      }
    } catch (err) {
      setError('Failed to delete unavailable tracks. Please try again.');
      console.error('Error deleting tracks:', err);
    }
  };

  const progress = totalTracks > 0 ? Math.min((fetchedTracks / totalTracks) * 100, 100) : 0;

  return (
    <div>
      <h1>Delete Unavailable Tracks in Playlist</h1>
      {loading && (
        <div>
          <p>Loading tracks... {progress.toFixed(2)}%</p>
          <progress value={progress} max="100"></progress>
        </div>
      )}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          <h2>Unavailable Tracks in Playlist</h2>
          {unavailableTracks.length > 0 ? (
            <ul>
              {unavailableTracks.map((item) => (
                <li key={item.track.id}>{item.track.name}</li>
              ))}
            </ul>
          ) : (
            <p>No unavailable tracks found.</p>
          )}
          <button onClick={deleteUnavailableTracks} disabled={unavailableTracks.length === 0}>Delete Unavailable Tracks</button>
        </div>
      )}
    </div>
  );
};

export default DeleteUnavailableTracksInPlaylist;
