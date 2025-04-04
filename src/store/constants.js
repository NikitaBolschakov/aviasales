// Типы экшенов для фильтров
export const TOGGLE_ALL_FILTERS = 'TOGGLE_ALL_FILTERS';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

// Типы экшенов для сортировки
export const SET_SORT = 'SET_SORT';

// Типы экшенов для запроса билетов
export const SET_SEARCH_ID = 'SET_SEARCH_ID'; // id получен
export const FETCH_TICKETS_START = 'FETCH_TICKETS_START'; // старт запроса
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS'; // данные получены
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR'; // ошибка при получении данных
export const FETCH_FIRST_BATCH_SUCCESS = 'FETCH_FIRST_BATCH_SUCCESS'; // первая пачка получена
export const FETCH_NEXT_BATCH_SUCCESS = 'FETCH_NEXT_BATCH_SUCCESS'; // следующая пачка получена
