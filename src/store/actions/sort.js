import { SET_SORT } from '../constants';

// Экшен для установки типа сортировки
export const setSort = (sortType) => ({
  type: SET_SORT,
  payload: sortType, // 'cheapest', 'fastest', 'optimal'
});
