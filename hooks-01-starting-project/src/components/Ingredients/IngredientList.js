import React from 'react';

import './IngredientList.css';

const IngredientList = (props) => {
  const renderedIngredients = props.ingredients.map((ig) => (
    <li key={ig.id} onClick={(e) => props.onRemoveItem(ig.id)}>
      <span>{ig.title}</span>
      <span>{ig.amount}x</span>
    </li>
  ));
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>{renderedIngredients}</ul>
    </section>
  );
};

export default IngredientList;
