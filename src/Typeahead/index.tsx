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
      <input
        onChange={(event): void => {
          setText(event.target.value);
        }}
        value={userInput}
        type="text"
        disabled={disabled}
      />
      {filtered.map((word) => (
        <div>{word}</div>
      ))}
    </>
  );
}
