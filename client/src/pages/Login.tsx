import React from 'react';

export const Login = () => {
  const google = () => {
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL, '_self');
  };
  const logout = () => {
    window.open('http://localhost:8080/api/oauth/logout', '_self');
  };
  return (
    <div>
      <h1>Choose a Login Method</h1>
      <div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
        <div>
          <button onClick={google}>Google</button>
        </div>
      </div>
    </div>
  );
};
