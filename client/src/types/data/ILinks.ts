/* eslint-disable @typescript-eslint/no-explicit-any */

interface ICurie {
  name: string
  href: string
  templated: boolean
}

// HAL _links
export default interface ILinks {
  [key: string]:
    | {
        href: string
        _estimate: number | null
      }
    | any
  curies: ICurie[]
  self: {
    href: string
  }
}
