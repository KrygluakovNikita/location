import { FC } from 'react';
import './UploadImage.css';

interface UploadImageProps {
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: File | string;
}

const UploadImage: FC<UploadImageProps> = ({ selectedImage, changeHandler }) => {
  return (
    <div className='upload-image'>
      {selectedImage && (
        <div>
          <img
            alt='Не найдена'
            className='img '
            src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage as File)}
          />
        </div>
      )}

      <label className='feedback__label '>
        <span className='underline'>Загрузите фото профиля</span>
        <input type='file' className='feedback__file' onChange={changeHandler} />
      </label>
    </div>
  );
};

export default UploadImage;
