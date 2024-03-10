import { useState, useEffect } from "react";
import styles from "../styles/foodItem.module.scss";
import LazyLoad from "react-lazyload";

const FoodItem = ({ foodItem, setActiveFoodId }) => {
  const handleClick = (id) => {
    setActiveFoodId((prevId) => {
      // Update the state with the new id
      highlightActiveFood(id); // Call the highlight function with the new id
      return id;
    });

    scrollToTop();
  };

  const scrollToTop = () => {
    const recipeListContainerEl = document.getElementById("recipeDetails");
    if (recipeListContainerEl) {
      recipeListContainerEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const highlightActiveFood = (id) => {
    // Remove active class from all list items
    const listItems = document.querySelectorAll("li");
    listItems.forEach((li) => {
      li.classList.remove(styles.active);
    });

    if (id) {
      // Add active class to the newly selected list item
      const activeLi = document.getElementById(id);
      if (activeLi) {
        activeLi.classList.add(styles.active);
      }
    }
  };

  return (
    <li className={styles.grid_item} id={foodItem.id}>
      <LazyLoad className={styles.grid_item_img}>
        <img src={foodItem.image} alt={foodItem.title} />
      </LazyLoad>
      <div className={styles.grid_item_title}>{foodItem.title}</div>
      <button
        className={styles.viewRecipe}
        onClick={() => handleClick(foodItem.id)}
      >
        View Recipe
      </button>
    </li>
  );
};

export default FoodItem;
