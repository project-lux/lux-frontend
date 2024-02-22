/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'

import RecordLink from './RecordLink'

const RecordLinksList = (links: Array<string>): JSX.Element[] =>
  links.map((link, ind) => (
    <React.Fragment key={`${link}_${ind}`}>
      <RecordLink url={link} />
      <br />
    </React.Fragment>
  ))

export default RecordLinksList
