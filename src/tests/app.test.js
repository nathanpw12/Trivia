import { screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import renderWithRouterAndRedux from "../tests/helpers/renderWithRouterAndRedux";

beforeEach(() => {
  
})
describe('', () => {
  it('', () => {
    renderWithRouterAndRedux(<App />, {}, '/ranking')
    const btnHome = screen.getByTestId('btn-go-home')
    expect(btnHome).toBeInTheDocument()
  });
  
});
