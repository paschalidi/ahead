import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Typeahead } from "../index";

const setup = () => {
  const utils = render(<Typeahead />);
  const typeahead = utils.getByTestId("typeahead");
  const inputElement = utils.getByLabelText("typeahead-input");

  return {
    typeahead,
    inputElement,
    ...utils,
  };
};

const userInputCases = ["plu", "plum", "avo", "app", "a"];

test("you should see the rendered input", () => {
  // given
  const { typeahead } = setup();

  // then
  expect(typeahead).toBeInTheDocument();
  expect(typeahead).toMatchInlineSnapshot(`
    <div
      data-testid="typeahead"
    >
      <input
        aria-label="typeahead-input"
        class="sc-bdfBwQ juMTdC"
        placeholder="Type..."
        type="text"
        value=""
      />
    </div>
  `);
});

// todo testing scenarios
//  type in and select with click, make sure you can erase after
//  type in and select with enter, make sure you can erase after
//  type in and make sure matching is case insensitive
//  type in and go till the end of the list. then on the top
//  type in then move with key then type again. make sure selection reseted
//  type in and then hover over make sure input has the text you hovered

test(`you should see the suggestion you clicked on the input`, () => {
  // given
  const { inputElement, typeahead, getByLabelText } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "a" } });
  // and
  fireEvent(
    getByLabelText("Açaí"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  // then
  expect(inputElement.value).toBe("Açaí");
  expect(typeahead).toMatchInlineSnapshot(`
    <div
      data-testid="typeahead"
    >
      <input
        aria-label="typeahead-input"
        class="sc-bdfBwQ juMTdC"
        placeholder="Type..."
        type="text"
        value="Açaí"
      />
    </div>
  `);
});

test(`after you already made a selection you should be able to type in the input`, () => {
  // given
  const { inputElement, typeahead, getByLabelText } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "a" } });
  // and
  fireEvent(
    getByLabelText("Açaí"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  // and
  fireEvent.change(inputElement, { target: { value: "avocado" } });

  // then
  expect(inputElement.value).toBe("avocado");
  expect(typeahead).toMatchInlineSnapshot(`
    <div
      data-testid="typeahead"
    >
      <input
        aria-label="typeahead-input"
        class="sc-bdfBwQ juMTdC"
        placeholder="Type..."
        type="text"
        value="avocado"
      />
      <ul
        class="sc-gsTCUz MsIIl"
        data-testid="suggestions-list"
      >
        <li>
          <button
            aria-label="Avocado"
            class="sc-dlfnbm cHfzSk"
            type="button"
          >
            <span>
              
              <span
                class="coloredText"
              >
                Avocado
              </span>
            </span>
            <span />
          </button>
        </li>
      </ul>
    </div>
  `);
});

test(`after you already made a selection you should be able to type _and_ make another selection`, () => {
  // given
  const { inputElement, typeahead, getByLabelText, queryByTestId } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "a" } });
  // and
  fireEvent(
    getByLabelText("Açaí"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  // and
  fireEvent.change(inputElement, { target: { value: "avoca" } });
  // and
  fireEvent(
    getByLabelText("Avocado"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  // then
  expect(inputElement.value).toBe("Avocado");
  expect(typeahead).toMatchInlineSnapshot(`
    <div
      data-testid="typeahead"
    >
      <input
        aria-label="typeahead-input"
        class="sc-bdfBwQ juMTdC"
        placeholder="Type..."
        type="text"
        value="Avocado"
      />
    </div>
  `);
});

test(`you should be able to search using the fuzzy search`, () => {
  // given
  const { inputElement, getByTestId } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "buas" } });
  // then
  expect(getByTestId("suggestions-list")).toHaveTextContent("Buddha's hand");
});

// userInputCases.forEach((userInput) =>
//   test(`you should see a list of suggestions when user types ${userInput}`, () => {
//     // given
//     const { inputElement, typeahead, getByTestId } = setup();
//
//     // when
//     fireEvent.change(inputElement, { target: { value: userInput } });
//
//     // then
//     const listElement = getByTestId("suggestions-list");
//     expect(typeahead).toMatchSnapshot();
//     expect(listElement).toBeInTheDocument();
//   })
// );
