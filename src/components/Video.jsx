import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Video extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <section>
        {
          recipe.map(({ strYoutube, strMeal }, index) => (
            <iframe
              key={ uuidv4() }
              src={ strYoutube.replace('watch?v', 'embed/') }
              title={ strMeal }
              data-testid="video"
            />
          ))
        }
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
