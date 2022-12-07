import React from 'react';
import { Login } from './pages/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RegistrationGoogle } from './pages/RegistrationGoogle';
import { Registration } from './pages/Registration';
import { Feed } from './pages/Feed';
import { useAppSelector } from './hooks/redux';
import { PageNotFound } from './pages/PageNotFound';
import { Profile } from './pages/Profile';
import { Post } from './pages/Post';

function App() {
  const user = useAppSelector(state => state.user);
  console.log(user);

  return (
    <>
      <Routes>
        <Route path='/login' element={user?.userId ? <Navigate to='/' replace={true} /> : <Login />} />
        <Route path='/registration-google' element={user?.userId ? <Navigate to='/' replace={true} /> : <RegistrationGoogle />} />
        <Route path='/registration' element={user?.userId ? <Navigate to='/' replace={true} /> : <Registration />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/:postId' element={<Post />} />
        <Route path='/' element={<Feed />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
