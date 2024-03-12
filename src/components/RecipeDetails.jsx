import React, { useContext, useEffect, useState } from "react";
import RecipeIngredients from "./RecipeIngredients";

// Context providers import
import { FoodsStateContext } from "./FoodApp";

// Helper import
import authenticateApiCall from "./Helpers/authenticateApiCall";

// Styles import
import styles from "../styles/recipeDetails.module.scss";

// Assets import
import placeholderImage from "../assets/images/food-placeholder.png";

const RecipeDetails = ({ activeFoodId }) => {
  const { visibleFoods } = useContext(FoodsStateContext);
  const [activeFood, setActiveFood] = useState();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        if (activeFoodId) {
          // Using spoonacular api
          const response = await authenticateApiCall(
            "",
            `${
              import.meta.env.VITE_SPOONACULAR_API_RECIPE_INFORMATION
            }${activeFoodId}/information`
          );
          const data = await response.json();
          setActiveFood(data);

          // Offline mode if API is not available
          // const { default: response } = await import(
          //   "../data/offlineFoodItemData.json"
          // );
          // const food = response.find((item) => item.id === activeFoodId);
          // setActiveFood(food || null);
        } else {
          setActiveFood(null);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [activeFoodId]);

  return (
    <>
      {visibleFoods.length > 0 && (
        <div className={styles.recipeDetails_container} id="recipeDetails">
          <div className={styles.container_label}>Recipe Details</div>
          {activeFood && (
            <div className={styles.content}>
              <h3>{activeFood.title}</h3>
              {activeFood.image ? (
                <img src={activeFood.image} alt={activeFood.title} />
              ) : (
                <img src={placeholderImage} alt="Placeholder" />
              )}
              <div className={styles.categorized_details}>
                <span>
                  <b>Minutes</b> 🕗: {activeFood.readyInMinutes}
                </span>
                <span>
                  <b>Servings</b> 👨‍👩‍👧‍👦: {activeFood.servings}
                </span>
                <span>
                  {activeFood.diets.length > 0 && (
                    <div>
                      <b>Diets</b>:{" "}
                      {activeFood.diets
                        .map((diet) => diet.toString())
                        .join(", ")}
                    </div>
                  )}
                </span>
                <span>
                  {activeFood.dishTypes.length > 0 && (
                    <div>
                      <b>Dish Types</b>:{" "}
                      {activeFood.dishTypes
                        .map((dish) => dish.toString())
                        .join(", ")}
                    </div>
                  )}
                </span>
              </div>
              <div className={styles.instructions}>
                <h2>Instructions:</h2>
                {/* Render the instructions HTML content */}
                <div
                  dangerouslySetInnerHTML={{ __html: activeFood.instructions }}
                ></div>
              </div>
              <div className={styles.ingredients}>
                <h2>Ingredients:</h2>
                <div>
                  <RecipeIngredients
                    extendedIngredients={activeFood.extendedIngredients}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.memo(RecipeDetails);
