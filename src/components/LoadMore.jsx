import { useContext } from "react";

// styles import
import styles from "../styles/loadMore.module.scss";

// Context provider imports
import { FoodsStateContext } from "./FoodApp";
import { CountContext } from "./FoodApp";

const LoadMore = () => {
  const { visibleFoods, setVisibleFoods } = useContext(FoodsStateContext);
  const { loadedCount, setLoadedCount, originalCount, setOriginalCount } =
    useContext(CountContext);

  // Load more items when button is clicked
  const handleLoadMore = () => {
    const additionalItems = visibleFoods.slice(loadedCount, loadedCount + 4);
    setVisibleFoods([...visibleFoods, ...additionalItems]);
    setLoadedCount((loadedCount) => loadedCount + 4); // Increment loadedCount by 4
  };

  return (
    <div className={styles.container}>
      {visibleFoods.length > 0 && originalCount > loadedCount && (
        <button className={styles.button} onClick={handleLoadMore}>
          Load More...
        </button>
      )}
    </div>
  );
};

export default LoadMore;
