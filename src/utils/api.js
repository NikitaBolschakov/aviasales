const BASE_URL = 'https://aviasales-test-api.kata.academy';

export const getSearchId = async () => {
  const response = await fetch(`${BASE_URL}/search`);
  if (!response.ok) {
    throw new Error(`Ошибка при получении searchId: ${response.status}`);
  }
  const { searchId } = await response.json();
  return searchId;
};

/* export const getTicketsBatch = async (searchId) => {
  try {
    const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return getTicketsBatch(searchId);
  }
}; */

export const getTicketsBatch = async (searchId) => {
  const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`);
  if (!response.ok) throw new Error('Ошибка загрузки');
  return response.json();
};

export const getAllTickets = async (searchId, onBatchReceived) => {
  let allTickets = [];
  let stop = false;

  while (!stop) {
    const { tickets, stop: serverStop } = await getTicketsBatch(searchId);
    allTickets = [...allTickets, ...tickets];
    stop = serverStop;

    // Вызываем колбек если передан
    if (onBatchReceived) {
      onBatchReceived({ tickets, stop });
    }
  }

  return allTickets;
};
