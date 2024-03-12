import { useState, useEffect, useContext, createContext } from "react";
import authenticateApiCall from "./Helpers/authenticateApiCall";

// Styles import
import styles from "../styles/searchComponent.module.scss";

// Context provider imports
import { FoodsStateContext } from "./FoodApp";
import { CountContext } from "./FoodApp";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { visibleFoods, setVisibleFoods } = useContext(FoodsStateContext);
  const { loadedCount, setLoadedCount, originalCount, setOriginalCount } =
    useContext(CountContext);

  useEffect(() => {
    // Debounce function to limit API calls
    const debounce = (func, delay) => {
      let timeoutId;
      return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };

    const fetchFood = async () => {
      try {
        if (!searchTerm) {
          // Clear foods if search term is empty
          setVisibleFoods([]);
          return;
        }
        // Using spooinacular api
        // const response = await authenticateApiCall(`query=${searchTerm}`);
        // const data = await response.json();
        // let results = data.results;

        // For offline mode if API is not available
        const { default: data } = await import(
          "../data/offlineFoodListData.json"
        );
        let results = data.results;
        results = results.filter((item) =>
          item.title.toLowerCase().includes(searchTerm)
        );

        setOriginalCount(results.length);
        setVisibleFoods(results.slice(0, loadedCount)); // Initially load 4 items
      } catch (error) {
        console.error("Error fetching food:", error);
        // Optionally handle errors here
      }
    };

    // Debounce the fetchFood function to limit API calls
    const debouncedFetchFood = debounce(fetchFood, 500);
    debouncedFetchFood(); // Initial fetch on component mount

    return () => {
      // Cleanup function to clear the timeout
      clearTimeout(debouncedFetchFood);
    };
  }, [searchTerm, visibleFoods, loadedCount]);

  return (
    <>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search for food and recipes..."
        />
      </form>
    </>
  );
};

export default SearchComponent;
