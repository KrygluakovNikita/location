import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './pages/Login';
import { useGetUsersQuery } from './store/api/UserApi';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:8000/api/oauth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
      })
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then(resObject => {
          setUser(resObject.user);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const { data, isLoading } = useGetUsersQuery();

  return (
    <div className='container'>
      <Login />
      {user && (
        <div>
          <p>{JSON.stringify(user)}</p>
        </div>
      )}
      {!isLoading ? (
        <div>
          <p>{JSON.stringify(data)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
