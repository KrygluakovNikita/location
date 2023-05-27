import { Sidebar } from '../components/Sidebar';
import './EquipmentsPage.css';
import { useGetEquipmentsQuery } from '../store/api/EquipmentApi';
import { EquipmentCard } from '../components/EquipmentCard';

export const EquipmentsPage = () => {
  const { data: equipments, isLoading } = useGetEquipmentsQuery();

  return (
    <>
      <Sidebar isEquipment={true} isFeed={false} isProfile={false} />
      <div className='main'>
        {equipments?.length ? (
          <div className='posts'>{!isLoading && equipments?.map(equipment => <EquipmentCard key={equipment.equipmentId} {...equipment} />)}</div>
        ) : (
          <div className='center-text'>
            <p>Список пуст</p>
          </div>
        )}
      </div>
    </>
  );
};
