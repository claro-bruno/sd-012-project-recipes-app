import React from 'react';
import { Link } from 'react-router-dom';
import MenuFooter from '../../components/MenuFooter';
import Header from '../../components/Header';
import './style/style.css';

export default function ExplorarComidas() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="container-button-explorar">
        <Link to="/explorar/comidas/ingredientes">
          <button
            className="btn btn-warning button-size"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            className="btn btn-warning button-size"
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          className="btn btn-warning button-size"
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </div>
      <MenuFooter />
    </div>
  );
}
