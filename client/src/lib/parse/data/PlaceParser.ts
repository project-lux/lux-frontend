/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import IEntity from '../../../types/data/IEntity'
import IPlace from '../../../types/data/IPlace'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import { hasData } from './helper'

export default class PlaceParser extends EntityParser {
  place: IPlace

  constructor(json: IPlace) {
    super(json as IEntity)
    this.place = json
  }

  /**
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    const data: Record<
      string,
      null | string | Array<any> | IContentWithLanguage
    > = {
      name: this.getPrimaryName(config.dc.langen),
      names: this.getNames(),
      types: this.getTypes(),
      webPages: this.getWebPages(),
      notes: this.getNotes(),
    }

    return hasData(data)
  }
}
