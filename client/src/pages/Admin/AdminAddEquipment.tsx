import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import styles from './AdminAddEquipment.module.css';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { EquipmentDto, useAddEquipmentMutation } from '../../store/api/EquipmentApi';

export const AdminAddEquipment = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addEquipment] = useAddEquipmentMutation();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [count, setCount] = useState<string>('');

  const createGame = async () => {
    if (title && description && count) {
      await addEquipment({ title, description, count: +count })
        .unwrap()
        .then((res: EquipmentDto) => {
          console.log('res');
          console.log('res');
          console.log(res);

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
    setCount('');
  };

  // const getMoreEquipmentHandler = async () => {
  //   const result = await getEquipmentByDate({ date: new Date(playDate!) }).unwrap();
  //   console.log('result');
  //   console.log('result');
  //   console.log(result);

  //   setEquipments(result);
  // };

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
                <input placeholder='Количетсво оборудования' value={count} onChange={e => setCount(e.target.value)} />
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
