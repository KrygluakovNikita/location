import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Sidebar } from '../components/Sidebar';
import { UserInfo } from '../components/UserInfo';
import { useGetPostQuery } from '../store/api/PostApi';
import { convertGameDate, convertPostDate } from '../utils/timeConverter';
import './Post.css';
import Pointer from '../images/Pointer.svg';
import Icon from '../images/Icon.svg';
import Heart from '../images/Heart.svg';
import { Share } from '../components/Share';
import { correctEnding } from '../utils/naming';
import { Comments } from '../components/Comments';
import { useAppSelector } from '../hooks/redux';

export const Post = () => {
  const { postId } = useParams();
  // const { post, isLoading } = useGetPostQuery(postId!);
  const post = useAppSelector(state => state.postSlice.posts.filter(post => post.postId === postId!)[0]);
  const [postDate, setPostDate] = useState({ postLocaleDate: '', postLocaleTime: '' });
  const [gameDate, setGameDate] = useState({ gameLocaleDate: '', gameLocaleTime: '' });

  useEffect(() => {
    if (post?.postDate) {
      const date = convertPostDate(post!.postDate);
      setPostDate(date);
    }
    if (post?.gameDate) {
      const date = convertGameDate(post!.gameDate);
      setGameDate(date);
    }
  }, [post]);

  return (
    <>
      <Sidebar isProfile={false} />
      <div className='main'>
        {/* {isLoading && <Loader />} */}
        {post ? (
          <div className='container'>
            <div className='post-card'></div>
            <UserInfo postLocaleDate={postDate.postLocaleDate} postLocaleTime={postDate.postLocaleTime} user={post!.user} />
            <p className='post-title'>{post.title}</p>
            <div className='post-text'>
              <p>{post.description}</p>
            </div>
            <div className='post-metadata'>
              <div className='post-game-date'>
                <img src={Icon} alt='' />
                <p>
                  {gameDate.gameLocaleDate} {gameDate.gameLocaleTime}
                </p>
              </div>
              <div className='post-location'>
                <img src={Pointer} alt='' />
                <p className='location-text'>{post.location}</p>
              </div>
            </div>

            <div className='post-image-wrapper'>
              <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + post.photo} alt='' />
            </div>
            <div className='post-footer'>
              <Share url={postId!} />
              <div className='footer'>
                <img src={Heart} alt='' />
                <p onClick={() => {}}>125</p>
              </div>
            </div>
            <div className='comments-container'>
              <div className='comments-count'>
                <p>
                  {post.comments.length ?? 0} комментар{correctEnding(post.comments.length ?? 0)}
                </p>
              </div>
              <Comments comments={post.comments} postId={postId!} />
            </div>
          </div>
        ) : (
          <div>
            <h3>Такого событие не существует</h3>
          </div>
        )}
      </div>
    </>
  );
};
