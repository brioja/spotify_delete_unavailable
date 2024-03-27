import React from 'react';
import { useLocation } from 'react-router-dom';

const RedirectPage: React.FC = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  return (
    <div>
      <h1>Login Successful</h1>
      <p>Your authorization code is: {code}</p>
    </div>
  );
};

export default RedirectPage;
