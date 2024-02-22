import React from 'react'
import { Link } from 'react-router-dom'

import { IOrderedItems } from '../../types/ISearchResults'
import ApiText from '../common/ApiText'

interface IProps {
  item: IOrderedItems
}

const ChildLi: React.FC<IProps> = ({ item }) => {
  const name = ApiText(item.id)
  return (
    <li>
      {name}&nbsp;&nbsp;
      <Link to={item.id} aria-label={`View ${name}`}>
        [View]
      </Link>
    </li>
  )
}

export default ChildLi
