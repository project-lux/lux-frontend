import React, { useState } from 'react'

import StyledSup from '../../styles/features/common/Sup'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

import RecordLink from './RecordLink'

interface IProps {
  language: string
  id: string
  className?: string
}

const LanguageSuperscript: React.FC<IProps> = ({
  language,
  id,
  className = '',
}) => {
  const [recordLinkHas404, setRecordLinkHas404] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )

  useResizeableWindow(setIsMobile)

  if (recordLinkHas404) {
    return null
  }

  const link = <RecordLink url={language} returns404={setRecordLinkHas404} />

  if (isMobile) {
    return (
      <span className={className} data-testid={`${id}-language-superscript`}>
        ({link})
      </span>
    )
  }

  return (
    <StyledSup className={className} data-testid={`${id}-language-superscript`}>
      ({link})
    </StyledSup>
  )
}

export default LanguageSuperscript
