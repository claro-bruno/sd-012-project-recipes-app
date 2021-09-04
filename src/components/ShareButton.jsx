import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

class ShareButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      copied: false,
    };

    this.copyHandle = this.copyHandle.bind(this);
    this.setIndex = this.setIndex.bind(this);
  }

  componentDidMount() {
    this.setIndex();
  }

  setIndex() {
    const { position } = this.props;
    this.setState({ index: position });
  }

  async copyHandle() {
    const { id, type } = this.props;
    const path = type === 'comida'
      ? `http://localhost:3000/comidas/${id}`
      : `http://localhost:3000/bebidas/${id}`;

    await copy(path);
    this.setState({ copied: true });
  }

  render() {
    const { index, copied } = this.state;

    return (
      <div>
        <button
          type="button"
          className="share-fill"
          data-testid="share-btn"
          onClick={ this.copyHandle }
        >
          <img
            src={ ShareIcon }
            alt="share button"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>

        { copied ? <span>Link copiado!</span> : null }
      </div>
    );
  }
}

export default ShareButton;

ShareButton.propTypes = {
  position: PropTypes.number,
}.isRequired;
