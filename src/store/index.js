import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

// Создаем Store:
const store = createStore(
  rootReducer,            // Корневой редьюсер
  applyMiddleware(thunk)  // Подключаем thunk для асинхронных экшенов
);

export default store;