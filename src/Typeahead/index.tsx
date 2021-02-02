import React, { useMemo, useState } from "react";
import { defaultSuggestions } from "./constants";

export interface TypeaheadProps {
  suggestions?: Array<string>;
  disabled?: boolean;
  // todo add styles
  styles?: object;
  className?: string;
}

export function Typeahead({
  // className = "",
  // styles = {},
  placeholder = "Type...",
  disabled = false,
  suggestions = defaultSuggestions,
}: TypeaheadProps) {
  const [userInput, setText] = useState("");

  const filtered: Array<string> = useMemo(
    () => suggestions.filter((word) => userInput && word.includes(userInput)),
    [suggestions, userInput]
  );
  return (
    <>
      <StyledInput
        onChange={(event): void => {
          setText(event.target.value);
        }}
        value={userInput}
        type="text"
        disabled={disabled}
      />

      {displayList && filtered.length ? (
        <StyledList>
          {filtered.map((word, index) => (
            <li key={uuidv4()}>
              <TransparentButton
                isSelected={index === selectedSuggestion}
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
