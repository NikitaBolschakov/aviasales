import { SET_SEARCH_ID, FETCH_TICKETS_START, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_ERROR } from '../constants';

const initialState = {
  searchId: null,
  tickets: [],
  loading: false,
  error: null,
  stop: false,
};

const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ID: // id получен
      return { ...state, searchId: action.payload };
    case FETCH_TICKETS_START: // старт запроса
      return { ...state, loading: true, error: null };
    case FETCH_TICKETS_SUCCESS: // данные получены
      return {
        ...state,
        tickets: [...state.tickets, ...action.payload.tickets],
        stop: action.payload.stop,
        loading: !action.payload.stop,
      };
    case FETCH_TICKETS_ERROR: // ошибка при получении данных
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ticketsReducer;
