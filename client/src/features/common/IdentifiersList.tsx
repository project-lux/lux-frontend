import React from 'react'

import StyledDataRow from '../../styles/shared/DataRow'

import Identifier from './Identifier'

interface IIdentifiers {
  identifiers: Array<{
    label: string
    identifier: Array<string>
    carriedOutBy: Array<string>
  }>
  expandIdentiferColumn?: boolean
}

const IdentifiersList: React.FC<IIdentifiers> = ({
  identifiers,
  expandIdentiferColumn = false,
}) => (
  <React.Fragment>
    {identifiers.map((identifier, ind) => (
      <StyledDataRow
        className="row"
        key={`${identifier.label}_${ind}`}
        data-testid={`identifiers-list-row-${ind}`}
      >
        <Identifier
          label={identifier.label}
          carriedOutBy={identifier.carriedOutBy}
          identifiers={identifier.identifier}
          expandColumns={expandIdentiferColumn}
          index={ind}
        />
      </StyledDataRow>
    ))}
  </React.Fragment>
)

export default IdentifiersList
