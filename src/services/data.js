const URL_RADIO_BUTTON = {
  ingredient: 'filter.php?i',
  name: 'search.php?s',
  letter: 'search.php?f',
};
const MEAL_OBJ = { textValue: '', radioValue: 'ingredient', pathname: '/comidas' };
const DRINK_OBJ = { textValue: 'water', radioValue: 'ingredient', pathname: '/bebidas' };
const ALERT_ONE = 'Sua busca deve conter somente 1 (um) caracter';
const ALERT_TWO = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
const START_CARD = 0;
const NUMBER_CARDS = 12;

export {
  URL_RADIO_BUTTON,
  ALERT_ONE,
  ALERT_TWO,
  START_CARD,
  NUMBER_CARDS,
  MEAL_OBJ,
  DRINK_OBJ,
};
