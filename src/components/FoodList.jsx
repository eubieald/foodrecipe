import React, { useContext } from "react";
import FoodItem from "./FoodItem";
import LoadMore from "./LoadMore";

import styles from "../styles/foodList.module.scss";

// Context provider imports
import { FoodsStateContext } from "./FoodApp";
const FoodList = ({ setActiveFoodId }) => {
  const { visibleFoods } = useContext(FoodsStateContext);

  return (
    <ul className={styles.grid_container}>
      {visibleFoods.map((food) => (
        <FoodItem
          key={food.id}
          foodItem={food}
          setActiveFoodId={setActiveFoodId}
        />
      ))}
      <LoadMore />
    </ul>
  );
};

export default React.memo(FoodList);