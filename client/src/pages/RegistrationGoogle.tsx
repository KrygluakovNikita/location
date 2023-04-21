import React, { useEffect, useState } from 'react';
import LogoImg from '../images/Logo.svg';
import { IGoogleRegistration, useRegistrationGoogleMutation, useUpdatePhotoMutation } from '../store/api/UserApi';
import './RegistrationGoogle.css';
import UploadImage from '../components/UploadImage';
import defaultImage from '../images/default.svg';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Terms } from '../components/Terms';

export const RegistrationGoogle = () => {
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [agree, setAgree] = useState(false);
  const [registrationGoogle, { isError }] = useRegistrationGoogleMutation();
  const [UpdatePhoto, { isSuccess: isSuccessUpload, isError: isErrorUpload, error }] = useUpdatePhotoMutation();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<File | string>(defaultImage);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  const RegistrationHandler = async () => {
    const userDto: IGoogleRegistration = { nickname, city };
    await registrationGoogle(userDto);
    if (selectedImage !== defaultImage) {
      const photo = new FormData();
      photo.append('photo', selectedImage);
      await UpdatePhoto(photo);
    }
  };

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
    if (isErrorUpload) {
      const err = error as FetchBaseQueryError;
      if (err.status === 401) {
        navigate('/login');
      }
    }
  }, [error, isError, isErrorUpload, isSuccessUpload, navigate]);

  return (
    <div>
      <div className='card'>
        <div>
          <div className='logo'>
            <img src={LogoImg} alt='Logo' />
          </div>
          <div className='title accent'>Давайте начнём</div>
          <div className='text'>Создайте новый аккаунт</div>
          <UploadImage selectedImage={selectedImage} changeHandler={changeHandler} title='Загрузить фото профиля' />

          <div className='input'>
            <input placeholder='Никнейм' type='text' onChange={e => setNickname(e.target.value)} />
          </div>
          <div className='input'>
            <input placeholder='Город' type='text' onChange={e => setCity(e.target.value)} />
          </div>
          <Terms setAgree={setAgree} />
          <button disabled={!nickname || !city || !agree} className='btn' onClick={RegistrationHandler}>
            Зарегистрироваться
          </button>
          <div className='registration-login'>
            <p>Уже есть аккаунт?</p>
            <a href='login' className='accent'>
              Войти
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
