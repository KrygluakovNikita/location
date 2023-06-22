import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { UserInfo } from '../components/UserInfo';
import { convertGameDate, convertPostDate } from '../utils/timeConverter';
import './Post.css';
import Pointer from '../images/Pointer.svg';
import Icon from '../images/Icon.svg';
import Heart from '../images/Heart.svg';
import FullHeartIcon from '../images/FullHeart.svg';
import { Share } from '../components/Share';
import { correctEnding } from '../utils/naming';
import { Comments } from '../components/Comments';
import { useAppSelector } from '../hooks/redux';
import { ArrowLeft } from '../components/ArrowLeft';
import { useAddLikeMutation, useDeleteLikeMutation } from '../store/api/PostApi';
import moment from 'moment';

export const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useAppSelector(state => state.postSlice.posts.filter(post => post.postId === postId!)[0]);
  const user = useAppSelector(state => state.user);
  const [postDate, setPostDate] = useState({ postLocaleDate: '', postLocaleTime: '' });
  const [gameDate, setGameDate] = useState({ gameLocaleDate: '', gameLocaleTime: '' });
  const defaultImage = 'default_image.jpg';
  const [isLike, setIsLike] = useState(false);
  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();

  useEffect(() => {
    if (post?.likes.findIndex(like => like.user.userId === user.userId) !== -1) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, []);

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

  const likeHandler = async (e: any) => {
    if (!user.userId) {
      navigate('/login');
    } else if (isLike) {
      await deleteLike(postId!);
      setIsLike(false);
    } else {
      await addLike(postId!);
      setIsLike(true);
    }
  };

  return (
    <>
      <Sidebar isFeed={true} isProfile={false} isEquipment={false} />
      <div className='main'>
        <ArrowLeft />
        {post ? (
          <div className='container'>
            <div className='post-card'></div>
            <UserInfo
              postLocaleDate={postDate.postLocaleDate}
              postLocaleTime={postDate.postLocaleTime}
              isEdited={!!moment(post.postDate).diff(post.updatedPostDate, 'minutes')}
              user={post!.user}
            />
            <p className='post-title'>{post.title}</p>
            {/* <div className='post-text'>
              <p>{post.description}</p>
            </div> */}
            <div className='add-textarea-post'>
              <textarea>{post.description}</textarea>
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
              {post.photo ? (
                <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + post.photo} alt='' />
              ) : (
                <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + defaultImage} alt='' />
              )}
            </div>
            <div className='post-footer'>
              <Share url={postId!} />

              {isLike ? (
                <div className='footer' onClick={e => likeHandler(e)}>
                  <img src={FullHeartIcon} alt='' />
                  <p>{post.likes.length}</p>
                </div>
              ) : (
                <div className='footer' onClick={e => likeHandler(e)}>
                  <img src={Heart} alt='' />
                  <p>{post.likes.length}</p>
                </div>
              )}
            </div>
            <div className='comments-container'>
              <div className='comments-count'>
                <p>
                  {post.comments.length ?? 0} комментар{correctEnding(post.comments.length ?? 0)}
                </p>
              </div>
              <Comments postId={postId!} comments={post.comments} />
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
