import React from 'react'

import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import ExpandableList from '../common/ExpandableList'
import TextValue from '../common/TextValue'
import TextLabel from '../common/TextLabel'

import DetailedLink from './DetailedLink'

interface ILinkData {
  content?: Array<string>
  label?: string
  expandColumns?: boolean
  id?: string
}

// Show an expandable list of links with a label in the left column
const DetailedLinkContainer: React.FC<ILinkData> = ({
  content,
  label,
  expandColumns = false,
  id = 'link-container',
}) => {
  const formatRecordLinks = (links: Array<string>): JSX.Element[] =>
    links.map((link) => <DetailedLink uri={link} key={link} />)

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
          <TextValue
            values={formatRecordLinks(content)}
            className="col-12"
            itemSpacing="double"
          />
        </ExpandableList>
        {!expandColumns && <StyledHr />}
      </StyledDataRow>
    )
  }

  return null
}

export default DetailedLinkContainer
