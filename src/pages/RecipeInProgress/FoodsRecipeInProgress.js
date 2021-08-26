import React/* , { useState }  */from 'react';

function FoodsRecipeInProgress() {
  const ingredientsList = ['tomate', 'azeite', 'sal'];
  // const index ->  ainda n tem

  const handleCheked = () => (
    'desenvolver lógica p dar check qd é apertado a caixinha de check'
  );

  return (
    <div className="food-in-progress">
      <p>Componente FoodsRecipeInProgress</p>
      <img data-testid="recipe-photo" alt="recipe" />
      <h1 data-testid="recipe-title">Título receita</h1>
      <button data-testid="share-btn" type="button">btn compartilhar</button>
      <button data-testid="favorite-btn" type="button">btn favoritar</button>

      <h4 data-testid="recipe-category">categoria</h4>

      <div className="indredients">
        <h3>Ingredientes</h3>
        {/* <li>
          <input data-testid={ `${index}-ingredient-step` } type="checkbox " />
          5gr de sal
        </li> */}

        <div className="indredients">
          { ingredientsList.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                checked={ handleCheked() }
              />
              { `${ingredient}` }
            </div>

          ))}
        </div>
      </div>

      <h3>Instruções</h3>
      <p data-testid="instructions">texto de instruçoes</p>
      <button data-testid="finish-recipe-btn" type="button">finalizar</button>
    </div>
  );
}

export default FoodsRecipeInProgress;
