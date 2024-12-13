import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { getColumnWidth } from '../../lib/util/ui'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

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

const isObjectOrWork = (pathname: string): boolean => {
  const tabs = ['object', 'digital', 'visual', 'set', 'text']
  for (const tab of tabs) {
    if (pathname.includes(tab)) {
      return true
    }
  }
  return false
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
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const { pathname } = useLocation()
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

  useResizeableWindow(setIsMobile)

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
        <StyledHr
          className="linkContainerHr"
          hidden={expandColumns || (isObjectOrWork(pathname) && isMobile)}
        />
        {/* {!expandColumns && <StyledHr className="linkContainerHr" />} */}
      </StyledDataRow>
    )
  }

  return null
}

export default LinkContainer
