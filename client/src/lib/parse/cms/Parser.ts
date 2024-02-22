import { ILandingPage } from './LandingPageParser'
import { ILandingPageImage } from './LandingPageImageParser'

export interface ICmsResponse {
  data: ICmsData[] | ICmsData
}

export interface ICmsData {
  type: string
  attributes: {
    [key: string]: unknown
  }
}

export type CmsBody = {
  value: string
}

export class CmsResponseParser {
  json: ICmsResponse

  constructor(json: ICmsResponse) {
    this.json = json
  }

  getLandingPage(): ILandingPage {
    if (Array.isArray(this.json.data)) {
      return this.json.data[0] as ILandingPage
    }
    return this.json.data as ILandingPage
  }

  getLandingPageImages(): ILandingPageImage[] {
    return this.json.data as ILandingPageImage[]
  }
}
