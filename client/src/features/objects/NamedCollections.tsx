import React from 'react'
import { Row } from 'react-bootstrap'

import IEntity from '../../types/data/IEntity'
import { useGetCollectionQuery } from '../../redux/api/ml_api'
import TextLabel from '../common/TextLabel'
import ExpandableList from '../common/ExpandableList'
import TextValue from '../common/TextValue'
import config from '../../config/config'
import StyledHr from '../../styles/shared/Hr'
import RecordLink from '../common/RecordLink'

interface IApiText {
  entity: IEntity
}

const NamedCollections: React.FC<IApiText> = ({ entity }) => {
  const { data, isSuccess } = useGetCollectionQuery(
    { entity, aatClassification: config.aat.namedCollection },
    {
      skip: entity === undefined || entity.member_of === undefined,
    },
  )

  const formatRecordLinks = (links: Array<string>): JSX.Element[] =>
    links
      .map((link, ind) => {
        if (link !== null) {
          return <RecordLink key={`${link}_${ind}`} url={link} />
        }
      })
      .filter((link) => link !== undefined)

  if (isSuccess && data) {
    const nonNullData = data.filter((coll: string | null) => coll !== null)
    if (nonNullData.length === 0) {
      return null
    }

    return (
      <Row>
        <TextLabel label="Named Collections" />
        <ExpandableList>
          <TextValue values={formatRecordLinks(data)} className="col-md-9" />
        </ExpandableList>
        <StyledHr className="dimensionsHr" />
      </Row>
    )
  }

  return null
}

export default NamedCollections
