import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets } from '../../store/actions/tickets';
import styles from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket';
import { nanoid } from 'nanoid';

const TicketList = () => {
  const dispatch = useDispatch();
  const { firstTickets, tickets, loading, stop, totalCount } = useSelector((state) => state.tickets);

  const filters = useSelector((state) => state.filter.filters); // текущие значения фильтров
  const sortBy = useSelector((state) => state.sort.sortBy); // текущий способ сортировки из store

  const [visibleCount, setVisibleCount] = useState(5);

  // загрузка билетов при монтировании
  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  // Рассчитываем прогресс загрузки (от 0 до 100)
  const progress = tickets.length > 0 ? Math.min(100, Math.round((tickets.length / totalCount) * 100)) : 0;

  // Если загрузка идет, показываем только первые билеты
  const displayTickets = loading ? firstTickets : tickets;

  // Фильтрация показываемых билетов
  const filteredTickets = displayTickets.filter((ticket) => {
    if (filters.all) return true;
    const stopsCount = ticket.segments[0].stops.length;
    return (
      (filters.noStops && stopsCount === 0) ||
      (filters.oneStop && stopsCount === 1) ||
      (filters.twoStops && stopsCount === 2) ||
      (filters.threeStops && stopsCount === 3)
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
    return 0; // Если сортировка не выбрана - оставляем исходный порядок
  });

  // Видимые билеты после фильтрации и сортировки
  const visibleTickets = sortedTickets.slice(0, visibleCount);

  // Функция для загрузки дополнительных билетов
  const loadMoreTickets = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  if (loading && !stop) return <div className={styles.loading}>Загрузка билетов...</div>;
  if (visibleTickets.length === 0 && !loading)
    return <div className={styles.loading}>Рейсов, подходящих под заданные фильтры, не найдено</div>;

  return (
    <div>
      {/* Отображаем только видимые билеты */}
      {visibleTickets.map((ticket) => (
        <Ticket key={nanoid()} ticket={ticket} />
      ))}

      {/* Кнопка "Показать еще" */}
      {visibleTickets.length < sortedTickets.length && (
        <>
          <button className={styles.loadMoreButton} onClick={loadMoreTickets} disabled={loading}>
            {loading ? 'Загрузка...' : 'Показать еще 5 билетов'}
          </button>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            <div className={styles.progressText}>Загружено {progress}% билетов</div>
          </div>
        </>
      )}

      {/* когда все билеты загружены */}
      {stop && visibleTickets.length === sortedTickets.length && (
        <div className={styles.endMessage}>Все билеты показаны</div>
      )}
    </div>
  );
};

export default TicketList;
