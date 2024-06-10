import React from 'react'

import RecordLink from '../common/RecordLink'

interface IProps {
  id: string
}

const Li: React.FC<IProps> = ({ id }) => (
  <li>
    <RecordLink url={id} />
  </li>
)

export default Li
