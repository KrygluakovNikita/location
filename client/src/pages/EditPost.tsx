import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from '../components/ArrowLeft';
import { Sidebar } from '../components/Sidebar';
import { useAppSelector } from '../hooks/redux';
import { UserRole } from '../store/reducers/UserSlice';
import { useDeletePostMutation, useGetPostQuery } from '../store/api/PostApi';
import './EditPost.css';
import GoodCheckIcon from '../images/GoodCheck.svg';
import TrashIcon from '../images/Trash.svg';
import ImageIcon from '../images/Image.svg';
import { IPostUploadImage, IUploadPost, useUpdatePhotoMutation, useUpdatePostMutation } from '../store/api/PostApi';
import { PostDto } from '../store/reducers/PostSlice';

export const EditPost = () => {
  const { postId } = useParams();
  const user = useAppSelector(state => state.user);
  const [post, setPost] = useState<PostDto | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | string>(ImageIcon);
  const [uploadPostImage] = useUpdatePhotoMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const { data, isSuccess } = useGetPostQuery(postId!);
  const [postObject, setPostObject] = useState<IUploadPost>({ postId: '', title: '', description: '', gameDate: new Date(Date.now()), location: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setPostObject(post);
      setSelectedImage(process.env.REACT_APP_SERVER_ENDPOINT + '/' + post.photo);
    }
  }, [post]);

  useEffect(() => {
    if (data) setPost(data);
  }, [data, isSuccess]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  const updateHandler = async (e: any) => {
    e.preventDefault();
    const userDto: IUploadPost = postObject;
    const data = await updatePost(userDto).unwrap();
    if (selectedImage && typeof selectedImage !== 'string') {
      const photo = new FormData();
      photo.append('photo', selectedImage);
      const dto: IPostUploadImage = { postId: data.postId, photo };
      await uploadPostImage(dto);
    }

    navigate('/');
  };

  const deleteHandler = async (e: any) => {
    e.preventDefault();
    await deletePost(postId!)
      .unwrap()
      .then(() => {
        navigate('/');
      });
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
          <div className='post-two-buttons'>
            {post ? (
              <>
                <div className='add-button'>
                  <button onClick={updateHandler}>
                    <img src={GoodCheckIcon} alt='' />
                    Обновить
                  </button>
                </div>
                <div className='delete-button'>
                  <button className='delete-button' onClick={deleteHandler}>
                    <img src={TrashIcon} alt='' />
                    Удалить
                  </button>
                </div>
              </>
            ) : null}
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
                    const dto: IUploadPost = { ...prevState, gameDate: new Date(e.target.value) };
                    return dto;
                  })
                }
                value={new Date(postObject.gameDate).toISOString().substring(0, 16)}
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
