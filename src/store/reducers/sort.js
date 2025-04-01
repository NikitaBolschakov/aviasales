import { SET_SORT } from '../constants';

// Начальное состояние
const initialState = {
  sortBy: 'cheapest', // По умолчанию сортируем по цене
};

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT:
      return {
        ...state,
        sortBy: action.payload, // Обновляем sortBy
      };

    default:
      return state;
  }
};

export default sortReducer;
