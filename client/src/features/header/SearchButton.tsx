import React from 'react'
import styled from 'styled-components'

import close from '../../resources/images/icons/close.svg'
import search from '../../resources/images/icons/search.svg'

const StyledButton = styled.button`
  background-color: inherit;
  border-style: none;
  padding: 0.5rem 0rem;
`
const CloseImg = styled.img`
  margin: 7.5px;
  float: left;
`

const SearchImg = styled.img`
  float: left;
`

const SearchButton: React.FC<{
  displaySearch: boolean
  setIsSearchOpen: (isSearchOpen: boolean) => void
}> = ({ displaySearch, setIsSearchOpen }) => (
  <StyledButton
    type="button"
    aria-label={displaySearch ? 'Close Search' : 'Open Search'}
    onClick={() => setIsSearchOpen(!displaySearch)}
  >
    {displaySearch ? (
      <CloseImg alt="Close Search" src={close} />
    ) : (
      <SearchImg alt="Open Search" src={search} />
    )}
  </StyledButton>
)

export default SearchButton
