import React, { useRef, useEffect } from 'react';
import './Login.css';
import GoogleImg from '../images/Google.svg';
import LogoImg from '../images/Logo.svg';
import { validateEmail } from '../utils/validation';
import { IClientData, IUserLogin, useLoginMutation } from '../store/api/UserApi';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUserData } from '../utils/cookie';
import { IUser, setUser } from '../store/reducers/UserSlice';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [Login, {}] = useLoginMutation();
  const defaultColor = 'black';

  const GoogleHandler = () => {
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL, '_self');
  };

  const LogoutHandler = () => {
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL_LOGOUT, '_self');
  };

  const LoginHandler = async () => {
    if (!validateEmail(emailRef.current.value)) {
      emailRef.current.style.color = 'red';
    } else if (passwordRef.current.value.length < 6) {
      passwordRef.current.style.color = 'red';
    } else {
      const userDto: IUserLogin = { password: passwordRef.current.value, email: emailRef.current.value };
      const data = await Login(userDto);
      console.log(data);
      console.log('login');
    }
  };

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailRef.current.value = e.target.value;
    emailRef.current.style.color = defaultColor;
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    passwordRef.current.value = e.target.value;
    passwordRef.current.style.color = defaultColor;
  };

  return (
    <div className='login-card'>
      <div className='login-main'>
        <div className='logo'>
          <img src={LogoImg} alt='Logo' />
        </div>
        <div className='login-hello accent'>Добро пожаловать в Локацию</div>
        <div className='login-text'>Войдите, чтобы продолжить</div>
        <div className='login-input'>
          <input placeholder='Email' type='email' ref={emailRef} onChange={changeEmailHandler} />
        </div>
        <div className='login-input'>
          <input placeholder='Пароль' type='text' ref={passwordRef} onChange={changePasswordHandler} />
        </div>

        <a className='login-forgot' href='/forgot-password'>
          Забыли пароль?
        </a>
        {/*create a tag*/}
        <div className='login-button' onClick={LoginHandler}>
          <p>Войти</p>
        </div>
        <p className='login-google'>или войти с помощью</p>
        <div className='login-image' onClick={GoogleHandler}>
          <img src={GoogleImg} alt='Google' />
        </div>
        <div className='login-registration'>
          <p>Нет аккаунта?</p>
          <a href='/registration' className='accent'>
            Зарегистрироваться
          </a>
        </div>
      </div>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
};
