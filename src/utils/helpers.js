// функция для форматирования времени перелета
export function formatTime(departureDate, duration) {
  const departure = new Date(departureDate);
  const arrival = new Date(departure.getTime() + duration * 60000);

  return `${departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${arrival.toLocaleTimeString(
    [],
    { hour: '2-digit', minute: '2-digit' }
  )}`;
}

// функция для форматирования длительности
export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
}

// функция для текста о пересадках
export function formatStopsText(stopsCount) {
  if (stopsCount === 0) return 'Без пересадок';
  if (stopsCount === 1) return '1 пересадка';
  return `${stopsCount} пересадки`;
}
