import React from 'react'

import StyledDataRow from '../../styles/shared/DataRow'

import ExternalLink from './ExternalLink'
import TextValue from './TextValue'
import ExpandableList from './ExpandableList'
import TextLabel from './TextLabel'

/**
 * @param {Array<string>} webPagesan IEntity representing a LUX document
 */
const WebPages: React.FC<{ webPages: Array<string> }> = ({ webPages }) => {
  if (webPages.length > 0) {
    return (
      <StyledDataRow className="row">
        <TextLabel label="Web Pages" className="col-md-12" />
        <ExpandableList className="col-md-12">
          <TextValue
            values={webPages.map((url: string, ind: number) => (
              <ExternalLink
                key={url}
                url={url}
                name={url}
                id={`person-group-web-page-${ind}`}
              />
            ))}
          />
        </ExpandableList>
      </StyledDataRow>
    )
  }

  return null
}

export default WebPages
