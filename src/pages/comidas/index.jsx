import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import RecipeContainer from '../../components/RecipeContainer';

const Comidas = ({ match: { params: { param1, param2 } } }) => (
  <>
    <Header title="Comidas" routeParams={ [param1, param2] } />
    {
      param1 ? <h1>Detalhes</h1> : <RecipeContainer />
    }
  </>
);

Comidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(String),
  }),
};

Comidas.defaultProps = {
  match: undefined,
};
export default Comidas;
