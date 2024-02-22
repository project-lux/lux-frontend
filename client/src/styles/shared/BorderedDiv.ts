import styled from 'styled-components'

import theme from '../theme'

export const BorderedDiv = styled.div`
  border-radius: ${theme.border.radius};
  box-shadow: 1px 1px 5px ${theme.color.black20};
`
export const ToppedBorderedDiv = styled(BorderedDiv)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-style: solid;
  border-top-width: 8px;
  border-top-color: ${theme.color.primary.teal};
`
