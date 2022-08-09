import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";

describe('Testa a página de feedback', () => {
  it('Verifica se os elementos estão na tela', () => {
    renderWithRouterAndRedux(<App />, {}, '/feedback')
    const btnPlayAgain = screen.getByTestId('btn-play-again')
    const btnRanking = screen.getByTestId('btn-ranking')
    const totalScore = screen.getByTestId('feedback-total-score')
    const totalAssertions = screen.getByTestId('feedback-total-question')
    const headerImg = screen.getByTestId('header-profile-picture')

    expect(btnPlayAgain).toBeInTheDocument()
    expect(btnRanking).toBeInTheDocument()
    expect(totalScore).toBeInTheDocument()
    expect(totalAssertions).toBeInTheDocument()
    expect(headerImg).toBeInTheDocument()
    
    userEvent.click(btnPlayAgain)  
  });

  
  it('a', () => {
    const initialState = {
      player: {
        name: 'Player Name',
        gravatarEmail: 'player@email.com',
        score: 0,
        assertions: 4,
      }
    }
    renderWithRouterAndRedux(<App />, initialState, '/feedback')
    const btnRanking = screen.getByTestId('btn-ranking')
    userEvent.click(btnRanking) 
  });

  it('test second place in ranking', () => {
    const initialState = {
      player: {
        name: 'Lcuas',
        assertions: 1,
        score: 39,
        gravatarEmail: 'test@mail.com'
      }
    }
    const mock = [{name: "sfsd", score: 100, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}]
  
    global.localStorage.setItem('ranking', JSON.stringify(mock))
  
    renderWithRouterAndRedux(<App />, initialState, '/feedback')
    const btnRanking = screen.getByTestId('btn-ranking')
  
    userEvent.click(btnRanking)
  
    const name = screen.getByTestId('player-name-1')
    const score = screen.getByTestId('player-score-1')
  
    expect(name).toBeInTheDocument()
    expect(score).toBeInTheDocument()
  })
});
