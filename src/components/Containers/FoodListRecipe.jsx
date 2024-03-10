// Styles import
import styles from "../../styles/foodListRecipe.module.scss";

const FoodListRecipe = ({ children }) => {
  return <div className={styles.two_col_wrapper}>{children}</div>;
};

export default FoodListRecipe;
