import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { StatChartTypeEnum, useGetGamesDiagramStatMutation } from '../../store/api/GameApi';
import { GameDto } from '../../store/reducers/UserSlice';
import styles from './AdminProfileDiagram.module.css';
import moment, { Moment } from 'moment';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const AdminProfileDiagram = () => {
  const [games, setGames] = useState<GameDto[] | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [type, setType] = useState<StatChartTypeEnum>(StatChartTypeEnum.MONTH);
  const [getDiagramStat, { isLoading }] = useGetGamesDiagramStatMutation();

  useEffect(() => {
    if (startDate && type) {
      clickHandler();
    }
  }, [startDate, type]);

  const clickHandler = async () => {
    if (startDate && type) {
      await getDiagramStat({ startDate, type })
        .unwrap()
        .then(data => {
          console.log(data);
          if (data.games.length) {
            setGames(data.games);
          } else {
            setGames([]);
          }
        })
        .catch(err => alert(err));
    }
  };

  const getDatesForMonth = (start: Moment, end: Moment) => {
    const startD = moment(start);
    const endD = moment(end);
    const res = [];
    for (let i = 0; i <= 32; i++) {
      if (endD < startD) {
        break;
      }
      res.unshift(endD.toString().substring(0, 10));
      endD.subtract(1, 'days');
    }
    return res;
  };
  const getValuesForMonth = (gameDtos: GameDto[] | null, start: Moment, end: Moment) => {
    const startD = moment(start);
    const endD = moment(end);
    const map = new Map();
    for (let i = 0; i <= 32; i++) {
      if (startD > endD) {
        break;
      }
      map.set(startD.toString().substring(0, 10), 0);
      startD.add(1, 'days');
    }
    gameDtos?.forEach(game => {
      const date = moment(game.date).toString().substring(0, 10);
      if (map.has(date)) {
        map.set(date, map.get(date) + 1);
      }
    });
    return [...(map.values() as any)];
  };

  const getDatesForYear = (start: Moment, end: Moment) => {
    const startD = moment(moment(start).set('D', 1));
    const endD = moment(moment(end).set('D', 1));
    const res = [];
    for (let i = 0; i <= 32; i++) {
      if (endD < startD) {
        break;
      }
      res.unshift(endD.toString().substring(4, 7));
      endD.subtract(1, 'months');
    }
    return res;
  };
  const getValuesForYear = (gameDtos: GameDto[] | null, start: Moment, end: Moment) => {
    const startD = moment(moment(start).set('D', 1));
    const endD = moment(moment(end).set('D', 1));

    const map = new Map();
    for (let i = 0; i <= 32; i++) {
      if (startD > endD) {
        break;
      }
      map.set(startD.format('YYYY-MM'), 0);
      startD.add(1, 'months');
    }

    gameDtos?.forEach(game => {
      const date = moment(moment(game.date).set('D', 1)).format('YYYY-MM');
      if (map.has(date)) {
        map.set(date, map.get(date) + 1);
      }
    });
    return [...(map.values() as any), 0];
  };

  const coinsData =
    type === StatChartTypeEnum.MONTH
      ? {
          labels: getDatesForMonth(moment(startDate), moment(startDate).add(1, 'months')),
          datasets: [
            {
              data: getValuesForMonth(games, moment(startDate), moment(startDate).add(1, 'months')),
              pointHitRadius: 20,
              pointRadius: 0,
            },
          ],
        }
      : {
          labels: getDatesForYear(moment(moment(startDate).set('D', 1)), moment(moment(startDate).set('D', 1)).add(1, 'years')),
          datasets: [
            {
              data: getValuesForYear(games, moment(moment(startDate).set('D', 1)), moment(moment(startDate).set('D', 1)).add(1, 'years')),
              pointHitRadius: 20,
              pointRadius: 0,
            },
          ],
        };

  return (
    <div>
      <Sidebar isProfile={true} />
      <div className={styles.wrapContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.inputsContainer}>
            <div className={styles.profileSelectMainContainer}>
              <select
                className={styles.selectContainer}
                onChange={event => {
                  setType(event.currentTarget.value as StatChartTypeEnum);
                }}
                defaultValue={StatChartTypeEnum.MONTH}>
                <option value={StatChartTypeEnum.MONTH}>Месяц</option>
                <option value={StatChartTypeEnum.YEAR}>Год</option>
              </select>
            </div>
            <div className={styles.pickDateContainer}>
              <p>Начало</p>
              <input
                className={styles.smallContainer}
                type='date'
                onChange={e => {
                  setStartDate(new Date(e.currentTarget.value));
                }}
                value={startDate?.toISOString().substring(0, 10) ?? ''}
                placeholder='Дата начала'
              />
            </div>
            {/* <div>
              <button className={styles.btnStatContainer} onClick={clickHandler}>
                <p className={styles.btnTextStat}>Создать</p>
              </button>
            </div> */}
          </div>
          <div className={styles.historyContainer}>
            {isLoading ? (
              <div>Loading...</div>
            ) : games?.length ? (
              <Line
                style={{ width: '100%', height: '100%' }}
                key={moment(startDate).toString()}
                options={{
                  elements: {
                    point: {
                      borderWidth: 0,
                      radius: 0,
                    },
                  },
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
                data={coinsData}
              />
            ) : (
              <p>Список пуст</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
