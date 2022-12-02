import { useState, useEffect } from 'react';
import UploadImage from '../components/UploadImage';
import defaultImage from '../images/default.png';
import LogoImg from '../images/Logo.svg';
import { IRegistration, useRegistrationMutation, useUpdatePhotoMutation } from '../store/api/UserApi';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/validation';
import { Terms } from '../components/Terms';

export const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [agree, setAgree] = useState(false);
  const [UpdatePhoto] = useUpdatePhotoMutation();
  const [registration, { isError, error }] = useRegistrationMutation();
  const [selectedImage, setSelectedImage] = useState<File | string>(defaultImage);
  const navigate = useNavigate();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  const RegistrationHandler = async () => {
    const userDto: IRegistration = { nickname, city, email, password };
    if (!validateEmail(email)) {
      setEmail('');
    } else if (password.length < 6) {
      setPassword('');
    } else {
      await registration(userDto);

      if (selectedImage !== defaultImage) {
        const photo = new FormData();
        photo.append('photo', selectedImage);
        await UpdatePhoto(photo);
      }

      navigate('/');
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);

  return (
    <div>
      <div className='card'>
        <div className='main'>
          <div className='logo'>
            <img src={LogoImg} alt='Logo' />
          </div>
          <div className='title accent'>Давайте начнём</div>
          <div className='text'>Создайте новый аккаунт</div>
          <UploadImage selectedImage={selectedImage} changeHandler={changeHandler} />

          <div className='input'>
            <input placeholder='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='input'>
            <input placeholder='Пароль' type='text' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='input'>
            <input placeholder='Никнейм' type='text' value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div className='input'>
            <input placeholder='Город' type='text' value={city} onChange={e => setCity(e.target.value)} />
          </div>

          <Terms setAgree={setAgree} />
          <button disabled={!nickname || !city || !agree || !email || !password} className='btn' onClick={RegistrationHandler}>
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
