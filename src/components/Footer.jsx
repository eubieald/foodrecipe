import { useState, useEffect } from "react";

// Styles import
import styles from "../styles/footer.module.scss";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const response = await fetch(
            import.meta.env.VITE_DYNAMIC_API_YEAR
        );
        const data = await response.json();
        const datetime = new Date(data.datetime);
        setYear(datetime.getFullYear());
        if (!response.ok) {
          throw new Error("Failed to fetch year");
        }
        // return data.year;
      } catch (error) {
        console.error("Error fetching year:", error);
        return null;
      }
    };

    fetchYear();
  }, []);

  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; {year} All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;

