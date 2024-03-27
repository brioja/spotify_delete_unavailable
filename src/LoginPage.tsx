import React from 'react';

const clientId = 'bb5d13f3082c499fa9a2b2f86297b91d';
const redirectUri = encodeURIComponent('http://localhost:3000/redirect'); // Ensure this matches your application's redirect URI
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
