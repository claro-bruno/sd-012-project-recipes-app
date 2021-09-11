import React, { Component } from 'react';
import Header from '../components/Header';
import { getLocalStorage } from '../webStorage/recipeDoneHelper';
import FilterRecipesMade from '../components/RecipesMade/FilterRecipesMade';
import RecipesMadeList from '../components/RecipesMade/RecipesMadeList';

class RecipesMade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doneRecipes: [],
    };

    this.setDoneRecipes = this.setDoneRecipes.bind(this);
    this.filterRecipesDone = this.filterRecipesDone.bind(this);
  }

  componentDidMount() {
    this.setDoneRecipes();
  }

  setDoneRecipes() {
    const storage = getLocalStorage();
    console.log(storage);
    this.setState({ doneRecipes: storage });
  }

  filterRecipesDone({ target }) {
    const filterType = target.innerText;

    switch (filterType) {
    case 'All':
      return this.setDoneRecipes();
    case 'Foods':
      this.setDoneRecipes();
      return this.setState((state) => ({
        doneRecipes: state.doneRecipes.filter(({ type }) => type === 'comida'),
      }));
    case 'Drinks':
      this.setDoneRecipes();
      return this.setState((state) => ({
        doneRecipes: state.doneRecipes.filter(({ type }) => type === 'bebida'),
      }));
    default:
      return this.setDoneRecipes();
    }
  }

  render() {
    const categories = [
      { strCategory: 'food', strName: 'Foods' },
      { strCategory: 'drink', strName: 'Drinks' },
    ];

    const { doneRecipes } = this.state;

    return (
      <div>
        <Header title="Receitas Feitas" showSearchBottom={ false } />
        <FilterRecipesMade
          categories={ categories }
          handleClick={ this.filterRecipesDone }
        />
        <RecipesMadeList recipes={ doneRecipes } />
      </div>
    );
  }
}

export default RecipesMade;
