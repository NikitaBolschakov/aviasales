import { useState } from 'react';
import styles from './TicketList.module.scss';
import Ticket from '../Ticket/Ticket';
import { mockTickets } from '../../mocks/tickets.js';

const TicketList = () => {
  const [visibleTickets, setVisibleTickets] = useState(5);
  
  const loadMoreTickets = () => {
    setVisibleTickets(prev => prev + 5);
  };

  return (
    <div className={styles.ticketList}>
      {mockTickets.slice(0, visibleTickets).map(ticket => (
        <Ticket 
          key={ticket.id}
          ticket={ticket}
        />
      ))}
      
      {visibleTickets < mockTickets.length && (
        <button 
          className={styles.loadMoreButton}
          onClick={loadMoreTickets}
        >
          Показать еще 5 билетов
        </button>
      )}
    </div>
  );
};

export default TicketList;