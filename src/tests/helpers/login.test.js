import React from "react";
import { screen } from "@testing-library/react";
import App from "../../App";
import renderWithRouterAndRedux from "./renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";

beforeEach(async () => {
  window.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue('32432dadsad4534'),
  });
})

describe('login test', () => {
  test('test 1', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByRole('textbox', {
      name: /nome:/i
    })
    const inputEmail = screen.getByRole('textbox', {  name: /email:/i})
    const configButton = screen.getByRole('button', {  name: /configurações/i})
    const playButton = screen.getByRole('button', {  name: /play/i})
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(configButton).toBeInTheDocument()
    expect(playButton).toBeInTheDocument()

    userEvent.click(configButton)
  })
  
  test('', async () => {
    renderWithRouterAndRedux(<App />)
    const playButton = screen.getByRole('button', {  name: /play/i})
    const inputName = screen.getByRole('textbox', { name: /nome:/i })
    const inputEmail = screen.getByRole('textbox', {  name: /email:/i})
    userEvent.type(inputName, 'Lucas Eduardo')
    userEvent.type(inputEmail, 'test@mail.com')
    userEvent.click(playButton)
    expect(fetch).toBeCalled()
  })
})
