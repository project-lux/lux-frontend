import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

import useApiText from '../../lib/hooks/useApiText'
import TextValue from '../common/TextValue'
import TextLabel from '../common/TextLabel'
import ExpandableList from '../common/ExpandableList'

interface IDimensions {
  label: string
  value: number
  unit: string
}

const Dimensions: React.FC<IDimensions> = ({ label, value, unit }) => {
  const auth = useAuth()
  const loc = useLocation()
  const { value: unitName } = useApiText({
    textOrUri: unit,
    pageUri: loc.pathname,
    auth,
  })

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
