import React from 'react';

const clientId = 'bb5d13f3082c499fa9a2b2f86297b91d';

// Dynamically set redirectUri based on the environment
const redirectUri = process.env.NODE_ENV === 'production'
  ? encodeURIComponent('https://brioja.github.io/spotify_delete_unavailable/#/redirect')
  : encodeURIComponent('http://localhost:3000/spotify_delete_unavailable/#/redirect');

const scopes = encodeURIComponent('playlist-modify-public playlist-modify-private');
const showDialog = true;

const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}&show_dialog=${showDialog}`;

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login with Spotify</h1>
      <a href={spotifyLoginUrl}>Log In</a>
    </div>
  );
};

export default LoginPage;
