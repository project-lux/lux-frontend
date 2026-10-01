import React, { useState } from 'react'

import LinkButton from '../../styles/features/advancedSearch/LinkButton'
import { AI_ASSISTED_SEARCH_STORAGE_KEY } from '../../config/aiAssistedSearch/variables'

interface ICloseButton {
  setShowModal?: (x: boolean) => void
}

/**
 * Button to switch between advanced search and simple search.
 * @param {(x: boolean) => void} setIsError callback function to set error message on the current search form
 * @param {boolean} isAiSearch boolean to determine if user has AI assisted search enabled
 * @param {(x: boolean) => void} setShowModal optional; only used when switching to simple search, set AlertModal showModal value
 * @returns {JSX.Element}
 */
const CloseButton: React.FC<ICloseButton> = ({ setShowModal = () => null }) => {
  const [isAiSearch] = useState<boolean>(() => {
    const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
    return storedIsActive ? JSON.parse(storedIsActive) : false
  })

  const handleSwitchToSimpleSearch = (): void => {
    setShowModal(true)
  }

  return (
    <LinkButton
      variant="link"
      type="button"
      className="searchToggle"
      id="search-toggle"
      value="searchToggle"
      aria-label="Close Advanced Search"
      onClick={() => handleSwitchToSimpleSearch()}
      data-testid="search-toggle-button"
    >
      Close {isAiSearch ? 'Refine' : 'Advanced'} Search
    </LinkButton>
  )
}

export default CloseButton
