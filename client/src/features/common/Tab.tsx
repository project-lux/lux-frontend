import React from 'react'

/* eslint-disable react/no-unused-prop-types */
interface ITab {
  title: string
  currentTab?: string
  children: JSX.Element
}

const Tab: React.FC<ITab> = ({ children }) => <div>{children}</div>

export default Tab
