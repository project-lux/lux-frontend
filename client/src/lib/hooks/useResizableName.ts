import React, { useState } from 'react'

const MAX_SHORT_LENGTH = 100

export function useResizableName(name: string): {
  displayName: string
  isNameLong: boolean
  showLongName: boolean
  setShowLongName: React.Dispatch<React.SetStateAction<boolean>>
} {
  const isNameLong = name.length > MAX_SHORT_LENGTH
  const [showLongName, setShowLongName] = useState(false)
  const displayName = showLongName ? name : shortenIfNeeded(name)

  return { displayName, isNameLong, showLongName, setShowLongName }
}

export function shortenIfNeeded(name: string): string {
  if (name.length > MAX_SHORT_LENGTH) {
    return `${name.substring(0, MAX_SHORT_LENGTH)}...`
  }
  return name
}
