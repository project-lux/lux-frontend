import React from 'react'

interface ITab {
  title: string
  currentTab?: string
  children: Array<JSX.Element> | JSX.Element
}

const Tab: React.FC<ITab> = ({ children }) => <div>{children}</div>

export default Tab
