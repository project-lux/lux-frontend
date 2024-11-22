import React from 'react'
import { NavLink } from 'react-router-dom'

import StyledAboutSideBar from '../../styles/features/cms/AboutSideBar'
import { aboutPagesMap } from '../../config/routerPages'

/**
 * Navigation menu on the about page.
 * @returns {JSX.Element}
 */
const AboutSideBar: React.FC = () => (
  <StyledAboutSideBar className="sidebar" data-testid="about-page-side-bar">
    {Array.from(aboutPagesMap.entries()).map(([key, value]) => (
      <NavLink
        to={key}
        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        key={key}
      >
        {value}
      </NavLink>
    ))}
  </StyledAboutSideBar>
)

export default AboutSideBar
