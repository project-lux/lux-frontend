import React from 'react'

import TextValue from '../common/TextValue'
import TextLabel from '../common/TextLabel'
import ExpandableList from '../common/ExpandableList'
import ApiText from '../common/ApiText'

interface IDimensions {
  label: string
  value: number
  unit: string
}

const Dimensions: React.FC<IDimensions> = ({ label, value, unit }) => {
  const unitName = ApiText(unit)

  return (
    <React.Fragment>
      <TextLabel label={label} />
      <ExpandableList>
        <TextValue values={[`${value} ${unitName}`]} className="col-md-9" />
      </ExpandableList>
    </React.Fragment>
  )
}

export default Dimensions
