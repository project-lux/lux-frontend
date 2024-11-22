import { UnitCode, unitCodeFromNumString } from '../../../config/cms'

export interface ICmsResponse {
  data: ICmsData[]
}

export interface ICmsData {
  id: string
  attributes: {
    title: string
    body: string
    field_iiif_image: {
      uri: string
      title: string
    }
    field_url_path: string
    field_chit_unit: string[]
  }
  relationships: {
    field_featured_image: {
      data: {
        id: string
        meta: {
          alt: string
        }
      }
    }
  }
}

export interface ICollection {
  imageUrl: string
  imageAlt: string
  title: string
  bodyHtml: string
  searchUrl: string
}

const selectCollection = (
  unit: UnitCode,
  candidates: ICmsData[],
): [ICollection, ICmsData[]] => {
  let items = candidates.filter(
    (item) =>
      unitCodeFromNumString(item.attributes.field_chit_unit[0]) === unit,
  )

  // In case there's no items available for the requested unit,
  // just pick any.
  if (items.length === 0) {
    items = candidates
  }

  const numItems = items.length
  const chosenIndex = Math.floor(Math.random() * numItems)
  const item = items[chosenIndex]
  const attr = item.attributes
  const imageUrl = attr.field_iiif_image.uri
  const imageAlt = attr.field_iiif_image.title
  const remaining = candidates.filter((c) => c.id !== item.id)

  return [
    {
      imageUrl,
      imageAlt,
      title: attr.title,
      bodyHtml: attr.body,
      searchUrl: attr.field_url_path,
    },
    remaining,
  ]
}

export class FeaturedCollectionParser {
  data: ICmsData[]

  constructor(json: ICmsResponse) {
    this.data = json.data
  }

  getCollections(units: UnitCode[]): ICollection[] {
    const colls: ICollection[] = []
    let candidates = this.data

    for (let i = 0; i < 3; i += 1) {
      ;[colls[i], candidates] = selectCollection(units[i], candidates)
    }
    return colls
  }
}
