import React from 'react'

import WorkParser from '../../lib/parse/data/WorkParser'
import StyledHr from '../../styles/shared/Hr'
import StyledDataRow from '../../styles/shared/DataRow'
import theme from '../../styles/theme'
import IEntity from '../../types/data/IEntity'
import ExternalLink from '../common/ExternalLink'

interface IProps {
  entity: IEntity
}

const HowDoISeeIt: React.FC<IProps> = ({ entity }) => {
  const object = new WorkParser(entity)
  const siteLinks = object.getAllSiteLinks()
  const otherLinks = object.getHowDoISeeItLinks()
  const links = [...siteLinks, ...otherLinks]

  if (links.length === 0) {
    return null
  }

  const displayLinks = (): JSX.Element[] =>
    links.map((link, ind) => (
      <div
        key={link.link}
        className="col-12"
        style={{ marginBottom: theme.spacing.verticalItemDoubleSpacing }}
        data-testid={`works-site-links-${ind}`}
      >
        <ExternalLink
          url={link.link}
          name={
            link.contentIdentifier !== '' ? link.contentIdentifier : link.link
          }
        />
        <br />
      </div>
    ))

  return (
    <React.Fragment>
      <StyledDataRow className="row">
        {links.length > 0 && (
          <React.Fragment>
            <div className="col-12">
              <h2 data-testid="works-how-do-i-see-it">How do I see it?</h2>
            </div>
            <div className="row">{displayLinks()}</div>
            <StyledHr />
          </React.Fragment>
        )}
      </StyledDataRow>
    </React.Fragment>
  )
}

export default HowDoISeeIt
