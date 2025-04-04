import {
  SET_SEARCH_ID,
  FETCH_TICKETS_START,
  FETCH_FIRST_BATCH_SUCCESS,
  FETCH_TICKETS_SUCCESS,
  FETCH_NEXT_BATCH_SUCCESS,
  FETCH_TICKETS_ERROR,
} from '../constants';
import { getSearchId, getTicketsBatch } from '../../utils/api';

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TICKETS_START }); // Начинаем загрузку

    try {
      // Получаем searchId
      const searchId = await getSearchId();
      dispatch({ type: SET_SEARCH_ID, payload: searchId }); // сохраняем его в store

      const firstBatch = await getTicketsBatch(searchId); // Получаем первую пачку
      const allTickets = [...firstBatch.tickets]; // Массив для хранения всех билетов
      dispatch({
        type: FETCH_FIRST_BATCH_SUCCESS, // сохраняем первую пачку билетов
        payload: firstBatch.tickets,
      });

      // Фоновая подгрузка остальных билетов
      let stop = firstBatch.stop;
      while (!stop) {
        try {
          const batch = await getTicketsBatch(searchId); // Получаем следующую пачку
          console.log('batch', batch);

          allTickets.push(...batch.tickets); // Добавляем новые билеты в общий массив

          dispatch({
            type: FETCH_NEXT_BATCH_SUCCESS,
            payload: batch.tickets,
          });

          stop = batch.stop;
          console.log('stop', stop);
        } catch (error) {
          console.error('Error fetching next batch:', error.message);
        }
      }

      dispatch({
        type: FETCH_TICKETS_SUCCESS, // После завершения загрузки всех билетов сохраняем их в store
        payload: allTickets,
      });
    } catch (error) {
      dispatch({ type: FETCH_TICKETS_ERROR, payload: error.message });
    }
  };
};
