/*
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard(props) {
  const [show, setShow] = React.useState(false);

  const {
    id,
    index,
    IDimg,
    thumbnail,
    // thumbnailIcon,
    titleImg,
    IDtopText,
    titleTopText,
    IDnameRecipe,
    titleNameRecipe,
    IDdoneDate,
    titleDoneDate,
    IDshareBtn,
    titleShareBtn,
    IDtag,
  } = props;

  const handleShare = async () => {
    const time = 2000;
    const URL = `http://localhost:3000/comidas/${id}`;
    navigator.clipboard.writeText(URL);
    setShow(true);
    await setTimeout(() => setShow(false), time);
  };

  return (
    <div className="recipe-cards">
      <Link
        to={ `/comidas/${id}` }
      >
        <img
          src={ thumbnail }
          data-testid={ IDimg }
          alt={ titleImg }
        />
      </Link>
      <p
        data-testid={ IDtopText }
      >
        {titleTopText}
      </p>
      <Link to={ `/bebidas/${id}` }>
        <h2
          data-testid={ IDnameRecipe }
        >
          {titleNameRecipe}
        </h2>
      </Link>
      <p
        data-testid={ IDdoneDate }
      >
        {titleDoneDate}
      </p>
      {show ? <Alert>Link copiado!</Alert> : null}
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          data-testid={ IDshareBtn }
          alt={ titleShareBtn }
        />
      </button>
      {IDtag.map((tag) => (
        <span
          key={ uuidv4() }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
DoneRecipesCard.defaultProps = {
  titleShareBtn: '',
};
const { string, number } = PropTypes;

DoneRecipesCard.propTypes = {
  index: number.isRequired,
  id: string.isRequired,
  IDimg: string.isRequired,
  IDtopText: string.isRequired,
  IDnameRecipe: string.isRequired,
  IDdoneDate: string.isRequired,
  IDshareBtn: string.isRequired,
  IDtag: PropTypes.instanceOf(Object).isRequired,
  thumbnail: string.isRequired,
  // thumbnailIcon: string.isRequired,
  titleImg: string.isRequired,
  titleTopText: string.isRequired,
  titleNameRecipe: string.isRequired,
  titleDoneDate: string.isRequired,
  titleShareBtn: string,
};

export default DoneRecipesCard;

/*
  <div>
    <Header title="Receitas Favoritas" />
    <button
    type="button"
    data-testid="filter-by-all-btn"
    onClick={ () => setFilterFood(recipes) }
  >
    All
  </button>
    <button
    type="button"
    data-testid="filter-by-food-btn"
    onClick={ () => foodFilterBtn('comida') }
    >
    Food
  </button>
    <button
    type="button"
    data-testid="filter-by-drink-btn"
    onClick={ () => foodFilterBtn('bebida') }
  >
    Drinks
  </button>

    <div className="recipe-cards">
    {
      recipes.map((recipe, index) => (
        <div
          key={ uuidv4() }
        >
          <Link
            to={ `/comidas/${recipe.id}` }
          >
            <img
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
            />
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { titleTopText(recipe) }
          </p>
          <Link to={ `/bebidas/${recipe.id}` }>
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </h2>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            { recipe.doneDate }
          </p>

          {show ? <Alert>Link copiado!</Alert> : null}
          <button
            type="button"
            onClick={ handleShare }
          >
            <img
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              alt="shareImage"
            />
          </button>
          {recipe.tags.map((tag) => (
            <span
              key={ uuidv4() }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}

        </div>
      ))
    }
  </div>
    {/* {
        filterFood.map((recipe, index) => (
          <DoneRecipesCard
          index={ index }
          key={ uuidv4() }
          id={ recipe.id }
            IDimg={ `${index}-horizontal-image` }
            IDtopText={ `${index}-horizontal-top-text` }
            IDnameRecipe={ `${index}-horizontal-name` }
            IDdoneDate={ `${index}-horizontal-done-date` }
            IDshareBtn={ `${index}-horizontal-share-btn` }
            // IDtag={ recipe.tags }
            thumbnail={ recipe.image }
            titleImg={ recipe.name }
            // thumbnailIcon={ shareIcon }
            titleTopText={ titleTopText(recipe) }
            titleNameRecipe={ recipe.name }
            titleDoneDate={ recipe.doneDate }
            titleTag={ recipe.tags }
          />
        ))
      } }
  </div>;
  */
