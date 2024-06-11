import { useEffect } from 'react'

export default function useOpenGraph(imageUrl: string): void {
  useEffect(() => {
    console.log(document)
    console.log(document.children)
    // if (imageUrl) {
    //   document.children = `${imageUrl} - LUX`
    // }
  })
}
