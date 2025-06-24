export const getBaseCollectionObject = (): any => {
  return {
    type: 'Set',
  }
}

export const createCollectionObject = (
  name: string,
  classification: string,
  language: string,
  defaultCollection: boolean,
): any => {
  const personalCollectionClassifiedAsObject = {
    type: 'Type',
    id: 'https://some.permanent.id.not.a.normal.lux.doc',
  }
  let classifiedAs = [personalCollectionClassifiedAsObject]

  if (defaultCollection) {
    classifiedAs = [
      ...classifiedAs,
      {
        type: 'Type',
        id: 'defaultCollectionUUID',
      },
    ]
  }
  return {
    ...getBaseCollectionObject(),
    identified_by: [
      {
        id: '',
        type: 'Name',
        content: name,
        language: [
          {
            id: language,
            type: 'Language',
            _label: 'English',
            equivalent: [
              {
                id: 'http://vocab.getty.edu/aat/300388277',
                type: 'Language',
                _label: 'English',
              },
            ],
          },
        ],
        classified_as: [
          {
            id: classification,
            type: 'Type',
            _label: 'Primary Name',
            equivalent: [
              {
                id: 'http://vocab.getty.edu/aat/300404670',
                type: 'Type',
                _label: 'Primary Name',
              },
            ],
          },
        ],
      },
    ],
    classified_as: classifiedAs,
  }
}
