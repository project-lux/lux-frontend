/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import IEntity from '../../../types/data/IEntity'
import IPlace from '../../../types/data/IPlace'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import { forceArray, getClassifiedAs, hasData } from './helper'

export default class PlaceParser extends EntityParser {
  place: IPlace

  constructor(json: IPlace) {
    super(json as IEntity)
    this.place = json
  }

  /**
   * Returns array of uuids from /part_of
   * @returns {Array<string>}
   */
  getPartOf(): Array<string> {
    const partOf = forceArray(this.json.part_of)
    return getClassifiedAs(partOf)
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
      name: this.getPrimaryName(config.aat.langen),
      names: this.getNames(),
      types: this.getTypes(),
      webPages: this.getWebPages(),
      notes: this.getNotes(),
    }

    return hasData(data)
  }
}
