import Header from "./components/Header";
import TickersList from "./components/TickersList";
import Footer from "./components/Footer";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.Container}>
      <Header />
      <TickersList />
      <Footer />
    </div>
  );
}

export default App;
