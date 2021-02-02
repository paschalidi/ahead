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
  expect(inputElement).toMatchInlineSnapshot(`
    <input
      aria-label="typeahead-input"
      class="sc-bdfBwQ juMTdC"
      placeholder="Type..."
      type="text"
      value=""
    />
  `);
});

userInputCases.forEach((userInput) =>
  test(`should show the list when there types ${userInput}`, () => {
    // given
    const { inputElement, getByTestId } = setup();
    // when
    fireEvent.change(inputElement, { target: { value: userInput } });
    const listElement = getByTestId("suggestions-list");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toMatchSnapshot();

    expect(listElement).toBeInTheDocument();
    expect(listElement).toMatchSnapshot();
  })
);
