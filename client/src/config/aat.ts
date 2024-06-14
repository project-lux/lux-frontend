/**
 * Local copy of the data constants configuration used to retrieve and render data points.
 * This configuration is requested from a server on system start up.
 */

export interface IAat {
  [key: string]: string
}

export function defaultAats(): IAat {
  return {
    accessStatement: 'http://vocab.getty.edu/aat/300133046',
    active: 'http://vocab.getty.edu/aat/300393177',
    alternateName: 'http://vocab.getty.edu/aat/300264273',
    animalSpecimens: 'http://vocab.getty.edu/aat/300420186',
    archive: 'http://vocab.getty.edu/aat/300375748',
    biologicalSpecimens: 'http://vocab.getty.edu/aat/300421897',
    collection: 'http://vocab.getty.edu/aat/300025976',
    collectionItem: 'http://vocab.getty.edu/aat/300404024',
    copyrightLicensingStatement: 'http://vocab.getty.edu/aat/300435434',
    descriptionStatement: 'http://vocab.getty.edu/aat/300435416',
    dimensionStatement: 'http://vocab.getty.edu/aat/300435430',
    displayName: 'http://vocab.getty.edu/aat/300404669',
    exhibition: 'http://vocab.getty.edu/aat/300054766',
    first: 'http://vocab.getty.edu/aat/300404050',
    fossil: 'http://vocab.getty.edu/aat/300247919',
    gender: 'http://vocab.getty.edu/aat/300055147',
    imprintStatement: 'http://vocab.getty.edu/aat/300202362',
    langdut: 'http://vocab.getty.edu/aat/300388256',
    langen: 'http://vocab.getty.edu/aat/300388277',
    langfr: 'http://vocab.getty.edu/aat/300388306',
    languageStatement: 'http://vocab.getty.edu/aat/300435433',
    nationality: 'http://vocab.getty.edu/aat/300379842',
    occupation: 'http://vocab.getty.edu/aat/300263369',
    plantSpecimens: 'http://vocab.getty.edu/aat/300430421',
    primaryName: 'http://vocab.getty.edu/aat/300404670',
    sortName: 'http://vocab.getty.edu/aat/300404672',
    sortValue: 'http://vocab.getty.edu/aat/300451544',
    typeOfPart: 'http://vocab.getty.edu/aat/300241583',
    visitors: 'http://vocab.getty.edu/aat/300025883',
    webPage: 'http://vocab.getty.edu/aat/300264578',
  }
}
