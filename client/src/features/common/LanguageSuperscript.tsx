/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react'

import StyledSup from '../../styles/features/common/Sup'

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

  if (recordLinkHas404) {
    return null
  }

  return (
    <StyledSup className={className} data-testid={`${id}-language-superscript`}>
      (<RecordLink url={language} returns404={setRecordLinkHas404} />)
    </StyledSup>
  )
}

export default LanguageSuperscript
