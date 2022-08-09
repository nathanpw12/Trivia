import { findAllByTestId, getByTestId, screen, waitFor } from "@testing-library/react";
import React from "react";
import App from "../App";
import fetchMock from 'fetch-mock-jest';
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";
import 'jest-localstorage-mock';
import userEvent from "@testing-library/user-event";
import questions from "../redux/reducers/questions";
import { initialState } from './helpers/initialState';

function timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
      console.log("Time's up -- stop!");
      callback && callback();
    }, 1000);
  }

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
jest.spyOn(global, 'setTimeout');
test('Questions Game Other BUttons', () => {
  timerGame();
})
