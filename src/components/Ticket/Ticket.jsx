import styles from './Ticket.module.scss';
import { formatTime, formatDuration, formatStopsText } from '../../utils/helpers';

const Ticket = ({ ticket }) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <div className={styles.price}>{ticket.price} ₽</div>
        <img className={styles.airlineLogo} src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier} />
      </div>

      {ticket.segments.map((segment, i) => (
        <div key={i} className={styles.segment}>
          <div className={styles.segmentRoute}>
            <span className={styles.segmentTitle}>
              {segment.origin} - {segment.destination}
            </span>
            <span className={styles.segmentTime}>{formatTime(segment.date, segment.duration)}</span>
          </div>

          <div className={styles.segmentDuration}>
            <span className={styles.segmentTitle}>В пути</span>
            <span className={styles.segmentTime}>{formatDuration(segment.duration)}</span>
          </div>

          <div className={styles.segmentStops}>
            <span className={styles.segmentTitle}>{formatStopsText(segment.stops.length)}</span>
            <span className={styles.segmentStopsAirports}>{segment.stops.join(', ')}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ticket;
