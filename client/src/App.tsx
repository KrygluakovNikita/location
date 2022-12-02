import React from 'react';
import { Login } from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { RegistrationGoogle } from './pages/RegistrationGoogle';

function App() {
  return (
    <>
      <Routes>
        <Route path='/registration-google' element={<RegistrationGoogle />} />
        <Route path='/*' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
