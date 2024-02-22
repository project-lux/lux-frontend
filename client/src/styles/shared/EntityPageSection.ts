import styled from 'styled-components'

import theme from '../theme'

const EntityPageSection = styled.div`
  background: ${theme.color.white};
  box-shadow: 1px 1px 5px ${theme.color.black20};
  border-radius: ${theme.border.radius};
  margin: 0 0 ${theme.spacing.sectionGap};
  padding: 1rem;

  .accordion-item {
    border-radius: ${theme.border.radius};
    border: none;
  }

  .accordion-item:first-child > h2 > .accordion-button {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .accordion-item:last-child > h2 > .accordion-button.collapsed {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

export default EntityPageSection
