import styles from './App.module.scss';
import Filter from './components/Filter/Filter';
import SortTabs from './components/SortTabs/SortTabs';
import TicketList from './components/TicketList/TicketList';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src="../images/LogoAvia.svg" alt="Aviasales" className={styles.logo} />
      </header>

      <aside className={styles.sidebar}>
        <Filter />
      </aside>
      <main className={styles.main}>
        <section className={styles.content}>
          <SortTabs />
          <TicketList />
        </section>
      </main>
    </div>
  );
}

export default App;
