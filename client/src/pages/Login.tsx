import React, { useRef } from 'react';
import './Login.css';
import GoogleImg from '../images/Google.svg';
import LogoImg from '../images/Logo.svg';
import { validateEmail } from '../utils/validation';
import { IUserLogin, useLoginMutation } from '../store/api/UserApi';

export const Login = () => {
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [Login] = useLoginMutation();
  const defaultColor = 'black';

  const GoogleHandler = () => {
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL, '_self');
  };

  const LogoutHandler = () => {
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL_LOGOUT, '_self');
  };

  const LoginHandler = () => {
    if (!validateEmail(emailRef.current.value)) {
      emailRef.current.style.color = 'red';
    } else if (passwordRef.current.value.length < 6) {
      passwordRef.current.style.color = 'red';
    } else {
      const userDto: IUserLogin = { password: passwordRef.current.value, email: emailRef.current.value };
      Login(userDto);
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
    <div className='card'>
      <div className='logo'>
        <img src={LogoImg} alt='Logo' />
      </div>
      <div className='title accent'>Добро пожаловать в Локацию</div>
      <div className='text'>Войдите, чтобы продолжить</div>
      <div className='input'>
        <input placeholder='Email' type='email' ref={emailRef} onChange={changeEmailHandler} />
      </div>
      <div className='input'>
        <input placeholder='Пароль' type='text' ref={passwordRef} onChange={changePasswordHandler} />
      </div>

      <a className='forgot' href='/forgot-password'>
        Забыли пароль?
      </a>
      {/*create a tag//////////////////////////////////*/}

      <button className='btn' onClick={LoginHandler}>
        Войти
      </button>
      <p className='google'>или войти с помощью</p>
      <div className='image' onClick={GoogleHandler}>
        <img src={GoogleImg} alt='Google' />
      </div>
      <div className='login-registration'>
        <p>Нет аккаунта?</p>
        <a href='/registration' className='accent'>
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};
