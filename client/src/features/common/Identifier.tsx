import React from 'react'

import { getColumnWidth } from '../../lib/util/ui'
import theme from '../../styles/theme'

import RecordLink from './RecordLink'
import TextLabel from './TextLabel'
import TextValue from './TextValue'

interface INames {
  label: string
  identifiers: Array<string>
  carriedOutBy: Array<string>
  index: number
  location?: string
  expandColumns?: boolean
}

const Identifier: React.FC<INames> = ({
  label,
  identifiers,
  carriedOutBy,
  index,
  location,
  expandColumns = false,
}) => {
  // expandColumns should only be true if on an entity page classified as an event
  const [textValueWidth, textLabelWidth] = getColumnWidth(expandColumns)
  const labelWidth = expandColumns ? textLabelWidth : theme.colWidths.keyClass
  const contentWidth = expandColumns
    ? textValueWidth
    : theme.colWidths.valueClass

  return (
    <div className="row" data-testid="identifier-div">
      {location !== undefined && location !== '' && (
        <React.Fragment>
          <TextLabel label="Location" className={labelWidth} />
          <TextValue values={[location]} className={contentWidth} />
        </React.Fragment>
      )}
      <TextLabel
        label={label === '' ? 'Additional Identifiers' : label}
        className={labelWidth}
      />
      <div className={contentWidth}>
        {identifiers.map((id: string, ind: number) => (
          <dd
            key={id}
            className="mb-0"
            data-testid={`identifier-value-${index}`}
          >
            {id}
          </dd>
        ))}
        {carriedOutBy !== undefined && carriedOutBy.length > 0 && (
          <dd data-testid={`identifier-carried-out-by-${index}`}>
            <RecordLink url={carriedOutBy[0]} />
          </dd>
        )}
      </div>
    </div>
  )
}

export default Identifier
