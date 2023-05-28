import { useRef } from 'react';
import './Login.css';
import GoogleImg from '../images/Google.svg';
import LogoImg from '../images/Logo.svg';
import { validateEmail } from '../utils/validation';
import { IUserLogin, useLoginMutation } from '../store/api/UserApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { UserDto } from '../store/reducers/UserSlice';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const passwordRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [Login, { isError, error }] = useLoginMutation();
  const defaultColor = 'black';

  const GoogleHandler = () => {
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL, '_self');
  };

  const LoginHandler = async () => {
    if (!validateEmail(emailRef.current.value)) {
      alert('Почта не верная, исправьте её и попробуйте снова');
      emailRef.current.style.color = 'red';
    } else if (passwordRef.current.value.length < 6) {
      alert('Длина пароля не может быть меньше 6 символов');
      passwordRef.current.style.color = 'red';
    } else {
      const userDto: IUserLogin = { password: passwordRef.current.value, email: emailRef.current.value };
      await Login(userDto)
        .unwrap()
        .then((data: UserDto) => {
          navigate(`${data.role === 'admin' ? '/admin' : '/'}profile/`);
        })
        .catch(err => {
          alert(err.message);
        });
      if (isError) {
        const err = error as FetchBaseQueryError;
        if (err.status === 406) {
          emailRef.current.style.color = 'red';
        }
      }
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
        <input placeholder='Пароль' type='password' ref={passwordRef} onChange={changePasswordHandler} />
      </div>

      <a className='underline-end' href='/forgot-password'>
        Забыли пароль?
      </a>

      <button className='btn' onClick={LoginHandler} disabled={false}>
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
