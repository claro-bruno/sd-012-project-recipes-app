import React, { useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFoodsThunk,
  getCategoriesFood,
  getMealsThunk } from '../Redux/actions/categorieButtonsAct';

function CategoryFoodButtons() {
  const { foodcategories: { foodCategories, isLoading } } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesFood());
  }, [dispatch]);

  const handleClick = ({ target }) => {
    if (target.name === 'All') {
      dispatch(getAllFoodsThunk());
    }
    dispatch(getMealsThunk(target.name));
  };

  if (!isLoading) {
    return (
      <session>
        { foodCategories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            onClick={ handleClick }
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
      </session>
    );
  }
  return <ReactBootstrap.Spinner animation="border" variant="danger" />;
}

export default CategoryFoodButtons;
