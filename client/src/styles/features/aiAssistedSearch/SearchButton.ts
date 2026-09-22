import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../theme'

const SearchButton = styled(Button)`
  background:
    linear-gradient(${theme.color.white}, ${theme.color.white}) padding-box,
    linear-gradient(
        90deg,
        ${theme.color.primary.darkBlue},
        ${theme.color.primary.blue}
      )
      border-box;
  background-color: ${theme.color.white};
  color: ${theme.color.black};
  border-radius: 10px;
  border: 3px solid transparent;
  font-size: 16px;
  font-weight: ${theme.font.weight.bold};
  text-decoration: none;

  &:disabled {
    background:
      linear-gradient(${theme.color.white}, ${theme.color.white}) padding-box,
      linear-gradient(
          90deg,
          ${theme.color.primary.darkBlue},
          ${theme.color.primary.blue}
        )
        border-box;
    color: ${theme.color.black};
    border-color: transparent;
  }

  &:hover {
    background:
      linear-gradient(${theme.color.white}, ${theme.color.white}) padding-box,
      linear-gradient(
          90deg,
          ${theme.color.primary.darkBlue},
          ${theme.color.primary.blue}
        )
        border-box;
    border-color: transparent;
    color: ${theme.color.black};
  }

  &.btn:active {
    background:
      linear-gradient(${theme.color.white}, ${theme.color.white}) padding-box,
      linear-gradient(
          90deg,
          ${theme.color.primary.darkBlue},
          ${theme.color.primary.blue}
        )
        border-box;
    border-color: transparent;
    color: ${theme.color.black};
  }

  &.feedbackButton {
    font-size: 1.25rem;
  }

  &.relatedListPaginationButton {
    padding: 0.5rem;
    margin: 0px;

    &.previous {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;

      @media (min-width: ${theme.breakpoints.md}px) {
        border-radius: 10px;
      }
    }

    &.next {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;

      @media (min-width: ${theme.breakpoints.md}px) {
        border-radius: 10px;
      }
    }

    @media (min-width: ${theme.breakpoints.md}px) {
      margin: 0.25em;
      padding: 1rem;
    }
  }

  &.addToCollectionOnEntityPageButton {
    background-color: ${theme.color.lightGray};
    color: ${theme.color.black};
  }
`

export default SearchButton
