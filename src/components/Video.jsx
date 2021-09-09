import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Video extends Component {
  render() {
    const { key, src, title } = this.props;
    return (
      <section>
        <iframe
          key={ key }
          src={ src }
          title={ title }
          data-testid="video"
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  recipe: state.foods.recipes,
});

Video.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Video);
