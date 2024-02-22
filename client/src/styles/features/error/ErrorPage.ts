import styled from 'styled-components'

import theme from '../../theme'

const ErrorPage = styled.div`
  padding: ${theme.spacing.sectionAbsMarginX};

  .section {
    margin-bottom: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: ${theme.spacing.sectionPaddingX};
    padding-right: ${theme.spacing.sectionPaddingX};
    background-color: ${theme.color.white};
  }

  .message {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    line-height: 2.8rem;
  }

  .search {
    margin-bottom: 1.5rem;
    margin-left: ${theme.spacing.cancelDefaultPadding};
    margin-right: ${theme.spacing.cancelDefaultPadding};
  }

  .image-container {
    padding: 1rem;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
`

export default ErrorPage
