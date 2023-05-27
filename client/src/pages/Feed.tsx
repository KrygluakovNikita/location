import { useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { Search } from '../components/Search';
import { Sidebar } from '../components/Sidebar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useGetPostsQuery } from '../store/api/PostApi';
import { PostDto } from '../store/reducers/PostSlice';
import { IUser, setData, UserRole } from '../store/reducers/UserSlice';
import { getUserData } from '../utils/cookie';
import './Feed.css';
import WhitePlusIcon from '../images/WhitePlus.svg';
import { useNavigate } from 'react-router-dom';
export const Feed = () => {
  const user = useAppSelector(state => state.user);
  // const posts = useAppSelector(state => state.postSlice.posts);
  const { data: posts, isLoading } = useGetPostsQuery();
  const [filteredPosts, setFilteredPosts] = useState<PostDto[]>(posts ?? []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserData();
    if (!user.userId && userData) {
      const userDto = JSON.parse(userData);
      const result: IUser = { ...userDto.user, accessToken: userDto.accessToken };
      dispatch(setData(result));
    }
  }, []);

  const clickHandler = () => {
    navigate('/add-post');
  };

  return (
    <>
      <Sidebar isFeed={true} isProfile={false} isEquipment={false} />
      <div className='main'>
        {user.role === UserRole.ADMIN && (
          <div className='feed-add-button'>
            <button onClick={clickHandler}>
              <img src={WhitePlusIcon} alt='' />
              Добавить
            </button>
          </div>
        )}
        <Search setFilteredPosts={setFilteredPosts} posts={posts ?? []} />
        {filteredPosts?.length ? (
          <div className='posts'>{!isLoading && filteredPosts?.map(post => <PostCard key={post.postId} {...post} />)}</div>
        ) : (
          <div className='center-text'>
            <p>Список пуст</p>
          </div>
        )}
      </div>
    </>
  );
};
