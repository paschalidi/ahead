import React from "react";
import { storiesOf } from "@storybook/react";
import { Typeahead } from "./index";

storiesOf("Typeahead", module)
  .add("default", () => <Typeahead />)
  .add("disabled", () => <Typeahead disabled />)
  .add("custom placeholder", () => <Typeahead placeholder="type here" />);
