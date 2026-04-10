export interface IStoredSelection {
  isSelected: boolean
  expiresAt: number
}

export interface ISelectionState {
  isSelected: boolean
  expiresAt: number | null
}
