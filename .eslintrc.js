module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
    "airbnb-typescript",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  plugins: ["react-hooks", "@typescript-eslint/eslint-plugin"],
  rules: {
    "no-debugger": 1,
    "react/require-default-props": [
      2,
      { forbidDefaultForRequired: true, ignoreFunctionalComponents: true },
    ],

    "jsx-a11y/label-has-associated-control": [
      "error",
      { required: { some: ["nesting", "id"] } },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  ignorePatterns: ["types/**/*"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
};
