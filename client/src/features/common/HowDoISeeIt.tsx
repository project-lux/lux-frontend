import React from 'react'

import { access } from '../../config/tooltips'
import EntityParser from '../../lib/parse/data/EntityParser'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import theme from '../../styles/theme'
import IEntity from '../../types/data/IEntity'
import StyledDl from '../../styles/shared/DescriptionList'
import { searchTypes } from '../../config/searchTypes'

import ExternalLink from './ExternalLink'
import NotesContainer from './NotesContainer'

interface IProps {
  data: IEntity
}

const HowDoISeeIt: React.FC<IProps> = ({ data }) => {
  const entity = new EntityParser(data)
  const accessStatement = entity.getAccessStatement()
  const links = [...entity.getAllSiteLinks(), ...entity.getHowDoISeeItLinks()]
  let accessPoints: Array<{ content: string; id: string }> = []

  if (searchTypes.objects.includes(entity.json.type)) {
    const object = new ObjectParser(data)
    accessPoints = object.getAccessPoints()
  }

  // Return null if there is no data to display
  if (
    accessStatement.length === 0 &&
    links.length === 0 &&
    accessPoints.length === 0
  ) {
    return null
  }

  return (
    <StyledDataRow className="row" data-testid="how-do-i-see-it">
      <div className="col-12">
        <h2>How do I see it?</h2>
      </div>
      {accessStatement.length > 0 && (
        <StyledDl data-testid="access-statement-dl mb-0">
          <NotesContainer
            notes={{ Access: accessStatement }}
            id="access-statement"
            expandColumns
            labelTooltipText={access}
          />
        </StyledDl>
      )}
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
          data-testid="site-links"
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
