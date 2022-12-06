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

export const Post = () => {
  const { postId } = useParams();
  const { data, isLoading } = useGetPostQuery(postId!);
  const [postDate, setPostDate] = useState({ postLocaleDate: '', postLocaleTime: '' });
  const [gameDate, setGameDate] = useState({ gameLocaleDate: '', gameLocaleTime: '' });

  useEffect(() => {
    if (data?.postDate) {
      const date = convertPostDate(data!.postDate);
      setPostDate(date);
    }
    if (data?.gameDate) {
      const date = convertGameDate(data!.gameDate);
      setGameDate(date);
    }
  }, [data, isLoading]);

  return (
    <>
      <Sidebar isProfile={false} />
      <div className='main'>
        {isLoading && <Loader />}
        {data ? (
          <div className='container'>
            <div className='post-card'></div>
            <UserInfo postLocaleDate={postDate.postLocaleDate} postLocaleTime={postDate.postLocaleTime} user={data!.user} />
            <p className='post-title'>{data.title}</p>
            <div className='post-text'>
              <p>{data.description}</p>
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
                <p className='location-text'>{data.location}</p>
              </div>
            </div>

            <div className='post-image-wrapper'>
              <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + data.photo} alt='' />
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
                  {data.comments.length ?? 0} комментар{correctEnding(data.comments.length ?? 0)}
                </p>
              </div>
              <Comments comments={data.comments} />
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
