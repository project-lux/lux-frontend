import React from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'

import AiInfoPopover from './AiInfoPopover'

interface IToggleButtonProps {
  linkStyle: {
    color: string
    textDecoration: string
  }
  isStickyHeaderActive: boolean
  isAiSearch: boolean
  handleToggle: () => void
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledLabel = styled.span<{
  $color: string
}>`
  font-size: 1rem;
  color: ${(props): string => props.$color};
  font-weight: ${theme.font.weight.regular};
`

const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;
`

const StyledSwitchInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`

const StyledSwitchSlider = styled.span<{
  $isActive: boolean
  $color: string
  isStickyHeaderActive: boolean
}>`
  position: absolute;
  inset: 0;
  border-radius: 24px;
  border: ${(props): string => {
    return `1px solid ${props.$color}`
  }};
  background-color: ${(props): string => {
    if (props.$isActive && props.isStickyHeaderActive) {
      return props.$color
    }
    if (!props.$isActive && props.isStickyHeaderActive) {
      return 'transparent'
    }
    if (props.$isActive && !props.isStickyHeaderActive) {
      return props.$color
    }
    if (!props.$isActive && !props.isStickyHeaderActive) {
      return 'transparent'
    }
    return 'transparent'
  }};
  transition: background-color 0.2s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${(props): string => {
      if (props.$isActive && props.isStickyHeaderActive) {
        return theme.color.primary.blue
      }
      if (!props.$isActive && props.isStickyHeaderActive) {
        return props.$color
      }
      if (props.$isActive && !props.isStickyHeaderActive) {
        return theme.color.white
      }
      if (!props.$isActive && !props.isStickyHeaderActive) {
        return props.$color
      }
      return props.$color
    }};
    transition: transform 0.2s ease-in-out;
    transform: translateX(
      ${(props): string => (props.$isActive ? '20px' : '0')}
    );
  }
`

const AiToggleButton: React.FC<IToggleButtonProps> = ({
  linkStyle,
  isStickyHeaderActive,
  isAiSearch,
  handleToggle,
}) => {
  return (
    <StyledWrapper>
      <StyledSwitch className="aiAssistedSearchToggleButton">
        <StyledSwitchInput
          type="checkbox"
          checked={isAiSearch}
          onChange={handleToggle}
        />
        <StyledSwitchSlider
          $isActive={isAiSearch}
          $color={linkStyle.color}
          isStickyHeaderActive={isStickyHeaderActive}
        />
      </StyledSwitch>
      <StyledLabel
        className="aiAssistedSearchToggleButtonLabel"
        $color={linkStyle.color}
      >
        AI-Assisted Search
      </StyledLabel>
      <AiInfoPopover buttonColor={linkStyle.color} />
    </StyledWrapper>
  )
}

export default AiToggleButton
