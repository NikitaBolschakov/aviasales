import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../store/actions/sort';
import styles from './SortTabs.module.scss';

const SortTabs = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.sort.sortBy); // Текущая сортировка

  // Обработчик клика по кнопке
  const handleSort = (type) => {
    dispatch(setSort(type)); // Вызываем экшен с типом сортировки
  };

  return (
    <div className={styles.sortTabs}>
      <button
        className={`${styles.tab} ${sortBy === 'cheapest' ? styles.active : ''}`}
        onClick={() => handleSort('cheapest')} // Передаем тип сортировки
      >
        Самый дешевый
      </button>
      <button
        className={`${styles.tab} ${sortBy === 'fastest' ? styles.active : ''}`}
        onClick={() => handleSort('fastest')}
      >
        Самый быстрый
      </button>
      <button
        className={`${styles.tab} ${sortBy === 'optimal' ? styles.active : ''}`}
        onClick={() => handleSort('optimal')}
      >
        Оптимальный
      </button>
    </div>
  );
};

export default SortTabs;
