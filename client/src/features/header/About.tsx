import React from 'react'
import { NavLink } from 'react-router-dom'

const About: React.FC = () => (
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      About LUX
    </button>
    <ul
      className="dropdown-menu dropdown-menu-end"
      aria-labelledby="dropdownMenuLink"
    >
      <li>
        <NavLink
          to="/content/collaboration-history"
          state={{
            targetName:
              "History of Digital Collaboration among Yale's Libraries, Museums, and ITS",
          }}
          className="dropdown-item"
        >
          History of Digital Collaboration among Yale&apos;s Libraries, Museums,
          and ITS
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/content/technology"
          state={{
            targetName: 'LUX Technology',
          }}
          className="dropdown-item"
        >
          LUX Technology
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/content/sharable-outcomes"
          state={{
            targetName: 'Sharable Outcomes from LUX',
          }}
          className="dropdown-item"
        >
          Sharable Outcomes from LUX
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/content/who-we-are"
          state={{
            targetName: 'Who We Are',
          }}
          className="dropdown-item"
        >
          Who We Are
        </NavLink>
      </li>
    </ul>
  </div>
)

export default About
