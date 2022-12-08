import { FC } from 'react';
import { LikeDto, UserDto } from '../store/reducers/UserSlice';
import './PostCard.css';
import Pointer from '../images/Pointer.svg';
import Icon from '../images/Icon.svg';
import Heart from '../images/Heart.svg';
import Comment from '../images/Comment.svg';
import { Share } from './Share';
import { UserInfo } from './UserInfo';
import { convertGameDate, convertPostDate } from '../utils/timeConverter';
import { CommentDto } from '../store/reducers/PostSlice';

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

export const PostCard: FC<IPostProps> = ({ postId, location, postDate, gameDate, title, user, description, photo }) => {
  const { postLocaleDate, postLocaleTime } = convertPostDate(postDate);
  const { gameLocaleDate, gameLocaleTime } = convertGameDate(gameDate);
  const maxDescriptionLength = 150;
  const defaultImage = 'default_image.jpg';
  console.log(photo);

  return (
    <div className='post'>
      <div className='info'>
        <UserInfo postLocaleDate={postLocaleDate} postLocaleTime={postLocaleTime} user={user} />
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
          <a href={`/${postId}`}>Комментарии</a>
        </div>
        <div className='footer'>
          <img src={Heart} alt='' />
          <p onClick={() => {}}>125</p>
        </div>
      </div>
    </div>
  );
};
