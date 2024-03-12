import { createContext, useState } from "react";

// Components import
import SearchComponent from "./SearchComponent";
import FoodList from "./FoodList";
import RecipeDetails from "./RecipeDetails";
import HeaderNav from "./HeaderNav";
import Footer from "./Footer";

// Styles import
import styles from "../styles/app.scss";

// Container import
import FoodListRecipe from "./Containers/FoodListRecipe";

// Context provider declaration
const FoodsStateContext = createContext();
const CountContext = createContext();

const FoodApp = () => {
  const [visibleFoods, setVisibleFoods] = useState([]);
  const [loadedCount, setLoadedCount] = useState(4); // initial value is 4
  const [originalCount, setOriginalCount] = useState();
  const [activeFoodId, setActiveFoodId] = useState(null);

  return (
    // Wrap the components with context providers properly
    <FoodsStateContext.Provider
      value={{ visibleFoods: visibleFoods, setVisibleFoods: setVisibleFoods }}
    >
      <CountContext.Provider
        value={{
          loadedCount: loadedCount,
          setLoadedCount: setLoadedCount,
          originalCount: originalCount,
          setOriginalCount: setOriginalCount,
        }}
      >
        <>
          <HeaderNav />
          <SearchComponent />
          <FoodListRecipe>
            <FoodList setActiveFoodId={setActiveFoodId} />
            <RecipeDetails activeFoodId={activeFoodId} />
          </FoodListRecipe>
          <Footer />
        </>
      </CountContext.Provider>
    </FoodsStateContext.Provider>
  );
};

export default FoodApp;
export { FoodsStateContext, CountContext };
