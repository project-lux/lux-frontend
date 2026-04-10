import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

interface IStoredSelection {
  isSelected: boolean
  expiresAt: number
}

interface IExpiringSelectionButtonProps {
  storageKey: string
  expirationInMinutes?: number
}

interface ISelectionState {
  isSelected: boolean
  expiresAt: number | null
}

const DEFAULT_EXPIRATION_MINUTES = 1

const getInitialSelectionState = (storageKey: string): ISelectionState => {
  if (typeof window === 'undefined') {
    return {
      isSelected: false,
      expiresAt: null,
    }
  }

  const storedSelection = window.localStorage.getItem(storageKey)

  if (!storedSelection) {
    return {
      isSelected: false,
      expiresAt: null,
    }
  }

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

const ExpiringSelectionButton: React.FC<IExpiringSelectionButtonProps> = ({
  storageKey,
  expirationInMinutes = DEFAULT_EXPIRATION_MINUTES,
}) => {
  const [selectionState, setSelectionState] = useState<ISelectionState>(() =>
    getInitialSelectionState(storageKey),
  )

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

    const millisecondsUntilExpiry = selectionState.expiresAt - Date.now()

    if (millisecondsUntilExpiry <= 0) {
      clearSelection()
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      clearSelection()
    }, millisecondsUntilExpiry)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [selectionState.expiresAt, selectionState.isSelected, storageKey])

  const handleButtonClick = (): void => {
    if (selectionState.isSelected) {
      clearSelection()
      return
    }

    const expiresAt = Date.now() + expirationInMinutes * 60 * 1000
    const nextSelectionState = {
      isSelected: true,
      expiresAt,
    }

    window.localStorage.setItem(storageKey, JSON.stringify(nextSelectionState))
    setSelectionState(nextSelectionState)
  }

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

export default ExpiringSelectionButton
