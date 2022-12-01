import React, { useEffect, useState } from 'react';
import LogoImg from '../images/Logo.svg';
import { useAppSelector } from '../hooks/redux';
import { IGoogleRegistration, useLoginGoogleMutation } from '../store/api/UserApi';
import { validateEmail } from '../utils/validation';
import './RegistrationGoogle.css';

export const RegistrationGoogle = () => {
  const user = useAppSelector(state => state.user);
  const [LoginGoogle, { isError, error }] = useLoginGoogleMutation();
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [agree, setAgree] = useState(false);

  const RegistrationHandler = () => {
    const userDto: IGoogleRegistration = { nickname, city };
    LoginGoogle(userDto);
  };

  const changeNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const changeCityHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      if (error === 401) {
      } /////////////create error when value is invalid and if status 401 redirect for creating new registrationToken
    }
  }, [isError, error]);

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
          <div className='photo'>
            <p>Загрузить фото профиля</p>
            {/*////////////////////*/}
          </div>
          <div className='input'>
            <input placeholder='Никнейм' type='email' onChange={changeNicknameHandler} />
          </div>
          <div className='input'>
            <input placeholder='Город' type='text' onChange={changeCityHandler} />
          </div>

          <div className='terms'>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input type='checkbox' onChange={() => setAgree(state => !state)} />
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
