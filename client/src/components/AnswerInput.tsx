import { FC, useState, Dispatch } from 'react';
import { IUser, UserDto } from '../store/reducers/UserSlice';
import Close from '../images/Close.svg';
import './AnswerInput.css';
import Send from '../images/Send.svg';

interface IAnswerInputProps {
  user: UserDto | IUser;
  userReply: UserDto;
  setReply: Dispatch<React.SetStateAction<boolean>>;
}

export const AnswerInput: FC<IAnswerInputProps> = ({ user, userReply, setReply }) => {
  return (
    <div className='answer'>
      <img className='comment-img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + user.photo} alt='' />
      <div className='answer-main'>
        <div className='name-close'>
          <p className='comment-user-nickname'>{user.nickname}</p>
          <img
            src={Close}
            alt=''
            onClick={() => {
              setReply(false);
            }}
          />
        </div>
        <div className='answer-text'>
          <p className='comment-text'>{userReply.nickname},</p>
          <input placeholder='Ответ' className='comment-text' />
          <img
            src={Send}
            alt=''
            onClick={() => {
              console.log('click');
              setReply(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};
