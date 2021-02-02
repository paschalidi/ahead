import React, { useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import fuzzysearch from "fuzzysearch";
import { defaultSuggestions } from "./constants";
import { StyledInput, StyledList, TransparentButton } from "./styles";

type Suggestions = Array<string>;
type ReactEvent = React.FormEvent<HTMLInputElement>;
interface TypeaheadProps {
  suggestions?: Suggestions;
  placeholder?: string;
  disabled?: boolean;
}

const useFilteredSuggestions = (
  suggestions: Suggestions,
  userInput: string
): Suggestions =>
  useMemo(
    () =>
      suggestions
        // happens that sometimes user can give array with duplicates.
        // we want to avoid having duplicated on out suggestions.
        // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter(
          (suggestion) =>
            userInput &&
            fuzzysearch(userInput.toLowerCase(), suggestion.toLowerCase())
        ),
    [suggestions, userInput]
  );

const MarkedSuggestions = ({
  suggestion,
  userInput,
}: {
  suggestion: string;
  userInput: string;
}) => {
  const regex = new RegExp(userInput, "gi");
  const originalMatch = suggestion.match(regex);
  const userInputInPieces = suggestion.split(regex);

  const deriveMarkedSuggestions = (item: string, index: number) => {
    const lastItem = index === userInputInPieces.length - 1;
    if (!lastItem) {
      return (
        <span key={uuidv4()}>
          {item}
          <span className="coloredText">
            {originalMatch && originalMatch[index]}
          </span>
        </span>
      );
    }
    return <span key={uuidv4()}>{item}</span>;
  };

  return (
    <>{userInputInPieces.map(deriveMarkedSuggestions)}</>
  );
};

export function Typeahead({
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

  const resetSelection = () => {
    setActiveSuggestion(0);
    toggleListVisibility(true);
  };

  const onInputChange = (e: ReactEvent): void => {
    setText(e.currentTarget.value);
    resetSelection();
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
    <div data-testid="typeahead">
      <StyledInput
        aria-label="typeahead-input"
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
        <StyledList data-testid="suggestions-list" ref={listReference}>
          {filtered.map((suggestion, index) => (
            <li key={uuidv4()}>
              <TransparentButton
                isSelected={index === activeSuggestionIndex}
                type="button"
                onClick={() => {
                  setSelection(index, suggestion);
                }}
                onMouseEnter={() => {
                  setSuggestionOnHover(suggestion);
                }}
                onMouseLeave={() => {
                  setSuggestionOnHover("");
                }}
              >
                <MarkedSuggestions
                  suggestion={suggestion}
                  userInput={userInput}
                />
              </TransparentButton>
            </li>
          ))}
        </StyledList>
      ) : null}
    </div>
  );
}
