import React from 'react'
import { Col } from 'react-bootstrap'

import TextContainer from '../common/TextContainer'
import TextValue from '../common/TextValue'
import StyledHr from '../../styles/shared/Hr'

interface IProps {
  label: string
  entityClass: string
  className: string
  hideBreaklineOnDesktop?: boolean
  textLabelClassName?: string
  textValueClassName?: string
}

const ClassContainer: React.FC<IProps> = ({
  label,
  entityClass,
  className,
  textLabelClassName = 'col-12',
  textValueClassName = 'col-12',
  hideBreaklineOnDesktop = false,
}) => (
  <TextContainer label={label} textLabelClassName={textLabelClassName}>
    <TextValue values={[entityClass]} className={textValueClassName} />
    <Col xs={12}>
      <StyledHr
        className={className}
        width="100%"
        $hiddenOnDesktop={hideBreaklineOnDesktop}
      />
    </Col>
  </TextContainer>
)

export default ClassContainer
