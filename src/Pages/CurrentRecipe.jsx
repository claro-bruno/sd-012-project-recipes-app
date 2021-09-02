import React from 'react';
// import { useHistory, useLocation } from 'react-router-dom';

function CurrentRecipe() {
  // const [recipes, setRecipe] = React.useState([]);
  const state = React.useContext();
  console.log(state);

  return (
    <div>
      olá
      {/* <img
        data-testid="recipe-photo"
        src={}
        alt={}
      /> */}
    </div>
  );
}

export default CurrentRecipe;
