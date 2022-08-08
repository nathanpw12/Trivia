import { screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";
import 'jest-localstorage-mock';
import userEvent from "@testing-library/user-event";
describe('Ranking', () => {
  it('Ranking elements', () => {
    const mock = [{name: "sfsd", score: 100, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}]

    global.localStorage.setItem('ranking', JSON.stringify(mock))

    renderWithRouterAndRedux(<App />, {}, '/ranking')

    const btnHome = screen.getByTestId('btn-go-home')
    const name = screen.getByTestId('player-name-0')
    const score = screen.getByTestId('player-score-0')

    expect(btnHome).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(score).toBeInTheDocument()

    userEvent.click(btnHome)
  });
  
});
