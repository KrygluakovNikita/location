import { useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { Search } from '../components/Search';
import { Sidebar } from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useGetPostsQuery } from '../store/api/PostApi';
import { PostDto } from '../store/reducers/PostSlice';
import { IUser, setUser } from '../store/reducers/UserSlice';
import { getUserData } from '../utils/cookie';
import './Feed.css';

export const Feed = () => {
  const { isLoading } = useGetPostsQuery();
  const user = useAppSelector(state => state.user);
  const posts = useAppSelector(state => state.postSlice.posts);
  const dispatch = useAppDispatch();
  const [filteredPosts, setFilteredPosts] = useState<PostDto[]>(posts);

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
        <Search setFilteredPosts={setFilteredPosts} posts={posts} />
        <div className='posts'>{!isLoading && filteredPosts?.map(post => <PostCard key={post.postId} {...post} />)}</div>
      </div>
    </>
  );
};
