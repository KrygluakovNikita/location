import React from 'react';
import { Login } from './pages/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RegistrationGoogle } from './pages/RegistrationGoogle';
import { Registration } from './pages/Registration';
import { Feed } from './pages/Feed';
import { useAppSelector } from './hooks/redux';
import { PageNotFound } from './pages/PageNotFound';
import { Profile } from './pages/Profile/Profile';
import { Post } from './pages/Post';
import { AddPost } from './pages/AddPost';
import { ProfileQrGame } from './pages/Profile/ProfileQrGame';
import { ProfileSettings } from './pages/Profile/ProfileSettings';
import { AdminProfile } from './pages/Admin/AdminProfile';
import { AdminProfileQrGame } from './pages/Admin/AdminProfileQrGame';
import { AdminProfileSettings } from './pages/Admin/AdminProfileSettings';

function App() {
  const user = useAppSelector(state => state.user);

  return (
    <>
      <Routes>
        <Route path='/login' element={user?.userId ? <Navigate to='/' replace={true} /> : <Login />} />
        <Route path='/registration-google' element={user?.userId ? <Navigate to='/' replace={true} /> : <RegistrationGoogle />} />
        <Route path='/registration' element={user?.userId ? <Navigate to='/' replace={true} /> : <Registration />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:gameId' element={<ProfileQrGame />} />
        <Route path='/profile/settings' element={<ProfileSettings />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
        <Route path='/admin/profile/:gameId' element={<AdminProfileQrGame />} />
        <Route path='/admin/profile/settings' element={<AdminProfileSettings />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/add-post/:postId' element={<AddPost />} />
        {/*/// */}
        <Route path='/:postId' element={<Post />} />
        <Route path='/' element={<Feed />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
