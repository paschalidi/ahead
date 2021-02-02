import styled from "styled-components";
import { colors } from "../constants/colors";

const width = 300;

export const StyledInput = styled.input`
  padding-left: 8px;
  outline: 0px;
  border: 1px solid ${colors.secondary};
  width: calc(${width - 10}px + 1rem);
  height: 32px;
  border-radius: 0;
  transition: border-color 0.2s ease;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    border: 1px solid ${colors.active};
  }
`;

export const StyledList = styled.ul`
  border: 1px solid ${colors.divider};
  list-style: none;
  overflow-y: auto;
  margin-top: 0;
  padding: 0;
  max-height: 120px;
  width: calc(${width}px + 1rem);

  .coloredText {
    color: ${colors.active};
  }
`;

export const TransparentButton = styled.button<{ isSelected: boolean }>`
  height: 100%;
  width: 100%;
  text-align: left;
  padding: 12px;

  box-shadow: 0px 0px 0px transparent;
  border: 0px solid transparent;
  text-shadow: 0px 0px 0px transparent;
  transition: background-color 0.2s ease;
  background: ${({ isSelected }) =>
    isSelected ? colors.activeLight : "transparent"};
  color: ${({ isSelected }) =>
    isSelected ? colors.white : colors.textPrimary};

  &:hover {
    background: ${colors.activeLight};
    color: ${colors.white};
    cursor: pointer;
    box-shadow: 0px 0px 0px transparent;
    border: 0px solid transparent;
    text-shadow: 0px 0px 0px transparent;
  }

  &:active {
    outline: none;
    border: none;
  }

  &:focus {
    outline: none;
  }
`;
