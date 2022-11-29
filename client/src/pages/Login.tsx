import React from "react";
import "./Login.css";

export const Login = () => {
  const google = () => {
    window.open(process.env.REACT_APP_GOOGLE_OAUTH_URL, "_self");
  };
  const logout = () => {
    window.open("http://localhost:8000/api/oauth/logout", "_self");
  };

  return (
    <div className='login-card'>
      <div className='login-title'>Локация</div>
      <div className='login-hello accent'>Добро пожаловать в Локацию</div>
      <div className='login-text'>Войдите, чтобы продолжить</div>
      <div className='login-input'>
        <input placeholder='Email' />
      </div>
      <div className='login-input'>
        <input placeholder='Пароль' />
      </div>
      <div className='login-forgot'>Забыли пароль?</div>
      <div className='login-button'>
        <a onClick={() => {}}>Войти</a>
      </div>
      <p className='login-google'>или войти с помощью</p>
      {/* <img/> google*/}
      <div className='login-registration'>
        <p>Нет аккаунта?</p>
        <a href='#' className='accent'>
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};
