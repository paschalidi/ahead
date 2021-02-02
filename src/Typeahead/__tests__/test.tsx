import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Typeahead } from "../index";

const setup = () => {
  const utils = render(<Typeahead />);
  const inputElement = utils.getByLabelText("typeahead-input");
  return {
    inputElement,
    ...utils,
  };
};

const userInputCases = ["plu", "plum", "avo", "app", "a"];

test("should render input", () => {
  // given
  const { inputElement } = setup();

  // then
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toMatchSnapshot();
});

userInputCases.forEach((userInput) =>
  test(`should show the list when there types ${userInput}`, () => {
    // given
    const { inputElement, getByTestId } = setup();
    const listElement = getByTestId("suggestions-list");

    // when
    fireEvent.change(inputElement, { target: { value: userInput } });

    // then
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toMatchSnapshot();
    expect(listElement).toBeInTheDocument();
    expect(listElement).toMatchSnapshot();
  })
);

// todo testing scenarios
//  type in and select with click, make sure you can erase after
//  type in and select with enter, make sure you can erase after
//  type in and make sure matching is case insensitive
//  type in and go till the end of the list. then on the top
//  type in then move with key then type again. make sure selection reseted
//  type in and then hover over make sure input has the text you hovered
