import { Row } from 'react-bootstrap'
import styled from 'styled-components'

import { BorderedDiv } from '../../shared/BorderedDiv'
import theme from '../../theme'

export const StyledFaqPageHeader = styled(Row)`
  background-color: ${theme.color.white};
  margin: 0;
  padding: ${theme.faqPage.h1.paddingY} ${theme.spacing.contentAbsMarginX};
`

export const StyledFaqPage = styled.div`
  margin: 0;
  background-color: ${theme.color.offWhite};

  div.faq-body {
    padding-top: ${theme.contentPage.headerGap};
    padding-bottom: ${theme.contentPage.footerGap};
    padding-left: ${theme.spacing.sectionAbsMarginX};
  }

  div.main-column {
    width: 100%;
  }

  div.side-column {
    margin-left: auto;
  }

  button.back-to-top {
    border: none;
    background-color: inherit;
    color: ${theme.color.link};
    margin-left: auto;
  }
`

export const StyledFaqGroupSection = styled(BorderedDiv)`
  margin: 0;
  background-color: ${theme.color.white};

  h2 {
    margin: 0;
    padding: ${theme.faqPage.h2.paddingY} ${theme.spacing.sectionPaddingX};
    font-size: ${theme.faqPage.h2.fontSize};
  }

  .accordion-item {
    border: 0;

    h3.accordion-header {
      border-style: solid;
      border-width: 2px 0 0;
      border-color: ${theme.color.lightGray};
      font-size: ${theme.faqPage.h3.fontSize};
      font-weight: ${theme.faqPage.h3.fontWeight};
      line-height: ${theme.faqPage.h3.lineHeight};
    }

    button.accordion-button {
      padding: 0 ${theme.spacing.sectionPaddingX};
      border-radius: 0;

      &:focus {
        background-color: ${theme.color.white};
      }

      &:not(.collapsed) {
        background-color: ${theme.color.white};
      }
    }

    div.accordion-collapse {
      padding: 1.5rem ${theme.spacing.sectionPaddingX};

      ul {
        padding-left: 32px;
      }
    }

    &:last-child {
      border-radius: 0 0 8px 8px;

      h3.accordion-header {
        border-radius: 0 0 8px 8px;

        button.accordion-button {
          border-radius: 0 0 8px 8px;

          &:not(.collapsed) {
            border-radius: 0;
          }
        }
      }
    }
  }
`
