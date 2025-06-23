import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import ExpandableList from '../common/ExpandableList'
import TextValue from '../common/TextValue'
import TextLabel from '../common/TextLabel'
import { isObjectOrWork } from '../../lib/util/uri'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import RecordLink from '../common/RecordLink'

interface ILinkData {
  content: Array<Array<string> | string>
  label?: string
  expandColumns?: boolean
  id?: string
}

// Show an expandable list of links with a label in the left column
const AboutSubsection: React.FC<ILinkData> = ({
  content,
  label,
  expandColumns = false,
  id = 'link-container',
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const { pathname } = useLocation()

  useResizeableWindow(setIsMobile)

  const values = content.map((c: Array<string> | string) => {
    return (
      <React.Fragment>
        {Array.isArray(c) ? (
          c.map((link, ind: number) => (
            <React.Fragment>
              <RecordLink url={link} /> {ind !== c.length - 1 ? ' -- ' : ''}
            </React.Fragment>
          ))
        ) : (
          <RecordLink url={c} />
        )}
      </React.Fragment>
    )
  })

  if (content && content.length > 0) {
    return (
      <StyledDataRow className="row" id={id} data-testid={id}>
        {label !== undefined && (
          <TextLabel label={label} className="col-md-3 col-sm-12" />
        )}
        <ExpandableList
          className="col-md-9 col-sm-12"
          length={20}
          itemSpacing="double"
        >
          <TextValue values={values} className="col-12" itemSpacing="double" />
        </ExpandableList>
        <StyledHr
          className="linkContainerHr"
          hidden={expandColumns || (isObjectOrWork(pathname) && isMobile)}
        />
      </StyledDataRow>
    )
  }

  return null
}

export default AboutSubsection
