import styles from './Ticket.module.scss';

const Ticket = ({ ticket }) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <div className={styles.price}>{ticket.price} ₽</div>
        <img 
          src={`/airlines/${ticket.carrier}.png`} 
          alt={ticket.carrier} 
          className={styles.airlineLogo}
        />
      </div>
      
      <div className={styles.segments}>
        <div className={styles.segment}>
          <div className={styles.segmentRoute}>
            <span className={styles.segmentTitle}>
              {ticket.origin} - {ticket.destination}
            </span>
            <span className={styles.segmentTime}>
              {ticket.departure_time} - {ticket.arrival_time}
            </span>
          </div>
          
          <div className={styles.segmentDuration}>
            <span className={styles.segmentTitle}>В пути</span>
            <span className={styles.segmentTime}>
              {Math.floor(ticket.duration / 60)}ч {ticket.duration % 60}м
            </span>
          </div>
          
          <div className={styles.segmentStops}>
            <span className={styles.segmentTitle}>
              {ticket.stops === 0 
                ? 'Без пересадок' 
                : `${ticket.stops} пересадки`}
            </span>
            <span className={styles.segmentStopsAirports}>
              {ticket.stops_airports?.join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;