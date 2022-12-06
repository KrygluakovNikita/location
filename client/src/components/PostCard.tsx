import { FC } from 'react';
import { CommentDto, LikeDto, UserDto } from '../store/reducers/UserSlice';
import './PostCard.css';
import Pointer from '../images/Pointer.svg';
import Icon from '../images/Icon.svg';
import Share from '../images/Share.svg';
import Heart from '../images/Heart.svg';
import Comment from '../images/Comment.svg';

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

export const PostCard: FC<IPostProps> = ({ location, postDate, title, user, description, photo }) => {
  const postLocaleDate = new Date(postDate).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
  const postLocaleTime = new Date(postDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const gameLocaleDate = new Date(postDate).toLocaleDateString('ru-RU', { month: '2-digit', day: 'numeric', year: 'numeric' });
  const gameLocaleTime = new Date(postDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const maxDescriptionLength = 150;

  return (
    <div className='post'>
      <div className='info'>
        <div className='user-info'>
          <img className='img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + user.photo} alt='' />
          <div className='user-text'>
            <p className='user-nickname'>{user.nickname}</p>
            <p className='post-date'>
              {postLocaleDate} в {postLocaleTime}
            </p>
          </div>
        </div>

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
        <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + photo} alt='' />
      </div>
      <div className='post-footer'>
        <div className='footer'>
          <img src={Share} alt='' />
          <p onClick={() => {}}>Поделиться</p>
        </div>
        <div className='footer'>
          <img src={Comment} alt='' />
          <p onClick={() => {}}>Комментарии</p>
        </div>
        <div className='footer'>
          <img src={Heart} alt='' />
          <p onClick={() => {}}>125</p>
        </div>
      </div>
    </div>
  );
};
