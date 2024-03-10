import styles from "../styles/recipeIngredients.module.scss";

const RecipeIngredients = ({ extendedIngredients }) => {
  const arrayWithoutDuplicates = extendedIngredients.filter(
    (currValue, index) =>
      extendedIngredients.findIndex((i) => i.id === currValue.id) === index
  );

  return (
    <ul className={styles.ingredients}>
      {arrayWithoutDuplicates.map((ingredient) => (
        <li key={ingredient.id}>
          <img
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
            alt={ingredient.name}
          />
          {ingredient.original}
        </li>
      ))}
    </ul>
  );
};

export default RecipeIngredients;
