import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

import { ISelectionState, IStoredSelection } from '../../types/ISessionState'

export interface IExpiringSelectionButtonProps {
  storageKey: string
  expirationInMinutes?: number
}

// Default expiration time is 20 minutes, but can be set to any number of minutes via the expirationInMinutes prop.
const DEFAULT_EXPIRATION_MINUTES = 20

// function used to get the initial selection state from localStorage when the component mounts, checks if the stored value is valid and not expired, and returns the appropriate selection state
const getInitialSelectionState = (storageKey: string): ISelectionState => {
  // set the default selection state
  if (typeof window === 'undefined') {
    return {
      isSelected: false,
      expiresAt: null,
    }
  }

  const storedSelection = window.localStorage.getItem(storageKey)

  // if there is no stored value, return the default selection state
  if (!storedSelection) {
    return {
      isSelected: false,
      expiresAt: null,
    }
  }

  // try to parse the stored value and check if it is valid and not expired
  try {
    const parsedSelection: IStoredSelection = JSON.parse(storedSelection)
    const isExpired = parsedSelection.expiresAt <= Date.now()

    if (!parsedSelection.isSelected || isExpired) {
      window.localStorage.removeItem(storageKey)
      return {
        isSelected: false,
        expiresAt: null,
      }
    }

    return {
      isSelected: true,
      expiresAt: parsedSelection.expiresAt,
    }
  } catch {
    window.localStorage.removeItem(storageKey)
    return {
      isSelected: false,
      expiresAt: null,
    }
  }
}

/**
 * Alert component that uses localStorage to track whether or not the alert has been dismissed by the user, and if dismissed, for how long. Used to alert mobile users that the Advanced Search feature is unavailable at smaller screen widths.
 * @param {string} storageKey key used to store the alert state in localStorage
 * @param {number} expirationInMinutes optional; expiration time in minutes for the alert
 * @returns {JSX.Element}
 */
const MobileAlert: React.FC<IExpiringSelectionButtonProps> = ({
  storageKey,
  expirationInMinutes = DEFAULT_EXPIRATION_MINUTES,
}) => {
  const [selectionState, setSelectionState] = useState<ISelectionState>(() =>
    getInitialSelectionState(storageKey),
  )

  // function used to clear the localStorage key and reset the selection state, used both when the user dismisses the alert and when the alert expires
  const clearSelection = (): void => {
    window.localStorage.removeItem(storageKey)
    setSelectionState({
      isSelected: false,
      expiresAt: null,
    })
  }

  useEffect(() => {
    setSelectionState(getInitialSelectionState(storageKey))
  }, [storageKey])

  useEffect(() => {
    if (!selectionState.isSelected || selectionState.expiresAt === null) {
      return undefined
    }

    // calculate the number of milliseconds until the alert should expire
    const millisecondsUntilExpiry = selectionState.expiresAt - Date.now()

    // if the expiration time has already passed, clear the selection state immediately
    if (millisecondsUntilExpiry <= 0) {
      clearSelection()
      return undefined
    }

    // set a timeout to clear the selection state when the expiration time is reached
    const timeoutId = window.setTimeout(() => {
      clearSelection()
    }, millisecondsUntilExpiry)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [selectionState.expiresAt, selectionState.isSelected, storageKey])

  // function called to dismiss the alert, set the selection state to selected, and store it in localStorage with an expiration time when the user dismisses the alert
  const handleButtonClick = (): void => {
    if (selectionState.isSelected) {
      clearSelection()
      return
    }

    // calculate the expiration time based on the current time and the expirationInMinutes prop
    const expiresAt = Date.now() + expirationInMinutes * 60 * 1000
    const nextSelectionState = {
      isSelected: true,
      expiresAt,
    }

    window.localStorage.setItem(storageKey, JSON.stringify(nextSelectionState))
    setSelectionState(nextSelectionState)
  }

  // render the alert if the selection state is not selected, otherwise render nothing
  if (!selectionState.isSelected) {
    return (
      <Alert
        dismissible
        variant="warning"
        className="d-flex justify-content-center mb-0"
        onClose={() => handleButtonClick()}
      >
        The Advanced Search feature is unavailable at this screen width.
      </Alert>
    )
  }

  return null
}

export default MobileAlert
