export interface ICmsPage {
  data: {
    attributes: {
      title: string
      body: string
    }
  }
}

export interface IStats {
  estimates: {
    searchScopes: {
      item: number
      work: number
      set: number
      agent: number
      place: number
      concept: number
      event: number
    }
  }
}
