import { useEffect } from 'react'

export default function useTitle(title: string): void {
  useEffect(() => {
    if (title) {
      document.title = `${title} - LUX`
    }
  })
}
