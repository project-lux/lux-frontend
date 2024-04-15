import React from 'react'
import { NavLink } from 'react-router-dom'

import { aboutPages } from '../../config/cms'
import StyledAboutSideBar from '../../styles/features/cms/AboutSideBar'

/**
 * Navigation menu on the about page.
 * @returns {JSX.Element}
 */
const AboutSideBar: React.FC = () => (
  <StyledAboutSideBar className="sidebar" data-testid="about-page-side-bar">
    {aboutPages.map((item) => (
      <NavLink
        to={item.route}
        state={{ targetName: item.label }}
        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        key={item.key}
      >
        {item.label}
      </NavLink>
    ))}
  </StyledAboutSideBar>
)

export default AboutSideBar
