import { useState, useEffect } from "react";
import authenticateApiCall from "./Helpers/authenticateApiCall";
import styles from "../styles/headerNav.module.scss";
import imgHeaderBg from "../assets/images/header-bg.jpeg";

const HeaderNav = () => {
  // Define state to store the response data
  const [trivia, setTrivia] = useState("");

  // Use useEffect to fetch the data when the component mounts
  useEffect(() => {
    async function fetchTrivia() {
      try {
        const response = await authenticateApiCall(
          "",
          import.meta.env.VITE_SPOONACULAR_API_FOOD_TRIVIA_URL
        );
        const data = await response.json();
        // Update state with the fetched trivia
        setTrivia(data.text);
      } catch (error) {
        console.error("Error fetching trivia:", error);
      }
    }
    fetchTrivia(); // Call the fetchTrivia function
  }, []); // Empty dependency array to only fetch data once when the component mounts

  return (
    <header className={styles.header}>
      <blockquote>
        {trivia ? (
          <div>{`"${trivia}"`}</div>
        ) : (
          <div>"Food API trivia and recipe isn't available at the moment"</div>
        )}
      </blockquote>

      <div className={styles.header_overlay}></div>
      <img
        src={imgHeaderBg}
        alt="A close up of pizza"
        className={styles.header_background}
      />
    </header>
  );
};

export default HeaderNav;
