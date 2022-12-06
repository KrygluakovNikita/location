import React, { FC } from 'react';
import ShareIcon from '../images/Share.svg';

interface IShareProps {
  url: string;
}

export const Share: FC<IShareProps> = ({ url }) => {
  const copyHandler = () => {
    if (!navigator.clipboard) {
      console.log('Вы не можете скопировать ссылку');
    } else {
      const urlWithoutId = window.location.href;
      navigator.clipboard.writeText(urlWithoutId + url);
    }
  };
  return (
    <div className='footer' onClick={copyHandler}>
      <img src={ShareIcon} alt='' />
      <p>Поделиться</p>
    </div>
  );
};
