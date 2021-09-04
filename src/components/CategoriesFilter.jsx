import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/categoryStyle.css';

class CategoriesFilter extends Component {
  constructor(props) {
    super(props);

    this.filterFiveCategories = this.filterFiveCategories.bind(this);
  }

  filterFiveCategories() {
    const { categories } = this.props;
    const FIVE = 5;

    return categories.filter((_categories, index) => index < FIVE);
  }

  render() {
    const { handleClick } = this.props;
    const filteredCategories = this.filterFiveCategories();

    return (
      <div className="categoryStyle row row-cols-3 row-cols-md-3 g-4 mb-5">
        <button
          type="button"
          onClick={ handleClick }
          className="btn btn-warning "
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          filteredCategories.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              onClick={ handleClick }
              className="btn btn-warning "
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          ))
        }
      </div>
    );
  }
}

CategoriesFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default CategoriesFilter;
