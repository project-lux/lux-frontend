import React from 'react'
import { Col } from 'react-bootstrap'

import TextContainer from '../common/TextContainer'
import TextValue from '../common/TextValue'
import StyledHr from '../../styles/shared/Hr'

interface IProps {
  label: string
  entityClass: string
  className: string
}

const ClassContainer: React.FC<IProps> = ({
  label,
  entityClass,
  className,
}) => (
  <TextContainer label={label}>
    <TextValue values={[entityClass]} />
    <Col xs={12}>
      <StyledHr className={className} width="100%" hiddenOnDesktop />
    </Col>
  </TextContainer>
)

export default ClassContainer
