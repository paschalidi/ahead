import React from "react";
import { v4 as uuidv4 } from "uuid";

export const MarkedSuggestions = ({
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

  return <>{userInputInPieces.map(deriveMarkedSuggestions)}</>;
};
