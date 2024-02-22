import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

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
      language: [
        {
          id: config.dc.langen,
          type: 'Language',
          _label: 'English',
        },
      ],
      classified_as: [
        {
          id: config.dc.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
    },
  ],
})
