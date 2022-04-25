import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './meal-item/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          'https://react-http-913ae-default-rtdb.firebaseio.com/meals.json'
        );
        if (!res.ok) {
          throw new Error('Something went wrong.');
        }

        const data = await res.json();

        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedMeals);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.loading}>
        <p>{error}</p>
      </section>
    );
  }

  const renderedMeals = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{renderedMeals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
