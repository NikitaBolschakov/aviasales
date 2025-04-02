import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../store/actions/tickets';
import styles from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket';

const TicketList = () => {
  const dispatch = useDispatch();
  const { tickets, loading, error, stop } = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filter.filters); // текущие значения фильтров
  const sortBy = useSelector((state) => state.sort.sortBy); // текущий способ сортировки из store

  const [visibleCount, setVisibleCount] = useState(5);

  // загрузка билетов при монтировании
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  // Фильтрация билетов
  const filteredTickets = tickets.filter((ticket) => {
    // Если выбран фильтр "Все" пропускаем все билеты
    if (filters.all) return true;

    // Получаем количество пересадок в первом сегменте перелета
    const stopsCount = ticket.segments[0].stops.length;

    // Проверяем соответствие билета выбранным фильтрам:
    return (
      (filters.noStops && stopsCount === 0) || // Без пересадок
      (filters.oneStop && stopsCount === 1) || // 1 пересадка
      (filters.twoStops && stopsCount === 2) || // 2 пересадки
      (filters.threeStops && stopsCount === 3) // 3 пересадки
    );
  });

  // Сортировка билетов
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    // Сортировка по цене (от меньшей к большей)
    if (sortBy === 'cheapest') return a.price - b.price;

    // Сортировка по продолжительности (сумма времени туда и обратно)
    if (sortBy === 'fastest') {
      return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
    }

    // Сортировка по оптимальности (по сумме времени и стоимости)
    if (sortBy === 'optimal') {
      const optimalValueA = a.price + (a.segments[0].duration + a.segments[1].duration);
      const optimalValueB = b.price + (b.segments[0].duration + b.segments[1].duration);

      return optimalValueA - optimalValueB;
    }

    // Если сортировка не выбрана - оставляем исходный порядок
    return 0;
  });

  // Функция для загрузки дополнительных билетов
  const loadMoreTickets = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Увеличиваем счетчик на 5
  };

  // Берем необходимое количество билетов
  const visibleTickets = sortedTickets.slice(0, visibleCount);

  if (loading && !stop) return <div className={styles.loading}>Загрузка билетов...</div>;
  if (visibleTickets.length === 0)
    return <div className={styles.loading}>Рейсов, подходящих под заданные фильтры, не найдено</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {visibleTickets.map((ticket, index) => (
        <Ticket key={index} ticket={ticket} />
      ))}

      {/* Кнопка "Показать еще" */}
      {visibleTickets.length < sortedTickets.length && (
        <button className={styles.loadMoreButton} onClick={loadMoreTickets} disabled={loading}>
          {loading ? 'Загрузка...' : 'Показать еще 5 билетов'}
        </button>
      )}

      {/* когда все билеты загружены */}
      {stop && visibleTickets.length === sortedTickets.length && sortedTickets.length > 0 && (
        <div className={styles.endMessage}>Все билеты показаны</div>
      )}
    </div>
  );
};

export default TicketList;
