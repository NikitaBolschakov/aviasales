import { TOGGLE_ALL_FILTERS, TOGGLE_FILTER } from '../constants';

// Начальное состояние, по умолчанию все галочки включены
const initialState = {
  filters: {
    all: true,
    noStops: true,
    oneStop: true,
    twoStops: true,
  },
};

// Редьюсер
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ALL_FILTERS: {
      const newValue = !state.filters.all; // state.filters.all = false

      return {
        ...state, // остальной state
        filters: {
          all: newValue, // false
          noStops: newValue, // Все фильтры тоже folse
          oneStop: newValue,
          twoStops: newValue,
        },
      };
    }

    // переключение одного фильтра
    case TOGGLE_FILTER: {
  
      const updatedFilters = {
        ...state.filters,
        [action.payload]: !state.filters[action.payload], // Инвертируем значение
      };

      // Если сняли любую галочку, снимаем "Все"
      if (!updatedFilters[action.payload] && updatedFilters.all) {
        updatedFilters.all = false;
      }

      // Если все галочки включены, включаем "Все"
      const allFiltersOn = ['noStops', 'oneStop', 'twoStops'].every((key) => updatedFilters[key]);
      if (allFiltersOn) {
        updatedFilters.all = true;
      }

      return {
        ...state,
        filters: updatedFilters, 
      };
    }

    // Если экшен не подходит, возвращаем старый state
    default:
      return state;
  }
};

export default filterReducer;
