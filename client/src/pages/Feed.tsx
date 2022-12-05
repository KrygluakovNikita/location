import { useEffect } from 'react';
import { Post } from '../components/Post';
import { Sidebar } from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useGetPostsQuery } from '../store/api/PostApi';
import { IUser, setUser } from '../store/reducers/UserSlice';
import { getUserData } from '../utils/cookie';
import './Feed.css';

export const Feed = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = getUserData();

    if (!user && userData) {
      const userDto = JSON.parse(userData);
      const result: IUser = { ...userDto.user, accessToken: userDto.accessToken };
      dispatch(setUser(result));
    }
  }, []);

  return (
    <>
      <Sidebar isProfile={false} />
      <div className='main'>
        <div className='posts'>{!isLoading && posts?.map(post => <Post key={post.postId} {...post} />)}</div>
      </div>
    </>
  );
};
