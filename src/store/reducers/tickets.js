import {
  SET_SEARCH_ID,
  FETCH_TICKETS_START,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_ERROR,
  FETCH_FIRST_BATCH_SUCCESS,
  FETCH_NEXT_BATCH_SUCCESS,
} from '../constants';

const initialState = {
  tickets: [], // Массив для хранения всех билетов
  firstTickets: [], // Первые билеты для быстрого показа
  loading: false,
  error: null,
  stop: false,
  totalCount: 10879, // Общее количество билетов
};

export const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FIRST_BATCH_SUCCESS:
      return {
        ...state,
        firstTickets: action.payload,
        tickets: action.payload,
        loading: false,
      };

    case FETCH_NEXT_BATCH_SUCCESS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload],
      };

    case FETCH_TICKETS_SUCCESS: // данные получены
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload.tickets],
        stop: action.payload.stop,
        loading: !action.payload.stop,
      };

    case SET_SEARCH_ID: // id получен
      return { ...state, searchId: action.payload };

    case FETCH_TICKETS_START: // старт запроса
      return { ...state, loading: true, error: null };

    case FETCH_TICKETS_ERROR: // ошибка при получении данных
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
