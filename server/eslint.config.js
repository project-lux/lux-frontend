/* eslint-disable import/no-unresolved */
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import _import from "eslint-plugin-import"
import prettier from "eslint-plugin-prettier"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import stylistic from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

// eslint.config.js
export default [
  ...fixupConfigRules(compat.extends(
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
  )),
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: "module",

      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
            jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      prettier,
      "@stylistic": stylistic,
    },
    files: ["src/**/*.ts", "src/**/*.tsx"],
    ignores: [
      'dist/',
      'coverage/',
      'node_modules/',
      'pnpm-lock.yaml',
      'package.json',
      '/src/serviceWorker.ts',
      'eslint.config.js',
      'public/'
    ],
    rules: {
      "@typescript-eslint/consistent-type-assertions": [2],
      "@typescript-eslint/camelcase": 0,
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true
        }
      ],
      "@stylistic/member-delimiter-style": [
        2,
        {
          multiline: {
            delimiter: "none"
          }
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "^I[A-Z]",
            match: true
          }
        }
      ],
      "@typescript-eslint/no-explicit-any": 1,
      "@typescript-eslint/no-shadow": 2,
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-use-before-define": [1],
      "eol-last": 2,
      "import/extensions": [
        "error",
        "always",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never"
        }
      ],
      "import/namespace": [
        2,
        {
          allowComputed: true
        }
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true
        }
      ],
      "import/no-named-as-default": 0,
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always"
        }
      ],
      "import/prefer-default-export": 0,
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true
        }
      ],
      "no-param-reassign": [2, { props: false }],
      "no-prototype-builtins": 0,
      "no-shadow": 0,
      "no-underscore-dangle": 0,
      "no-use-before-define": [0],
      "prettier/prettier": 2,
      "no-console": 0,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts"]
        }
      }
    },
  }
]
