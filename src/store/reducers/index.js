import { combineReducers } from 'redux';
import filterReducer from './filter';
import sortReducer from './sort';
import ticketsReducer from './tickets';

// объединяем несколько редьюсеров в один корневой
const rootReducer = combineReducers({
  filter: filterReducer, // Состояние фильтров
  sort: sortReducer, // Состояние сортировки
  tickets: ticketsReducer, // Состояние билетов
});

export default rootReducer;
