import React, { FC } from 'react';
import ShareIcon from '../images/Share.svg';

interface IShareProps {
  url: string;
}

export const Share: FC<IShareProps> = ({ url }) => {
  const copyHandler = () => {
    if (!navigator.clipboard) {
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
