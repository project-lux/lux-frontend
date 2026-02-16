import React from 'react'
import { Col } from 'react-bootstrap'
import { isUndefined } from 'lodash'

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
  headerTitle?: string
}

const ClassContainer: React.FC<IProps> = ({
  label,
  entityClass,
  className,
  textLabelClassName = 'col-12',
  textValueClassName = 'col-12',
  hideBreaklineOnDesktop = false,
  headerTitle,
}) => (
  <React.Fragment>
    {headerTitle && <StyledHr width="100%" />}
    {headerTitle && <h3>{headerTitle}</h3>}
    <TextContainer
      label={isUndefined(headerTitle) ? label : undefined}
      textLabelClassName={textLabelClassName}
    >
      <TextValue values={[entityClass]} className={textValueClassName} />
      <Col xs={12}>
        <StyledHr
          className={className}
          width="100%"
          $hiddenOnDesktop={hideBreaklineOnDesktop}
        />
      </Col>
    </TextContainer>
  </React.Fragment>
)

export default ClassContainer
