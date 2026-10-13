import { MAX_WORDS } from '../../../features/search/SearchContainer'

// Helper to count words
export const countWords = (str: string): number => {
  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateInput = (state: any): boolean => {
  const { value } = state
  if (value === null || value.trim() === '') {
    return false
  }
  if (countWords(value) > MAX_WORDS) {
    return false
  }
  return true
}
