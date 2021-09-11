import React from 'react';
import { string, number, oneOfType } from 'prop-types';
import { useLocation, Link } from 'react-router-dom';

function RecipeCard(props) {
  const { pathname } = useLocation();
  const { id, thumbnail, title, index } = props;

  return (
    <Link className="recipe-cards" to={ `${pathname}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ thumbnail }
          data-testid={ `${index}-card-img` }
          alt={ title }
        />
        <div>
          <h4 data-testid={ `${index}-card-name` }>
            { title }
          </h4>
        </div>
      </div>
    </Link>
  );
}
RecipeCard.defaultProps = {
  index: null,
};
RecipeCard.propTypes = {
  id: oneOfType([
    string,
    number,
  ]).isRequired,
  thumbnail: string.isRequired,
  title: string.isRequired,
  index: number,
};

export default RecipeCard;
