import React from 'react';
import { Login } from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { RegistrationGoogle } from './pages/RegistrationGoogle';
import { Registration } from './pages/Registration';

function App() {
  return (
    <>
      <Routes>
        <Route path='/registration-google' element={<RegistrationGoogle />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/*' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
