import React from 'react'
import { Col, Row } from 'react-bootstrap'

interface IProps {
  icon: string
  number: number
  label: string
}

const InfographicsCard: React.FC<IProps> = ({ icon, number, label }) => (
  <Col xs={12} sm={12} md={12} lg={6} className="col-lg-6 d-flex card-outer">
    <Row className="d-flex align-items-center card-inner">
      <Col xs={3} sm={3} md={3}>
        <img className="icon" src={icon} alt="" />
      </Col>
      <Col xs={9} sm={9} md={9}>
        <div className="number">{number.toLocaleString()}</div>
        <div className="label">{label}</div>
      </Col>
    </Row>
  </Col>
)

export default InfographicsCard
