import React from 'react'
import { Link } from 'react-router-dom'

import ApiText from '../common/ApiText'

interface IProps {
  item: string
}

const ParentLi: React.FC<IProps> = ({ item }) => {
  const name = ApiText(item)
  return (
    <li>
      {name}&nbsp;&nbsp;
      <Link to={item} aria-label={`View ${name}`}>
        [View]
      </Link>
    </li>
  )
}

export default ParentLi
