import React, { useEffect } from 'react';
import { Login } from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { RegistrationGoogle } from './pages/RegistrationGoogle';
import { useAppSelector } from './hooks/redux';

function App() {
  const user = useAppSelector(state => state.user.nickname);
  return (
    <>
      {user && <h3>{user}</h3>}
      <Routes>
        <Route path='/registration-google' element={<RegistrationGoogle />} />
        <Route path='/*' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
