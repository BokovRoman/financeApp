import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p className={styles.FooterText}>
        Copyright &copy; {year} All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;