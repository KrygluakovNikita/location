import React from 'react';
import { Login } from './pages/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RegistrationGoogle } from './pages/RegistrationGoogle';
import { Registration } from './pages/Registration';
import { Feed } from './pages/Feed';
import { useAppSelector } from './hooks/redux';
import { PageNotFound } from './pages/PageNotFound';

function App() {
  const { userId } = useAppSelector(state => state.user);
  return (
    <>
      <Routes>
        <Route path='/login' element={userId ? <Navigate to='/' replace={true} /> : <Login />} />
        <Route path='/registration-google' element={userId ? <Navigate to='/' replace={true} /> : <RegistrationGoogle />} />
        <Route path='/registration' element={userId ? <Navigate to='/' replace={true} /> : <Registration />} />
        <Route path='/' element={<Feed />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
