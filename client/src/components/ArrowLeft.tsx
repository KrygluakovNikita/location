import BackArrow from '../images/BackArrow.svg';
import './ArrowLeft.css';

export const ArrowLeft = () => {
  return (
    <div className='post-top'>
      <a className='back-button' href='/'>
        <img src={BackArrow} alt='' />
        <p>назад</p>
      </a>
    </div>
  );
};
