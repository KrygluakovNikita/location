import React, { useEffect, useState } from 'react';
import './App.css';
import { Payment } from './utils/Payment';
import { Login } from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:8080/api/oauth/login/success', {
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

  Payment();
  return (
    <div className='container'>
      {/* <Login />
      {user && (
        <div>
          <p>{JSON.stringify(user)}</p>
        </div>
      )} */}
    </div>
  );
}

export default App;
