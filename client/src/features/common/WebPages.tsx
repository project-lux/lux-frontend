import React from 'react'

import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'

import ExternalLink from './ExternalLink'
import TextValue from './TextValue'
import ExpandableList from './ExpandableList'
import TextLabel from './TextLabel'

/**
 * @param {Array<string>} webPages IEntity representing a LUX document
 */
const WebPages: React.FC<{ webPages: Array<string> }> = ({ webPages }) => {
  if (webPages.length > 0) {
    return (
      <React.Fragment>
        <StyledHr width="100%" />
        <h3>Web Pages</h3>
        <StyledDataRow className="row">
          <TextLabel className="col-md-12" />
          <ExpandableList
            className="col-md-12"
            hrClassName="hideOnAboutSectionSidePanels"
          >
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
      </React.Fragment>
    )
  }

  return null
}

export default WebPages
