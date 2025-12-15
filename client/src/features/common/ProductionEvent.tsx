import React from 'react'
import { useLocation } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { useAuth } from 'react-oidc-context'

import useApiText from '../../lib/hooks/useApiText'
import { capitalizeLabels } from '../../lib/parse/data/helper'
import { getColumnWidth } from '../../lib/util/ui'
import StyledEntityEvent from '../../styles/shared/EntityEvent'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import { IEventInfo } from '../../types/derived-data/events'

import ProductionEventBody from './ProductionEventBody'

interface IProps {
  event: IEventInfo
  label: string
  id: string
  expandColumns?: boolean
  stackKeyValuePairs?: boolean
}

const ProductionEvent: React.FC<IProps> = ({
  event,
  label,
  id,
  expandColumns = false,
  stackKeyValuePairs = false,
}) => {
  const auth = useAuth()
  const loc = useLocation()
  const { value: labelName, isReady: labelNameIsReady } = useApiText({
    textOrUri: label,
    pageUri: loc.pathname,
    auth,
  })
  const [textValueWidth, textLabelWidth] = getColumnWidth(expandColumns)

  return (
    <StyledEntityEvent data-testid={`${id}-container`}>
      <StyledDataRow className="row">
        <div className={textLabelWidth}>
          <dt data-testid={`${id}-event-label`}>
            {labelNameIsReady && labelName !== null && labelName !== ''
              ? capitalizeLabels(labelName)
              : label}
          </dt>
        </div>
        <div className={textValueWidth}>
          <ProductionEventBody
            event={event}
            showReferenceLabel
            id={id}
            stackKeyValuePairs={stackKeyValuePairs}
          />
        </div>
        <Col xs={12}>
          <StyledHr className="productionEventHr" width="100%" />
        </Col>
      </StyledDataRow>
    </StyledEntityEvent>
  )
}

export default ProductionEvent
