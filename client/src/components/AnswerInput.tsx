import { FC, useState, Dispatch, FormEvent, MouseEvent } from 'react';
import { IUser, UserDto } from '../store/reducers/UserSlice';
import Close from '../images/Close.svg';
import './AnswerInput.css';
import Send from '../images/Send.svg';
import { ReplyUpload } from '../store/reducers/PostSlice';
import { useUploadAnswerMutation } from '../store/api/AnswerApi';

interface IAnswerInputProps {
  user: UserDto | IUser;
  userReply: UserDto;
  commentId: string;
  postId: string;
  setReply: Dispatch<React.SetStateAction<boolean>>;
}

export const AnswerInput: FC<IAnswerInputProps> = ({ user, userReply, setReply, postId, commentId }) => {
  const [message, setMessage] = useState('');
  const [uploadAnswer] = useUploadAnswerMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    if (message) {
      const uploadDto: ReplyUpload = { commentId, user: user as UserDto, message, userReply };
      await uploadAnswer(uploadDto);
      setMessage('');
      setReply(false);
    }
  };
  return (
    <div className='answer'>
      <img className='comment-img' src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + user.photo} alt='' />
      <div className='answer-main'>
        <div className='name-close'>
          <p className='comment-user-nickname'>{user.nickname}</p>
          <img src={Close} alt='' onClick={e => setReply(false)} />
        </div>
        <form className='answer-text' onSubmit={e => submitHandler(e)}>
          <p className='comment-text'>{userReply.nickname},</p>
          <input placeholder='Ответ' value={message} onChange={e => setMessage(e.target.value)} className='comment-text' />
          <img src={Send} alt='' onClick={e => submitHandler(e)} />
        </form>
      </div>
    </div>
  );
};
