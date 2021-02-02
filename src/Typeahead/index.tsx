import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { defaultSuggestions } from "./constants";
import { StyledInput, StyledList, TransparentButton } from "./styles";

type Suggestions = Array<string>;

interface TypeaheadProps {
  suggestions?: Suggestions;
  placeholder?: string;
  disabled?: boolean;
  // todo add styles
  // styles?: object;
  // className?: string;
}

export function Typeahead({
  // className = "",
  // styles = {},
  placeholder = "Type...",
  disabled = false,
  suggestions = defaultSuggestions,
}: TypeaheadProps) {
  const [userInput, setText] = useState("");
  const [selectedSuggestion, setSelected] = useState(0);
  const [displayList, toggleListVisibility] = useState(true);
  const [suggestionFromHovering, setSuggestionOnHover] = useState("");

  const filtered: Array<string> = useMemo(
    () => suggestions.filter((word) => userInput && word.includes(userInput)),
    [suggestions, userInput]
  );

  const select = (position: number, word: string) => {
    setText(word);
    setSelected(position);
    setSuggestionOnHover("");
    toggleListVisibility(false);
  };

  const onKeyDown = (e: { currentTarget: any; keyCode: number }) => {
    debugger;
    // 13 is enter
    if (e.keyCode === 13) {
      setSelected(selectedSuggestion);
    }
    // 38 is arrow up
    else if (e.keyCode === 38) {
      e.currentTarget.scrollIntoView();
      if (selectedSuggestion === 0) {
        return;
      }
      setSelected(selectedSuggestion - 1);
    }
    // 40 is arrow down
    else if (e.keyCode === 40) {
      e.currentTarget.scrollIntoView();
      if (selectedSuggestion - 1 === filtered.length) {
        return;
      }

      setSelected(selectedSuggestion + 1);
    }
  };

  return (
    <>
      <StyledInput
        onChange={(event): void => {
          setText(event.target.value);
          toggleListVisibility(true);
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={
          suggestionFromHovering === "" ? userInput : suggestionFromHovering
        }
        type="text"
        disabled={disabled}
      />

      {displayList && filtered.length ? (
        <StyledList>
          {filtered.map((word, index) => (
            <li key={uuidv4()}>
              <TransparentButton
                isSelected={index === selectedSuggestion}
                type="button"
                onClick={() => {
                  select(index, word);
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
