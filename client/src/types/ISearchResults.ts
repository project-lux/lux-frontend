/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBase } from './ISearchEstimates'

export interface ICriteria {
  [key: string]: any
}

export interface ISearchResultsError {
  data: {
    errorMessage: string
    statusCode: number
  }
}

export interface IOrderedItems {
  id: string
  type: string
  value?: string | number
  totalItems?: number
  first?: IBase
  name?: string
}

interface IPartOf {
  id: string
  type: string
  label?: {
    [key: string]: Array<string>
  }
  summary?: {
    [key: string]: Array<string>
  }
  totalItems?: number
  partOf?: Array<IPartOf>
}

export interface ISearchResults {
  '@context'?: string
  id: string
  type: string
  orderedItems: Array<IOrderedItems>
  next?: {
    id: string
    type: string
  }
  partOf?: Array<IPartOf>
}
