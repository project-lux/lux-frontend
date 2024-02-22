import React from 'react'

import { access } from '../../config/tooltips'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import IEntity from '../../types/data/IEntity'
import ExternalLink from '../common/ExternalLink'
import NotesContainer from '../common/NotesContainer'

interface IProps {
  entity: IEntity
}

const HowDoISeeIt: React.FC<IProps> = ({ entity }) => {
  const object = new ObjectParser(entity)
  const accessStatement = object.getAccessStatement()
  const links = [...object.getAllSiteLinks(), ...object.getHowDoISeeItLinks()]
  const accessPoints = object.getAccessPoints()

  return (
    <StyledDataRow className="row">
      <div className="col-12">
        <h2>How do I see it?</h2>
      </div>
      <dl data-testid="object-how-do-i-see-it">
        {accessStatement.length > 0 && (
          <React.Fragment>
            <NotesContainer
              notes={{ access: accessStatement }}
              id="object-access-statement"
              expandColumns
              labelTooltipText={access}
            />
          </React.Fragment>
        )}
      </dl>
      {accessPoints.length > 0 &&
        accessPoints.map((accessPoint) => (
          <ExternalLink
            key={accessPoint.id}
            url={accessPoint.id}
            name={
              accessPoint.content !== '' ? accessPoint.content : 'Access Point'
            }
            style={{ marginBottom: theme.spacing.verticalItemDoubleSpacing }}
          />
        ))}
      {links.map((link) => (
        <div
          key={link.link}
          className="col-12"
          style={{ marginBottom: theme.spacing.verticalItemDoubleSpacing }}
          data-testid="object-site-links"
        >
          <ExternalLink
            url={link.link}
            name={
              link.contentIdentifier !== '' ? link.contentIdentifier : link.link
            }
          />
        </div>
      ))}
      <StyledHr />
    </StyledDataRow>
  )
}

export default HowDoISeeIt
