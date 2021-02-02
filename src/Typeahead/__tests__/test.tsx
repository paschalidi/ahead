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

test(`you should see the suggestion you choose by clicking on the input`, () => {
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

test(`after you chose a suggestion by clicking you should be able to type again in the input`, () => {
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

test(`after you chose a suggestion by clicking you should be able to type again _and_ make choose another suggestion`, () => {
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

test(`you should see the suggestion you choose by pressing enter on the input`, () => {
  // given
  const { inputElement, typeahead } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "a" } });
  // and
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    keyCode: 13,
  });

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

test(`after you chose a suggestion by pressing enter you should be able to type again in the input`, () => {
  // given
  const { inputElement, typeahead } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "a" } });
  // and
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    keyCode: 13,
  });
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

test(`after you chose a suggestion by clicking you should be able to type again _and_ make choose another suggestion`, () => {
  // given
  const { inputElement, typeahead } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "a" } });
  // and
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    keyCode: 13,
  });
  // and
  fireEvent.change(inputElement, { target: { value: "avoca" } });
  // and
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    keyCode: 13,
  });

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

test(`you should be able using the keyboard to reach the bottom of the list and chose a suggestion`, () => {
  // given
  const { inputElement, typeahead } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "plu" } });
  fireEvent.keyDown(inputElement, {
    key: "ArrowDown",
    keyCode: 40,
  });
  fireEvent.keyDown(inputElement, {
    key: "ArrowDown",
    keyCode: 40,
  });
  fireEvent.keyDown(inputElement, {
    key: "ArrowDown",
    keyCode: 40,
  });
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    keyCode: 13,
  });

  // then
  expect(inputElement.value).toBe("Plumcot");
  expect(typeahead).toMatchInlineSnapshot(`
    <div
      data-testid="typeahead"
    >
      <input
        aria-label="typeahead-input"
        class="sc-bdfBwQ juMTdC"
        placeholder="Type..."
        type="text"
        value="Plumcot"
      />
    </div>
  `);
});

test(`you should be able using the keyboard to reach the bottom _and_ then the top of the list and chose a suggestion`, () => {
  // given
  const { inputElement, typeahead } = setup();

  // when
  fireEvent.change(inputElement, { target: { value: "plu" } });
  fireEvent.keyDown(inputElement, {
    key: "ArrowDown",
    keyCode: 40,
  });
  fireEvent.keyDown(inputElement, {
    key: "ArrowDown",
    keyCode: 40,
  });
  fireEvent.keyDown(inputElement, {
    key: "ArrowDown",
    keyCode: 40,
  });
  fireEvent.keyDown(inputElement, {
    key: "ArrowUp",
    keyCode: 38,
  });
  fireEvent.keyDown(inputElement, {
    key: "ArrowUp",
    keyCode: 38,
  });
  fireEvent.keyDown(inputElement, {
    key: "Enter",
    keyCode: 13,
  });

  // then
  expect(inputElement.value).toBe("Japanese plum");
  expect(typeahead).toMatchInlineSnapshot(`
    <div
      data-testid="typeahead"
    >
      <input
        aria-label="typeahead-input"
        class="sc-bdfBwQ juMTdC"
        placeholder="Type..."
        type="text"
        value="Japanese plum"
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

const userInputCases = ["cherr", "plum", "avo", "apple", "aç"];

userInputCases.forEach((userInput) =>
  test(`you should see a list of suggestions when user types ${userInput}`, () => {
    // given
    const { inputElement, typeahead, getByTestId } = setup();

    // when
    fireEvent.change(inputElement, { target: { value: userInput } });

    // then
    const listElement = getByTestId("suggestions-list");
    expect(typeahead).toMatchSnapshot();
    expect(listElement).toBeInTheDocument();
  })
);
