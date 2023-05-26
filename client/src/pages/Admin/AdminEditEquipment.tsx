import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import styles from './AdminEditEquipment.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import { EquipmentDto, useChangeEquipmentMutation, useGetEquipmentByIdQuery } from '../../store/api/EquipmentApi';

export const AdminEditEquipment = () => {
  const navigate = useNavigate();
  const { equipmentId } = useParams();
  const { data: equipment } = useGetEquipmentByIdQuery(equipmentId!);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [changeEquipment] = useChangeEquipmentMutation();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const changeEquipmentHandler = async () => {
    if (title && description && count && equipmentId) {
      await changeEquipment({ title, description, count: +count, price, equipmentId })
        .unwrap()
        .then((res: EquipmentDto) => {
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
    setCount(0);
    setPrice(0);
  };

  useEffect(() => {
    console.log('equipment');
    console.log(equipment);

    if (equipment) {
      setTitle(equipment.title);
      setDescription(equipment.description);
      setCount(+equipment.count ?? 0);
      setPrice(+equipment.price);
    }
  }, [equipment]);

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
                <input placeholder='Количетсво оборудования' type='number' value={count} onChange={e => setCount(+e.target.value)} />
              </div>
              <div className={styles.addInput}>
                <input placeholder='Цена оборудования за час' type='number' value={price} onChange={e => setPrice(+e.target.value)} />
              </div>
              <div className={styles.profileGenerateQRBtnContainer}>
                <button
                  className={title && description && count ? styles.profileGenerateQRBtn : styles.profileGenerateQRBtnContainerDisabled}
                  onClick={changeEquipmentHandler}>
                  <p className={styles.profileGenerateQRBtnText}>Изменить оборудование</p>
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
