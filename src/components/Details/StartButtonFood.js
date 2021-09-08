import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function ButtonFood() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterDoneRecipes = getDoneRecipes ? getDoneRecipes
      .filter((item) => item.id === id) : [];
    setDoneRecipes(filterDoneRecipes);

    const getInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const filterInProgress = getInProgress ? Object.keys(getInProgress.meals)
      .filter((item) => item === id) : [];
    setInProgress(filterInProgress);
  }, [id, setDoneRecipes]);

  return (
    <Link to={ `/comidas/${id}/in-progress` }>
      <Button
        className="fixed-bottom"
        data-testid="start-recipe-btn"
        type="button"
        hidden={ doneRecipes.length !== 0 }
      >
        { inProgress.length !== 0
          ? 'Continuar Receita' : 'Iniciar Receita' }
      </Button>
    </Link>
  );
}

export default ButtonFood;
