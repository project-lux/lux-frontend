/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'

import { getColumnWidth } from '../../lib/util/ui'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'

import RecordLink from './RecordLink'
import ExpandableList from './ExpandableList'
import TextValue from './TextValue'
import TextLabel from './TextLabel'

interface ILinkData {
  content?: Array<string>
  label?: string
  expandColumns?: boolean
  additionalClassName?: string
  showAll?: boolean
  itemSpacing?: 'single' | 'double'
  length?: number
  rowClassName?: string
  id?: string
}

// Show an expandable list of links with a label in the left column
const LinkContainer: React.FC<ILinkData> = ({
  content,
  label,
  additionalClassName,
  expandColumns = false,
  showAll = false,
  itemSpacing = 'double',
  length,
  rowClassName = '',
  id = 'link-container',
}) => {
  const [textValueWidth, textLabelWidth] = getColumnWidth(
    expandColumns || false,
  )
  const desiredClassName = additionalClassName || ''
  let expandableListLength = 20

  if (showAll && length === undefined) {
    expandableListLength = 0
  }

  if (length !== undefined) {
    expandableListLength = length
  }

  const formatRecordLinks = (links: Array<string>): JSX.Element[] =>
    links.map((link, ind) => <RecordLink key={`${link}_${ind}`} url={link} />)

  if (content && content.length > 0) {
    return (
      <StyledDataRow className={`row ${rowClassName}`} id={id} data-testid={id}>
        {label !== undefined && (
          <TextLabel label={label} className={textLabelWidth} />
        )}
        <ExpandableList
          className={textValueWidth}
          length={expandableListLength}
          itemSpacing={itemSpacing}
        >
          <TextValue
            values={formatRecordLinks(content)}
            className={`${textValueWidth} ${desiredClassName}`}
            itemSpacing={itemSpacing}
          />
        </ExpandableList>
        {!expandColumns && <StyledHr />}
      </StyledDataRow>
    )
  }

  return null
}

export default LinkContainer
