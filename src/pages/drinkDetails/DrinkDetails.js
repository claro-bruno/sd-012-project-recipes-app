import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Button } from 'react-bootstrap';
import HeaderDetails from '../../components/HeaderDetails/HeaderDetails';
import IngredientsDetails from '../../components/IngredientsDetails/IngredientsDetails';
import Instructions from '../../components/InstructionsDetails/InstructionsDetails';
import Recomendation from '../../components/Recomentation/Recomendation';

const DrinkDetails = ({ match: { params: id } }) => {
  const [drink, setDrink] = useState(0);
  useEffect(() => {
    const fetchDrink = () => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id.id}`)
        .then((resolve) => resolve.json())
        .then((resolve) => setDrink(resolve.drinks[0]));
    };
    fetchDrink();
  }, [id.id]);
  console.log(drink);
  if (!drink) return <Spinner animation="border" />;
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions } = drink;
  return (
    <div>
      <HeaderDetails
        title={ strDrink }
        image={ strDrinkThumb }
        category={ strAlcoholic }
      />
      <IngredientsDetails recipe={ drink } />
      <Instructions instruction={ strInstructions } />
      <Recomendation />
      <Button data-testid="start-recipe-btn">Começar Receita</Button>
    </div>
  );
};

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkDetails;
