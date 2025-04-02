import { SET_SEARCH_ID, FETCH_TICKETS_START, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_ERROR } from '../constants';
import { getSearchId, getAllTickets } from '../../utils/api';

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TICKETS_START });

    try {
      // 1. Получаем searchId
      const searchId = await getSearchId();
      dispatch({ type: SET_SEARCH_ID, payload: searchId });

      // 2. Получаем все билеты с колбеком для сохранения пачек
      await getAllTickets(searchId, ({ tickets, stop }) => {
        dispatch({
          type: FETCH_TICKETS_SUCCESS,
          payload: { tickets, stop },
        });
      });
    } catch (error) {
      dispatch({
        type: FETCH_TICKETS_ERROR,
        payload: error.message,
      });
    }
  };
};
