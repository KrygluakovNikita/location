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
import { EditPost } from './pages/EditPost';
import { AdminProfileGameStat } from './pages/Admin/AdminProfileGameStat';
import { AdminAddEquipment } from './pages/Admin/AdminAddEquipment';
import { AdminProfileDiagram } from './pages/Admin/AdminProfileDiagram';

function App() {
  const user = useAppSelector(state => state.user);

  return (
    <>
      <Routes>
        <Route path='/login' element={!!user?.userId ? <Navigate to='/' replace={true} /> : <Login />} />
        <Route path='/registration-google' element={!!user?.userId ? <Navigate to='/' replace={true} /> : <RegistrationGoogle />} />
        <Route path='/registration' element={!!user?.userId ? <Navigate to='/' replace={true} /> : <Registration />} />
        <Route
          path='/profile'
          element={
            !user?.userId ? (
              <Navigate to='/login' replace={true} />
            ) : user?.role === 'user' ? (
              <Profile />
            ) : (
              <Navigate to='/admin/profile' replace={true} />
            )
          }
        />
        <Route
          path='/profile/:gameId'
          element={
            !user?.userId ? <Navigate to='/login' replace={true} /> : user?.role === 'user' ? <ProfileQrGame /> : <Navigate to='/' replace={true} />
          }
        />
        <Route
          path='/profile/settings'
          element={
            !user?.userId ? <Navigate to='/login' replace={true} /> : user?.role === 'user' ? <ProfileSettings /> : <Navigate to='/' replace={true} />
          }
        />
        <Route
          path='/admin/profile'
          element={
            !user?.userId ? (
              <Navigate to='/login' replace={true} />
            ) : user?.role === 'admin' ? (
              <AdminProfile />
            ) : (
              <Navigate to='/profile' replace={true} />
            )
          }
        />
        <Route
          path='/admin/profile/:gameId'
          element={
            !user?.userId ? (
              <Navigate to='/login' replace={true} />
            ) : user?.role === 'admin' ? (
              <AdminProfileQrGame />
            ) : (
              <Navigate to='/profile/:gameId' replace={true} />
            )
          }
        />
        <Route
          path='/admin/profile/settings'
          element={
            !user?.userId ? (
              <Navigate to='/login' replace={true} />
            ) : user?.role === 'admin' ? (
              <AdminProfileSettings />
            ) : (
              <Navigate to='/profile/settings' replace={true} />
            )
          }
        />
        <Route path='/admin/add-equipment' element={!user?.userId ? <Navigate to='/login' replace={true} /> : <AdminAddEquipment />} />
        <Route
          path='/admin/profile/game-stat'
          element={
            !user?.userId ? (
              <Navigate to='/login' replace={true} />
            ) : user?.role === 'admin' ? (
              <AdminProfileGameStat />
            ) : (
              <Navigate to='/profile/settings' replace={true} />
            )
          }
        />
        <Route
          path='/admin/profile/diagram'
          element={user?.userId && user?.role === 'admin' ? <AdminProfileDiagram /> : <Navigate to='/profile' replace={true} />}
        />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/add-post/:postId' element={<AddPost />} />
        {/*/// */}
        <Route path='/:postId' element={<Post />} />
        <Route path='/admin/:postId' element={<EditPost />} />
        <Route path='/' element={<Feed />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
