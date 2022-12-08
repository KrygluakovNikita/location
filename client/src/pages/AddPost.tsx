import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '../components/ArrowLeft';
import { Sidebar } from '../components/Sidebar';
import { useAppSelector } from '../hooks/redux';
import { UserRole } from '../store/reducers/UserSlice';
import './AddPost.css';
import GoodCheckIcon from '../images/GoodCheck.svg';
import UploadImage from '../components/UploadImage';
import ImageIcon from '../images/Image.svg';
import { IPostUploadImage, IUploadPost, useUpdatePhotoMutation, useUploadPostMutation } from '../store/api/PostApi';

export const AddPost = () => {
  const user = useAppSelector(state => state.user);
  const [selectedImage, setSelectedImage] = useState<File | string>(ImageIcon);
  const [uploadPost] = useUploadPostMutation();
  const [uploadPostImage] = useUpdatePhotoMutation();

  const [postObject, setPostObject] = useState<IUploadPost>({ title: '', description: '', gameDate: new Date(Date.now()), location: '' });
  const navigate = useNavigate();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  const uploadHandler = async () => {
    const userDto: IUploadPost = postObject;
    const data = await uploadPost(userDto).unwrap();
    if (selectedImage) {
      const photo = new FormData();
      photo.append('photo', selectedImage);
      const dto: IPostUploadImage = { postId: data.postId, photo };
      await uploadPostImage(dto);
      navigate('/');
    }
  };

  if (user.role !== UserRole.ADMIN) {
    navigate('/');
  }

  return (
    <>
      <Sidebar isProfile={false} />
      <div className='main'>
        <div className='top-wrapper'>
          <ArrowLeft />
          <p className='add-text'>Создать событие</p>
          <div className='add-button'>
            <button onClick={uploadHandler}>
              <img src={GoodCheckIcon} alt='' />
              Сохранить
            </button>
          </div>
        </div>
        <div className='add-wrapper'>
          <div className='add-container'>
            <div className='add-input'>
              <input
                placeholder='Название игры'
                value={postObject.title}
                onChange={e =>
                  setPostObject(prevState => {
                    const dto: IUploadPost = { ...prevState, title: e.target.value };
                    return dto;
                  })
                }
              />
            </div>
            <div className='add-textarea'>
              <textarea
                placeholder='Описание'
                value={postObject.description}
                onChange={e =>
                  setPostObject(prevState => {
                    const dto: IUploadPost = { ...prevState, description: e.target.value };
                    return dto;
                  })
                }
              />
            </div>
            <div className='add-date'>
              <input
                type='datetime-local'
                onChange={e =>
                  setPostObject(prevState => {
                    console.log(e.target.value);

                    const dto: IUploadPost = { ...prevState, gameDate: new Date(e.target.value) };
                    return dto;
                  })
                }
              />
            </div>
            <div className='add-input'>
              <input
                placeholder='Адрес'
                value={postObject.location}
                onChange={e =>
                  setPostObject(prevState => {
                    const dto: IUploadPost = { ...prevState, location: e.target.value };
                    return dto;
                  })
                }
              />
            </div>
            <div className='add-upload-image'>
              {selectedImage === ImageIcon ? (
                <div className='upload-image'>
                  {selectedImage && (
                    <div>
                      <img
                        alt='Не найдена'
                        className='upload-img'
                        src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage as File)}
                      />
                    </div>
                  )}

                  <label className='feedback__label '>
                    <span className='underline'>Загрузить</span>
                    <input type='file' className='feedback__file' onChange={changeHandler} />
                  </label>
                </div>
              ) : (
                <>
                  <div className='add-post-image'>
                    <img
                      alt='Не найдена'
                      className='add-post-image'
                      src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage as File)}
                    />
                  </div>

                  <label className='feedback__label '>
                    <span className='underline'>Изменить фото события</span>
                    <input type='file' className='feedback__file' onChange={changeHandler} />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
