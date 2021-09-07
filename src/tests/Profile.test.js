import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../App';

describe('24 - Verifica se o email da usuaria aparece na pagina de perfil', () => {
  const Useremail = 'teste@email.com';

  it('O email digitado na tela de login ficará salvo no LocalStorage', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');
    userEvent.type(email, Useremail);
    userEvent.type(password, '12345678');
    userEvent.click(loginButton);
    const localStorageEmail = JSON.parse(localStorage.getItem('user'));
    expect(localStorageEmail).toStrictEqual({ email: Useremail });
  });

  it('renderiza o email da pessoa usuaria', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/perfil'] });
    const email = screen.getByText('teste@email.com');
    expect(email).toBeInTheDocument();
  });
});

describe('25 - Verifica se links da pagina de perfil redirecionam corretamente', () => {
  it('Ao clicar em receitas feitas redireciona para "receitas-feitas"', () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/perfil'] });
    const { pathname } = history.location;
    expect(pathname).toEqual('/perfil');
    const receitasFeitasBtn = screen.getByText('Receitas Feitas');
    expect(receitasFeitasBtn).toBeInTheDocument();
    userEvent.click(receitasFeitasBtn);
    expect(history.location.pathname).toEqual('/receitas-feitas');
  });

  it('Ao clicar em receitas favoritas redireciona para "receitas-favoritas"', () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/perfil'] });
    const { pathname } = history.location;
    expect(pathname).toEqual('/perfil');
    const receitasFavoritasBtn = screen.getByText('Receitas Favoritas');
    expect(receitasFavoritasBtn).toBeInTheDocument();
    userEvent.click(receitasFavoritasBtn);
    expect(history.location.pathname).toEqual('/receitas-favoritas');
  });

  it('Ao clicar em sair realiza o logout e retorna ao Login', () => {
    const { history } = renderWithRouterAndRedux(<App />,
      { initialEntries: ['/perfil'] });
    const { pathname } = history.location;
    expect(pathname).toEqual('/perfil');
    const SairBtn = screen.getByText('Sair');
    expect(SairBtn).toBeInTheDocument();
    userEvent.click(SairBtn);
    expect(history.location.pathname).toEqual('/');
  });
});
