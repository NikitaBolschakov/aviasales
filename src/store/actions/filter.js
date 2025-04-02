import { TOGGLE_ALL_FILTERS, TOGGLE_FILTER } from '../constants';

// Экшен для переключения ВСЕХ фильтров
export const toggleAllFilters = () => ({
  type: TOGGLE_ALL_FILTERS,
});

// Экшен для переключения ОДНОГО фильтра
export const toggleFilter = (filterName) => ({
  type: TOGGLE_FILTER,
  payload: filterName, // название фильтра: 'noStops', 'oneStop' и т.д.
});
