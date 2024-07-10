import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

import { englishLanguage, primaryName } from './helperObjects'

export const reusableMinimalEntity = (
  content: string,
  endpoint?: string,
): IEntity => ({
  id: `${config.env.dataApiBaseUrl}data${endpoint || '/entity/mock-entity'}`,
  type: 'Concept',
  _label: content,
  identified_by: [
    {
      id: '',
      type: 'Name',
      content,
      language: englishLanguage,
      classified_as: primaryName,
    },
  ],
})
