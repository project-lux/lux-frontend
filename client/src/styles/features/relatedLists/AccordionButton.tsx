import styled from 'styled-components'

import theme from '../../theme'

const AccordionButton = styled.button`
  color: ${theme.color.black};
  letter-spacing: 0;
  text-align: left;
  font-size: 0.75em;
  line-height: ${theme.font.mobile.h2.lineHeight};
  font-weight: ${theme.font.mobile.h2.weight};

  @media (min-width: ${theme.breakpoints.md}px) {
    font-size: ${theme.font.desktop.h2.size};
    line-height: ${theme.font.desktop.h2.lineHeight};
    font-weight: ${theme.font.desktop.h2.weight};
  }
`

export default AccordionButton
