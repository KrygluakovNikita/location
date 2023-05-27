import { FC } from 'react';
import './EquipmentCard.css';
import { EquipmentDto } from '../store/api/EquipmentApi';

export const EquipmentCard: FC<EquipmentDto> = ({ title, description, equipmentId, price, count, photo, descriptionAboutStaff }) => {
  const defaultImage = 'default_image.jpg';

  return (
    <div className='equipment'>
      <div className='info'>
        <p className='title'>{title}</p>
        <p className='description post-text'>{description}</p>
        <p className='additional-description post-text'>{descriptionAboutStaff}</p>
        <p className='price post-text'>{price} руб. за 1 час</p>
        <p className='count post-text'>Количество: {count} шт.</p>
      </div>
      <div className='equipment-image-wrapper'>
        {photo ? (
          <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + photo} alt='' />
        ) : (
          <img src={process.env.REACT_APP_SERVER_ENDPOINT + '/' + defaultImage} alt='' />
        )}
      </div>
    </div>
  );
};
