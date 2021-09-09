import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ButtonDrink() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterDoneRecipes = getDoneRecipes ? getDoneRecipes
      .filter((item) => item.id === id) : [];
    setDoneRecipes(filterDoneRecipes);

    const getInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const filterInProgress = getInProgress ? Object.keys(getInProgress.cocktails)
      .filter((item) => item === id) : [];
    setInProgress(filterInProgress);
  }, [id, setDoneRecipes]);

  return (
    <Link to={ `/bebidas/${id}/in-progress` }>
      <button
        type="button"
        style={ { position: 'fixed', bottom: 0 } }
        data-testid="start-recipe-btn"
        hidden={ doneRecipes.length !== 0 }
      >
        { inProgress.length !== 0
          ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>
    </Link>
  );
}

export default ButtonDrink;
