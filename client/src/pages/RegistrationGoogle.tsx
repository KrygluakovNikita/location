import React, { useEffect, useState } from 'react';
import LogoImg from '../images/Logo.svg';
import { useAppSelector } from '../hooks/redux';
import { IGoogleRegistration, useRegistrationGoogleMutation, useUpdatePhotoMutation } from '../store/api/UserApi';
import './RegistrationGoogle.css';
import UploadImage from '../components/UploadImage';
import defaultImage from '../images/default.png';
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const RegistrationGoogle = () => {
  const user = useAppSelector(state => state.user);
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [agree, setAgree] = useState(false);
  const [RegistrationGoogle, { isError, error, isSuccess: isSuccessRegistration }] = useRegistrationGoogleMutation();
  const [UpdatePhoto, { isSuccess: isSuccessUpload, isError: isErrorUpload, isLoading }] = useUpdatePhotoMutation();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<File | string>(defaultImage);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  const RegistrationHandler = async () => {
    const userDto: IGoogleRegistration = { nickname, city };
    await RegistrationGoogle(userDto);
    if (selectedImage !== defaultImage) {
      const photo = new FormData();
      photo.append('photo', selectedImage);
      await UpdatePhoto(photo);
    }
  };

  useEffect(() => {
    if (isErrorUpload || isSuccessUpload) {
      navigate('/');
    }
    if (isError) {
      const err = error as FetchBaseQueryError;
      if (err.status === 401) {
        navigate('/login');
      }
    }
  }, [isError, error, navigate, isSuccessRegistration, selectedImage, UpdatePhoto, user, isErrorUpload, isSuccessUpload, isLoading]);

  return (
    <div>
      <div className='card'>
        <div className=''>{user && <p>{user.nickname}</p>}</div>
        <div className='main'>
          <div className='logo'>
            <img src={LogoImg} alt='Logo' />
          </div>
          <div className='title accent'>Давайте начнём</div>
          <div className='text'>Создайте новый аккаунт</div>
          <UploadImage selectedImage={selectedImage} changeHandler={changeHandler} />

          <div className='input'>
            <input placeholder='Никнейм' type='email' onChange={e => setNickname(e.target.value)} />
          </div>
          <div className='input'>
            <input placeholder='Город' type='text' onChange={e => setCity(e.target.value)} />
          </div>

          <div className='terms'>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input className='' type='checkbox' onChange={() => setAgree(state => !state)} />
                  </td>
                  <td>
                    <label>
                      Я согласен с условиями{' '}
                      <a href='/#' className='accent'>
                        Пользовательского соглашения
                      </a>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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
