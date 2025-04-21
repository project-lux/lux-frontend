import React from 'react'
import { NavLink } from 'react-router-dom'

import StyledSideBar from '../../styles/features/cms/ContentPageSideBar'

interface IProps {
  pages: Map<string, string>
}

/**
 * Menu to be displayed on FAQ page.
 * @returns {JSX.Element}
 */
const ContentPageSideBar: React.FC<IProps> = ({ pages }) => (
  <StyledSideBar className="sidebar" data-testid="content-page-side-bar">
    {Array.from(pages.entries()).map(([key, value]) => (
      <NavLink
        to={key}
        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        key={key}
      >
        {value}
      </NavLink>
    ))}
  </StyledSideBar>
)

export default ContentPageSideBar
