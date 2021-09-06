import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardMadeImg extends Component {
  render() {
    const { type, id, image, index } = this.props;
    return (
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          className="card-img"
          alt="card"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
    );
  }
}

export default CardMadeImg;

CardMadeImg.propTypes = {
  type: PropTypes.string,
}.isRequired;
