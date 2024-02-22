/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import StyledEntityEvent from '../../styles/shared/EntityEvent'
import StyledDataRow from '../../styles/shared/DataRow'
import StyledHr from '../../styles/shared/Hr'
import { capitalizeLabels } from '../../lib/parse/data/helper'
import { getColumnWidth } from '../../lib/util/ui'
import { IEventInfo } from '../../types/derived-data/events'

import ApiText from './ApiText'
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
  const labelName = ApiText(label)
  const [textValueWidth, textLabelWidth] = getColumnWidth(expandColumns)

  return (
    <StyledEntityEvent data-testid={`${id}-container`}>
      <StyledDataRow className="row">
        <div className={textLabelWidth}>
          <dt data-testid={`${id}-event-label`}>
            {labelName !== null && labelName !== ''
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
        <StyledHr />
      </StyledDataRow>
    </StyledEntityEvent>
  )
}

export default ProductionEvent
