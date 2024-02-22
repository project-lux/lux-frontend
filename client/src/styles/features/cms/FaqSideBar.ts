import styled from 'styled-components'

import theme from '../../theme'

const FaqSideBar = styled.div`
  border: solid 1px ${theme.color.black20};
  border-radius: ${theme.border.radius};
  box-shadow: 1px 1px 5px ${theme.color.black20};

  margin-top: 32px;
  margin-bottom: auto;

  background-color: ${theme.color.primary.teal};
  color: ${theme.color.white};

  a {
    display: block;
    border-bottom: solid 3px #e7e7e7;
    padding: 14px 21px;

    width: 100%;
    height: 100%;
    font-weight: ${theme.font.weight.regular};
    color: ${theme.color.white};

    &:last-child {
      border-bottom: none;
    }

    &.active {
      background-color: ${theme.color.primary.teal};
      color: ${theme.color.white};
    }
  }

  .link-container {
    border-bottom: solid 3px #e7e7e7;
    padding: 14px 21px;

    &:last-child {
      border-bottom: none;
    }

    &.active {
      background-color: ${theme.color.primary.teal};

      a {
        color: ${theme.color.white};
      }
    }
  }
`

export default FaqSideBar
