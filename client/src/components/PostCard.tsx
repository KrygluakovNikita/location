import { FC, useState, useEffect, MouseEvent } from 'react';
import { LikeDto, UserDto } from '../store/reducers/UserSlice';
import './PostCard.css';
import Pointer from '../images/Pointer.svg';
import Icon from '../images/Icon.svg';
import HeartIcon from '../images/Heart.svg';
import FullHeartIcon from '../images/FullHeart.svg';
import Comment from '../images/Comment.svg';
import { Share } from './Share';
import { UserInfo } from './UserInfo';
import { convertGameDate, convertPostDate } from '../utils/timeConverter';
import { CommentDto } from '../store/reducers/PostSlice';
import { useAddLikeMutation, useDeleteLikeMutation } from '../store/api/PostApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface IPostProps {
  postId: string;
  user: UserDto;
  likes: LikeDto[];
  comments: CommentDto[];
  title: string;
  description: string;
  postDate: Date;
  gameDate: Date;
  location: string;
  photo: string;
}

export const PostCard: FC<IPostProps> = ({ postId, location, postDate, gameDate, title, user: postUser, description, photo, likes }) => {
  const user = useAppSelector(state => state.user);
  const { postLocaleDate, postLocaleTime } = convertPostDate(postDate);
  const { gameLocaleDate, gameLocaleTime } = convertGameDate(gameDate);
  const maxDescriptionLength = 150;
  const defaultImage = 'default_image.jpg';
  const [isLike, setIsLike] = useState(false);
  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (likes.findIndex(like => like.user.userId === user.userId!) !== -1) {
      setIsLike(true);
    }
  }, []);

  const likeHandler = async (e: MouseEvent<HTMLDivElement>) => {
    if (!user.userId) {
      navigate('/login');
    } else if (isLike) {
      await deleteLike(postId);
      setIsLike(false);
    } else {
      await addLike(postId);
      setIsLike(true);
    }
  };

  return (
    <div className='post'>
      <div className='info'>
        <UserInfo postLocaleDate={postLocaleDate} postLocaleTime={postLocaleTime} user={postUser} />
        <p className='title'>{title}</p>
        <p className='description post-text'>
          {description.length > maxDescriptionLength ? description.slice(0, maxDescriptionLength) + '...' : description}
        </p>
        <div className='game-date'>
          <img src={Icon} alt='' />
          <p className='post-date'>
            {gameLocaleDate} {gameLocaleTime}
          </p>
        </div>
        <div className='game-place'>
          <img src={Pointer} alt='' />
          <p className='post-text'>{location}</p>
        </div>
      </div>
      <div className='image-wrapper'>
        {photo ? (
          <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + photo} alt='' />
        ) : (
          <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + defaultImage} alt='' />
        )}
      </div>
      <div className='post-card-footer'>
        <Share url={postId} />
        <div className='footer'>
          <img src={Comment} alt='' />
          <a href={`${user.role === 'admin' ? '/admin' : ''}/${postId}`}>Комментарии</a>
        </div>
        {isLike ? (
          <div className='footer' onClick={e => likeHandler(e)}>
            <img src={FullHeartIcon} alt='' />
            <p>{likes.length}</p>
          </div>
        ) : (
          <div className='footer' onClick={e => likeHandler(e)}>
            <img src={HeartIcon} alt='' />
            <p>{likes.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};
