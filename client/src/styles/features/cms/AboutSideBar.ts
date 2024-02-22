import styled from 'styled-components'

import theme from '../../theme'

const AboutSideBar = styled.div`
  border-radius: ${theme.border.radius};
  box-shadow: 1px 1px 5px ${theme.color.black20};

  padding-left: 0px;
  padding-right: 0px;
  margin-bottom: 1rem;

  background-color: ${theme.color.white};

  @media (min-width: ${theme.breakpoints.lg}px) {
    margin-bottom: auto;
  }

  a {
    display: block;
    border-bottom: solid 3px #e7e7e7;
    padding: 14px ${theme.spacing.sectionPaddingX};

    width: 100%;
    height: 100%;
    font-weight: ${theme.font.weight.regular};
    color: ${theme.color.black};

    &:first-child {
      border-radius: 8px 8px 0 0;
    }

    &:last-child {
      border-bottom: none;
      border-radius: 0 0 8px 8px;
    }

    &:hover {
      background-color: ${theme.color.offWhite};
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

export default AboutSideBar
