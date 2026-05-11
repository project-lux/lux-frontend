import React from 'react'

interface IFieldSelectRow {
  text: string
  className?: string
}

/**
 * Contains any text that is not interactive but is necessary for describing the advanced search options to users
 * @param {string} text id of the current object within the advanced search state
 * @param {string} className optional; className for the component
 * @returns {JSX.Element}
 */
const DescriptiveText: React.FC<IFieldSelectRow> = ({ text, className }) => (
  <p
    className={`mb-0 d-flex text-nowrap align-items-center justify-content-center ${className || ''}`}
  >
    {text}
  </p>
)

export default DescriptiveText
