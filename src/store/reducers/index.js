import { combineReducers } from 'redux';
import filterReducer from './filter';
import sortReducer from './sort';

// объединяем несколько редьюсеров в один корневой
const rootReducer = combineReducers({
  filter: filterReducer,  // Состояние фильтров
  sort: sortReducer,      // Состояние сортировки
});

export default rootReducer;