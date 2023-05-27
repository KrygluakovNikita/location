import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import styles from './AdminAddEquipment.module.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { EquipmentDto, IEquipmentUploadImage, useAddEquipmentMutation, useUpdateEquipmentPhotoMutation } from '../../store/api/EquipmentApi';
import ImageIcon from '../../images/Image.svg';

export const AdminAddEquipment = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addEquipment] = useAddEquipmentMutation();
  const [updateEquipmentPhoto] = useUpdateEquipmentPhotoMutation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [count, setCount] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [descriptionAboutStaff, setDescriptionAboutStaff] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | string>(ImageIcon);

  const createGame = async () => {
    if (title && description && count && descriptionAboutStaff) {
      await addEquipment({ title, description, count: +count, price, descriptionAboutStaff })
        .unwrap()
        .then(async (res: EquipmentDto) => {
          if (selectedImage) {
            const photo = new FormData();
            photo.append('photo', selectedImage);
            const dto: IEquipmentUploadImage = { equipmentId: res.equipmentId, photo };
            await updateEquipmentPhoto(dto);
          }
          setIsOpen(true);
        })
        .catch(err => alert(err.data.message));
    }
  };

  const onClickModal = (state: boolean) => {
    setIsOpen(state);
    navigate(`/profile`);
    setTitle('');
    setDescription('');
    setDescriptionAboutStaff('');
    setCount('');
    setPrice(0);
  };
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };
  return (
    <div className=''>
      <Sidebar isProfile={true} />
      <div className={styles.mainContainer}>
        <div className={styles.secondContainer}>
          <div className={styles.sideContainer}></div>
          <div className={styles.cartContainer}>
            {isOpen ? <Modal setIsOpen={onClickModal} title='Уведомление' text='Ваше оборудование успешно создано' /> : null}

            <div className={styles.profileScanContainer}>
              <div className={styles.addContainer}></div>
              <div className={styles.addInput}>
                <input placeholder='Название оборудования' value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className={styles.addInput}>
                <input placeholder='Описание' value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <div className={styles.addInput}>
                <input placeholder='Описание оборудования' value={descriptionAboutStaff} onChange={e => setDescriptionAboutStaff(e.target.value)} />
              </div>
              <div className={styles.addInput}>
                <input placeholder='Количетсво оборудования' type='number' value={count} onChange={e => setCount(e.target.value)} />
              </div>
              <div className={styles.addInput}>
                <input placeholder='Цена оборудования за час' type='number' value={price} onChange={e => setPrice(+e.target.value ?? '')} />
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
                      <span className='underline'>Изменить фото оборудования</span>
                      <input type='file' className='feedback__file' onChange={changeHandler} />
                    </label>
                  </>
                )}
              </div>
              <div className={styles.profileGenerateQRBtnContainer}>
                <button
                  className={title && description && count ? styles.profileGenerateQRBtn : styles.profileGenerateQRBtnContainerDisabled}
                  onClick={createGame}>
                  <p className={styles.profileGenerateQRBtnText}>Создать оборудование</p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.sideContainer}></div>
        </div>
      </div>
    </div>
  );
};
