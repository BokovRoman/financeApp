import styles from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles.LogoContainer}>
        <img width={200} src="https://cdn5.vectorstock.com/i/thumb-large/13/09/logo-finance-vector-10371309.jpg" alt="logo" />
      </div>
    </header>
  );
};

export default Header;