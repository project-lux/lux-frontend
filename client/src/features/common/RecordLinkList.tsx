import React, { type JSX } from 'react'

import RecordLink from './RecordLink'

const RecordLinksList = (links: Array<string>): JSX.Element[] =>
  links.map((link, ind) => (
    <React.Fragment key={`${link}_${ind}`}>
      <RecordLink url={link} />
      <br />
    </React.Fragment>
  ))

export default RecordLinksList
