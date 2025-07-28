import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../theme'

const PrimaryButton = styled(Button)`
  background-color: ${theme.color.primary.teal};
  color: ${theme.color.white};
  border-radius: 10px;
  border-color: ${theme.color.primary.teal};
  font-size: 16px;
  font-weight: ${theme.font.weight.bold};
  padding: 1rem;
  text-decoration: none;

  &:disabled {
    background-color: ${theme.color.primary.teal};
    color: ${theme.color.white};
    border-color: ${theme.color.primary.teal};
  }

  &:hover {
    background-color: ${theme.color.primary.teal};
    border-color: ${theme.color.primary.teal};
    color: ${theme.color.white};
  }

  &.btn:active {
    background-color: ${theme.color.primary.teal};
    border-color: ${theme.color.primary.teal};
    color: ${theme.color.white};
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

  &.objectsContainerSearchLink {
    background-color: ${theme.color.white};
    color: ${theme.color.link};
    padding: 0px;
    border: none;

    @media (min-width: ${theme.breakpoints.md}px) {
      background-color: ${theme.color.primary.teal};
      color: ${theme.color.white};
      border-radius: 10px;
      border-color: ${theme.color.primary.teal};
      font-size: 16px;
      font-weight: ${theme.font.weight.bold};
      padding: 1rem;
      text-decoration: none;
    }
  }

  &.addToCollectionOnEntityPageButton {
    background-color: ${theme.color.lightGray};
    color: ${theme.color.black};
  }
`

export default PrimaryButton
