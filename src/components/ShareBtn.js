import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import clipboardCopy from '../utils/clipboardCopy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ id, type }) {
  return (
    <div>
      <Button
        type="button"
        className="btn-share"
        onClick={ () => clipboardCopy(type, id) }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
          className="share-icon"
        />
        <p
          id={ `copyMessage${id}` }
          className="share-txt"
        >
          Compartilhar
        </p>
      </Button>
    </div>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

export default ShareBtn;
