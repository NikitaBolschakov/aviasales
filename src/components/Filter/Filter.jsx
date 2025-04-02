import { useDispatch, useSelector } from 'react-redux';
import { toggleAllFilters, toggleFilter } from '../../store/actions/filter';
import styles from './Filter.module.scss';

const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter.filters); // Достаем текущие фильтры из Store

  // Обработчик для "Все"
  const handleToggleAll = () => {
    dispatch(toggleAllFilters()); // Вызываем экшен
  };

  // Обработчик для одного фильтра
  const handleToggleFilter = (filterName) => {
    dispatch(toggleFilter(filterName)); // Вызываем экшен с payload
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>Количество пересадок</h3>
      <div className={styles.filterGroup}>
        <label className={styles.filterItem}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.all} // Значение из Redux
            onChange={handleToggleAll} // При изменении вызываем экшен
          />
          <span>Все</span>
        </label>

        <label className={styles.filterItem}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.noStops}
            onChange={() => handleToggleFilter('noStops')} // Передаем название фильтра
          />
          <span>Без пересадок</span>
        </label>

        <label className={styles.filterItem}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.oneStop}
            onChange={() => handleToggleFilter('oneStop')}
          />
          <span>1 пересадка</span>
        </label>

        <label className={styles.filterItem}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.twoStops}
            onChange={() => handleToggleFilter('twoStops')}
          />
          <span>2 пересадки</span>
        </label>

        <label className={styles.filterItem}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={filters.threeStops}
            onChange={() => handleToggleFilter('threeStops')}
          />
          <span>3 пересадки</span>
        </label>
      </div>
    </div>
  );
};

export default Filter;
