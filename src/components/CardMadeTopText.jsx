import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardMadeTopText extends Component {
  render() {
    const { index, area, category } = this.props;

    return (
      <p data-testid={ `${index}-horizontal-top-text` }>
        <span>{ `${area} - ` }</span>
        <span>{ category }</span>
      </p>
    );
  }
}

export default CardMadeTopText;

CardMadeTopText.propTypes = {
  index: PropTypes.number,
}.isRequired;
