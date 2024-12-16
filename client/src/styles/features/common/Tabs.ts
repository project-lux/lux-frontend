import styled from 'styled-components'

import theme from '../../theme'

const StyledTabs = styled.div`
  ul > *:not(:last-child) {
    margin-right: 20px;
  }

  .nav-tabs + p {
    border: 1px solid #bbb;
    border-top: none;
  }

  li {
    flex: 1;
  }

  button.nav-link {
    margin-bottom: 16px;
    padding-left: ${theme.spacing.sectionPaddingX};
    padding-right: ${theme.spacing.sectionPaddingX};
  }
`

export default StyledTabs
