import React, { useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultSuggestions } from "./constants";
import { StyledInput, StyledList, TransparentButton } from "./styles";

type Suggestions = Array<string>;
type ReactEvent = React.FormEvent<HTMLInputElement>;
interface TypeaheadProps {
  suggestions?: Suggestions;
  placeholder?: string;
  disabled?: boolean;
  // todo add styles
  // styles?: object;
  // className?: string;
}

const useFilteredSuggestions = (
  suggestions: Suggestions,
  userInput: string
): Suggestions => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let l;
  return useMemo(
    () =>
      suggestions
        // happens that sometimes user can give array with duplicates.
        // we want to avoid having duplicated on out suggestions.
        // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter(
          (word) =>
            userInput && word.toLowerCase().includes(userInput.toLowerCase())
        ),
    [suggestions, userInput]
  );
};

export function Typeahead({
  // className = "",
  // styles = {},
  placeholder = "Type...",
  disabled = false,
  suggestions = defaultSuggestions,
}: TypeaheadProps) {
  const [userInput, setText] = useState("");
  const [activeSuggestionIndex, setActiveSuggestion] = useState(0);
  const [displayList, toggleListVisibility] = useState(true);
  const [suggestionFromHovering, setSuggestionOnHover] = useState("");
  const listReference = useRef<HTMLUListElement>(null);

  const filtered = useFilteredSuggestions(suggestions, userInput);

  const setSelection = (position: number, word: string) => {
    setText(word);
    setActiveSuggestion(position);
    toggleListVisibility(false);
    setSuggestionOnHover("");
  };

  const onInputChange = (e: ReactEvent): void => {
    setText(e.currentTarget.value);
    setActiveSuggestion(0);
    toggleListVisibility(true);
  };

  const onInputKeyDown = (e: { keyCode: number }) => {
    const scrollActiveElementIntoView = (block: "end" | "start") => {
      const { current } = listReference;
      if (current && current.children[activeSuggestionIndex]) {
        current.children[activeSuggestionIndex].scrollIntoView({ block });
      }
    };
    // 13 is enter
    if (e.keyCode === 13) {
      setSelection(activeSuggestionIndex, filtered[activeSuggestionIndex]);
    }
    // 38 is arrow up
    else if (e.keyCode === 38 && activeSuggestionIndex !== 0) {
      setActiveSuggestion(activeSuggestionIndex - 1);
      scrollActiveElementIntoView("end");
    }
    // 40 is arrow down
    else if (
      e.keyCode === 40 &&
      activeSuggestionIndex + 1 !== filtered.length
    ) {
      setActiveSuggestion(activeSuggestionIndex + 1);
      scrollActiveElementIntoView("start");
    }
  };

  return (
    <>
      <StyledInput
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        placeholder={placeholder}
        value={
          suggestionFromHovering === "" ? userInput : suggestionFromHovering
        }
        type="text"
        disabled={disabled}
      />

      {displayList && filtered.length ? (
        <StyledList ref={listReference}>
          {filtered.map((word, index) => (
            <li key={uuidv4()}>
              <TransparentButton
                isSelected={index === activeSuggestionIndex}
                type="button"
                onClick={() => {
                  setSelection(index, word);
                }}
                onMouseEnter={() => {
                  setSuggestionOnHover(word);
                }}
                onMouseLeave={() => {
                  setSuggestionOnHover("");
                }}
              >
                {word}
              </TransparentButton>
            </li>
          ))}
        </StyledList>
      ) : null}
    </>
  );
}

// todo
//  1. set selected
//  2. set semi-selected on hover
//  3. color the selection
//  4. keys
