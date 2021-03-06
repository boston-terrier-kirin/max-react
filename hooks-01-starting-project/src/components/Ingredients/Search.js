import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    const query =
      filtered.length === 0 ? '' : `?orderBy="title"&equalTo="${filtered}"`;
    fetch(
      `https://react-http-913ae-default-rtdb.firebaseio.com/ingredients.json${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [filtered, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filtered}
            onChange={(e) => setFiltered(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
