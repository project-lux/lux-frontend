interface IEn {
  en: Array<string>
}

export interface IBase {
  id: string
  type?: string
}

export interface IEstimateItems {
  [index: string]: string | number | IBase | IEn
  '@context': string
  id: string
  type: string
  label: IEn
  summary: IEn
  totalItems: number
  first: IBase
  last: IBase
}
