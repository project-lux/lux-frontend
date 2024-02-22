import { Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const StyledNavbar = styled(Navbar)`
  display: flex;
  justify-content: start;
  letter-spacing: 0;
  text-align: center;
  font-weight: 500;
  height: 100%;
  padding-top: 0px;

  & > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: block;
  }

  & > ul > li {
    display: inline-block;
    line-height: 70px;
    height: 100%;
  }
`
export default StyledNavbar
