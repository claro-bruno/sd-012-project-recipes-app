import React, { useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllFoodsThunk,
  getCategoriesFood,
  getMealsThunk,
  selectButton,
} from '../Redux/actions/categorieButtonsAct';

function CategoryFoodButtons() {
  const { foodcategories: {
    foodCategories,
    isLoading,
    selectedButton } } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesFood());
  }, [dispatch]);

  console.log(foodCategories);

  useEffect(() => {
    if (selectedButton !== 'All' && selectedButton !== 'none') {
      dispatch(getMealsThunk(selectedButton));
    } else {
      dispatch(getAllFoodsThunk());
    }
  }, [dispatch, selectedButton]);

  if (!isLoading) {
    return (
      <section className="btn-section">
        {foodCategories.map((category) => (
          <button
            type="button"
            key={ uuidv4() }
            onClick={ () => { dispatch(selectButton(category.strCategory)); } }
            name={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
        <button
          type="button"
          key={ uuidv4() }
          onClick={ () => { dispatch(selectButton('All')); } }
          name="All"
          data-testid="All-category-filter"
        >
          All
        </button>
      </section>
    );
  }
  return <ReactBootstrap.Spinner animation="border" variant="danger" />;
}

export default CategoryFoodButtons;
