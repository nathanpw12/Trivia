import { findAllByTestId, getByTestId, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "../App";
import fetchMock from 'fetch-mock-jest';
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";
import 'jest-localstorage-mock';
import userEvent from "@testing-library/user-event";
import questions from "../redux/reducers/questions";
import { initialState } from './helpers/initialState';


afterEach(() => {
  jest.resetAllMocks();
})

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

describe('Game page', () => {
  test('Game Elements', () => {
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue('teste'),
    });
    renderWithRouterAndRedux(<App />, {}, '/game');
    expect(fetch).toBeCalled();
  })

  test('Game fetch', () => {
    const tokenMock = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(tokenMock),
    });
    renderWithRouterAndRedux(<App />, initialState ,'/game');
  })

  test('Questions Game Component', async () => {
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue('teste'),
    });
    const mock = [{name: "sfsd", score: 100, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}]

    global.localStorage.setItem('ranking', JSON.stringify(mock))
    const { history } = renderWithRouterAndRedux(<App />, initialState ,'/game');
      expect(screen.getByTestId('timer')).toBeInTheDocument()
      jest.spyOn(Storage.prototype, 'setItem');
      Storage.prototype.setItem = jest.fn();
      let answer = screen.getByTestId('correct-answer');
      userEvent.click(answer);
      let nextBtn = screen.getByTestId("btn-next");
      userEvent.click(nextBtn);
      answer = screen.getByTestId('correct-answer');
      userEvent.click(answer);
      nextBtn = screen.getByTestId("btn-next");
      userEvent.click(nextBtn);
      answer = screen.getByTestId('correct-answer');
      userEvent.click(answer);
      nextBtn = screen.getByTestId("btn-next");
      userEvent.click(nextBtn);
      answer = screen.getAllByTestId('wrong-answer-3')[0];
      userEvent.click(answer);
      nextBtn = screen.getByTestId("btn-next");
      userEvent.click(nextBtn);
      answer = screen.getAllByTestId('wrong-answer-4')[0];
      userEvent.click(answer);
      nextBtn = screen.getByTestId("btn-next");
      userEvent.click(nextBtn);
      const play = screen.getByRole('button', {  name: /play again/i})
      userEvent.click(play);
      expect(history.location.pathname).toBe('/');  
      expect(localStorage.setItem).toHaveBeenCalled();
  })


  test('Questions Game Other BUttons', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'setTimeout');
    window.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue('teste'),
    });
    renderWithRouterAndRedux(<App />, initialState ,'/game'); 
    jest.advanceTimersByTime(31000);
    expect(screen.getByRole('button', {name: /next/i})).toBeInTheDocument();
  })
})
