/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IAdvancedSearchConfig {
  [key: string]: any
}

/**
 * Local copy of the advanced search configuration used to render components based on
 * user interaction with the advanced search form. This configuration is requested from
 * a server on system start up.
 */

export function advancedSearch(): IAdvancedSearchConfig {
  return {
    terms: {
      agent: {
        name: {
          label: 'Name',
          helpText:
            'Enter term(s) to be found within the title or name of the Person or Group.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'Anywhere',
          helpText:
            'Search for People & Groups by terms anywhere in the record.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        startAt: {
          label: 'Born/Formed At',
          helpText:
            'Search for People & Groups that were born or formed in the specified Place.',
          relation: 'place',
          autoCompleteContext: 'agent.startAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        startDate: {
          label: 'Born/Formed Date',
          helpText:
            'Search People & Groups by the date on which they were born or formed.',
          relation: 'date',
        },
        carriedOut: {
          label: 'Carried Out',
          helpText:
            'Search for People & Groups that carried out the specified Event.',
          relation: 'event',
        },
        classification: {
          label: 'Categorized As',
          helpText:
            'Search for People & Groups that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'agent.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        produced: {
          label: 'Created Object',
          helpText:
            'Search for People & Groups that created the specified Objects',
          relation: 'item',
        },
        created: {
          label: 'Created Work',
          helpText:
            'Search for People & Groups that authored or created the specified Works.',
          relation: 'work',
        },
        curated: {
          label: 'Curated',
          helpText:
            "Search for Groups responsible for the curation of Yale's collections.",
          relation: 'set',
        },
        endAt: {
          label: 'Died/Dissolved At',
          helpText:
            'Search for People & Groups that died or were dissolved in the specified Place.',
          relation: 'place',
          autoCompleteContext: 'agent.endAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        endDate: {
          label: 'Died/Dissolved Date',
          helpText:
            'Search for People & Groups by the date on which they died or were dissolved.',
          relation: 'date',
        },
        encountered: {
          label: 'Encountered',
          helpText:
            'Search for People & Groups that encountered or found the specified Objects',
          relation: 'item',
        },
        foundedBy: {
          label: 'Founded By',
          helpText:
            'Search for Groups by the specified People that were responsible for their foundation.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        founded: {
          label: 'Founded Group',
          helpText:
            'Search for People who were responsible for the foundation of the specified Groups.',
          relation: 'agent',
        },
        gender: {
          label: 'Gender',
          helpText:
            'Search for People by the specified Gender. This information comes from external sources, and gender information may not match expected results.',
          relation: 'concept',
          autoCompleteContext: 'agent.gender',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        hasDigitalImage: {
          label: 'Have Digital Image',
          helpText:
            'Search for People & Groups for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        memberOfInverse: {
          label: 'Have Member',
          helpText:
            'Search for Groups that have the specified People & Groups as members.',
          relation: 'agent',
        },
        id: {
          label: 'LUX URI',
          helpText:
            'Search for People & Groups by their LUX data URI (starting with https://lux-front-dev.collections.yale.edu/data/agent/ and followed by a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        identifier: {
          label: 'Identifier',
          helpText:
            'Search for People & Groups by a string identifier or an external authority URI, such as ULAN, VIAF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        memberOf: {
          label: 'Member of',
          helpText:
            'Search for People & Groups that are members of other Groups.',
          relation: 'agent',
          autoCompleteContext: 'agent.memberOf',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        nationality: {
          label: 'Nationality',
          helpText:
            'Search for People & Groups with the specified Nationality.',
          relation: 'concept',
          autoCompleteContext: 'agent.nationality',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        occupation: {
          label: 'Occupation',
          helpText:
            'Search for a People & Groups with the specified Occupation.',
          relation: 'concept',
          autoCompleteContext: 'agent.occupation',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        activeAt: {
          label: 'Professionally Active At',
          helpText:
            'Search for People & Groups that were professionally active in the specified Places.',
          relation: 'place',
          autoCompleteContext: 'agent.activeAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        activeDate: {
          label: 'Professionally Active Date',
          helpText:
            'Search for People & Groups by the dates on which they were professionally active.',
          relation: 'date',
        },
        published: {
          label: 'Published',
          helpText:
            'Search for People & Groups that published the specified Works',
          relation: 'work',
        },
        subjectOfAgent: {
          label: 'Subject Of',
          helpText:
            'Search for People & Groups that are the subject of the specified Works.',
          relation: 'work',
        },
      },
      concept: {
        name: {
          label: 'Name',
          helpText:
            'Enter term(s) to be found within the title or name of the Concept or Type.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'Anywhere',
          helpText:
            'Search for Concept & Types by terms anywhere in the record.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        broader: {
          label: 'Broader Concept',
          helpText:
            'Search for Concept terms that are hierarchically narrower than the specified broader term.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'Categorized As',
          helpText:
            'Search for Concept and Type terms that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'concept.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classificationOfConcept: {
          label: 'Category for Concept',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Concept & Type terms.',
          relation: 'concept',
        },
        classificationOfEvent: {
          label: 'Category for Event',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Events.',
          relation: 'event',
        },
        classificationOfItem: {
          label: 'Category for Object',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Objects.',
          relation: 'item',
        },
        classificationOfAgent: {
          label: 'Category for People & Groups',
          helpText:
            'Search for Concept and Type terms that are the category of the specified People & Groups.',
          relation: 'agent',
        },
        classificationOfPlace: {
          label: 'Category for Place',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Places.',
          relation: 'place',
        },
        classificationOfWork: {
          label: 'Category for Work',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Works.',
          relation: 'work',
        },
        genderOf: {
          label: 'Gender of',
          helpText:
            'Search for Concept terms that describe the Gender of the specified People & Groups. This information comes from external sources, and gender information may not match expected results.',
          relation: 'agent',
        },
        id: {
          label: 'LUX URI',
          helpText:
            'Search for Concept or Type terms by their LUX data URI (starting with https://lux-front-dev.collections.yale.edu/data/concept/ and followed by a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        identifier: {
          label: 'Identifier',
          helpText:
            'Search for Concept or Type terms by a string identifier or an external authority URI, such as AAT, LCSH or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        languageOf: {
          label: 'Language of Work',
          helpText:
            'Search for Concept terms that describe the Language of the specified Work.',
          relation: 'work',
        },
        materialOfItem: {
          label: 'Material of',
          helpText:
            'Search for Concepts that are the material of the specified Object (used primarily for art works).',
          relation: 'item',
        },
        narrower: {
          label: 'Narrower Concept',
          helpText:
            'Search for Concept terms that are hierarchically broader than the specified Narrower term.',
          relation: 'concept',
        },
        nationalityOf: {
          label: 'Nationality of',
          helpText:
            'Search for Concept terms that describe the Nationality of the specified People & Groups.',
          relation: 'agent',
        },
        occupationOf: {
          label: 'Occupation of',
          helpText:
            'Search for Concept terms that describe the Occupation of the specified People & Groups.',
          relation: 'agent',
        },
        subjectOfConcept: {
          label: 'Subject Of',
          helpText:
            'Search for Concept & Type terms that are the subject of the specified Works.',
          relation: 'work',
        },
        usedToProduce: {
          label: 'Technique Of',
          helpText:
            'Search for Concept and Type terms that are the creation technique of the specified Objects',
          relation: 'item',
        },
      },
      event: {
        name: {
          label: 'Name',
          helpText:
            'Enter term(s) to be found within the title or name of the Event.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'Anywhere',
          helpText: 'Search for Events by terms anywhere in the record.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        carriedOutBy: {
          label: 'Carried Out By',
          helpText:
            'Search for Events that were carried out by the specified People & Groups',
          relation: 'agent',
          autoCompleteContext: 'event.carriedOutBy',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'Categorized As',
          helpText:
            'Search for Events that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'event.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        endDate: {
          label: 'End Date',
          helpText: 'Search for Events by the date on which they ended.',
          relation: 'date',
        },
        id: {
          label: 'LUX URI',
          helpText:
            'Search for Events by their LUX data URI (starting with https://lux-front-dev.collections.yale.edu/data/event/ and followed by a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        identifier: {
          label: 'Identifier',
          helpText:
            'Search for Events by a string identifier, such as an Accession Number, or an external authority URI, such as VIAF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        startDate: {
          label: 'Start Date',
          helpText: 'Search for Events by the date on which they started.',
          relation: 'date',
        },
        tookPlaceAt: {
          label: 'Took Place At',
          helpText: 'Search for Events which occurred at the specified Place.',
          relation: 'place',
          autoCompleteContext: 'event.tookPlaceAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        used: {
          label: 'Used',
          helpText: 'Search for Events which used the specified records.',
          relation: 'set',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
      },
      item: {
        name: {
          label: 'Name',
          helpText:
            'Enter term(s) to be found within the title or name of the Object.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'Anywhere',
          helpText: 'Search for Objects by terms anywhere in the record.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'Categorized As',
          helpText:
            'Search for Objects that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'item.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        producedAt: {
          label: 'Created At',
          helpText:
            'Search for Objects that were created at the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        producedBy: {
          label: 'Created By',
          helpText:
            'Search for Objects that were created by the specified People & Groups.',
          relation: 'agent',
          autoCompleteContext: 'item.producedBy',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        producedDate: {
          label: 'Created Date',
          helpText:
            'Search for Objects by the date on which they were created.',
          relation: 'date',
        },
        producedUsing: {
          label: 'Created Using Technique',
          helpText:
            'Search for Objects that were created using the specified Technique.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        dimension: {
          label: 'Dimension: Any',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against each of the object's dimensions. The unit is centimeters.",
          relation: 'float',
        },
        depth: {
          label: 'Dimension: Depth',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against the object's depth dimension. The unit is centimeters.",
          relation: 'float',
        },
        height: {
          label: 'Dimension: Height',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against the object's height dimension. The unit is centimeters.",
          relation: 'float',
        },
        width: {
          label: 'Dimension: Width',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against the object's width dimension. The unit is centimeters.",
          relation: 'float',
        },
        encounteredAt: {
          label: 'Encountered At',
          helpText:
            'Search for Objects that were encountered or found at the specified Place. This is primarily used for Specimens.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        encounteredBy: {
          label: 'Encountered By',
          helpText:
            'Search for Objects that were encountered or found by the specified People & Groups. This is primarily used for Specimens.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        encounteredDate: {
          label: 'Encountered Date',
          helpText:
            'Search for Objects by the date on which they were encountered or found.',
          relation: 'date',
        },
        hasDigitalImage: {
          label: 'Have Digital Image',
          helpText:
            'Search for Objects for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        id: {
          label: 'LUX URI',
          helpText:
            'Search for Objects by their LUX data URI (starting with https://lux-front-dev.collections.yale.edu/data/object/ and followed by a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        identifier: {
          label: 'Identifier',
          helpText:
            'Search for Objects by a string identifier or an external authority URI, such as LCSH, BNF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        carries: {
          label: 'Include Work',
          helpText:
            'Search for Objects that include the specified Works. Use this option to include additional criteria from Works records in your search.',
          relation: 'work',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        isOnline: {
          label: 'Are Online',
          helpText: 'Search for Objects with Online Versions.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        material: {
          label: 'Material',
          helpText:
            'Search for Objects that are made of the specified Material (used primarily for art works).',
          relation: 'concept',
          autoCompleteContext: 'item.material',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        memberOf: {
          label: 'Member of',
          helpText:
            'Search for Objects that are members of the specified Collection, Exhibition or Archive.',
          relation: 'set',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
      },
      place: {
        name: {
          label: 'Name',
          helpText:
            'Enter term(s) to be found within the title or name of the Place.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'Anywhere',
          helpText: 'Search for Places by terms anywhere in the record.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'Categorized As',
          helpText:
            'Search for Places that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        id: {
          label: 'LUX URI',
          helpText:
            'Search for Places by their LUX data URI (starting with https://lux-front-dev.collections.yale.edu/data/place/ and followed by a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        identifier: {
          label: 'Identifier',
          helpText:
            'Search for Places by a string identifier or an external authority URI, such as TGN, Geonames or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        partOf: {
          label: 'Part of',
          helpText: 'Search for Places that are within the specified Place.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        activePlaceOfAgent: {
          label: 'Place of Activity of',
          helpText:
            'Search for Places where the specified People & Groups were professionally active.',
          relation: 'agent',
        },
        startPlaceOfAgent: {
          label: 'Place of Birth/Formation of',
          helpText:
            'Search for Places where People & Groups were born or formed.',
          relation: 'agent',
        },
        createdHere: {
          label: 'Place of Creation Of',
          helpText: 'Search for Places where Works were Created.',
          relation: 'work',
        },
        producedHere: {
          label: 'Place of Creation Of',
          helpText:
            'Search for Places where the specified Objects were created.',
          relation: 'item',
        },
        endPlaceOfAgent: {
          label: 'Place of Death of',
          helpText:
            'Search for Places where the specified People & Groups died or were dissolved.',
          relation: 'agent',
        },
        encounteredHere: {
          label: 'Place of Encounter Of',
          helpText:
            'Search for Places where the specified Objects were encountered.',
          relation: 'item',
        },
        placeOfEvent: {
          label: 'Place of Event',
          helpText: 'Search for Places where the specified Events occurred.',
          relation: 'event',
        },
        publishedHere: {
          label: 'Place of Publication Of',
          helpText:
            'Search for Places where the specified Works were published.',
          relation: 'work',
        },
        subjectOfPlace: {
          label: 'Subject Of',
          helpText:
            'Search for Places that are the subject of the specified Works.',
          relation: 'work',
        },
      },
      set: {
        name: {
          label: 'Name',
          helpText:
            'Enter term(s) to be found within the title or name of the Collection.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'Anywhere',
          helpText: 'Search for Collections by terms anywhere in the record.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'Categorized As',
          helpText:
            'Search for Collections that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        containing: {
          label: 'Contain',
          helpText:
            'Search for Collections that contain the specified Objects.',
          relation: 'item',
        },
        curatedBy: {
          label: 'Curated By',
          helpText:
            'Search for Collections that are maintained by the specified Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        id: {
          label: 'LUX URI',
          helpText:
            'Search for Collections by their LUX data URI (starting with https://lux-front-dev.collections.yale.edu/data/set/ and followed by a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        identifier: {
          label: 'Identifier',
          helpText:
            'Search for Collections by a string identifier or an external authority URI, such as VIAF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        member: {
          label: 'Member of',
          helpText:
            'Search for Collections that are hierarchically within the specified Collection.',
          relation: 'item',
        },
        usedForEvent: {
          label: 'Used for Exhibition',
          helpText:
            'Search for Collections that record the objects used in the specified Events.',
          relation: 'event',
        },
      },
      work: {
        name: {
          label: 'Name',
          helpText:
            'Enter term(s) to be found within the title or name of the Work.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutConcept: {
          label: 'About Concept',
          helpText:
            'Search for Works that are about the specified Concept or Type terms.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutAgent: {
          label: 'About People & Groups',
          helpText:
            'Search for Works that are about the specified People & Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutPlace: {
          label: 'About Place',
          helpText: 'Search for Works that are about the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'Anywhere',
          helpText: 'Enter term(s) to be found anywhere in the record.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'Categorized As',
          helpText:
            'Search for Works that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'work.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        createdAt: {
          label: 'Created At',
          helpText:
            'Search for Works that were created at the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        createdBy: {
          label: 'Created By',
          helpText:
            'Search for Works that were authored or created by the specified People & Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        createdDate: {
          label: 'Created Date',
          helpText:
            'Search for Works by the date on which they were authored or created. Note the difference with Publication Date.',
          relation: 'date',
        },
        hasDigitalImage: {
          label: 'Have Digital Image',
          helpText: 'Search for Works for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        id: {
          label: 'LUX URI',
          helpText:
            'Search for Works by their LUX data URI (starting with https://lux-front-dev.collections.yale.edu/data/work/ and followed by a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        identifier: {
          label: 'Identifier',
          helpText:
            'Search for Works by a string identifier, such as a call number, or an external authority URI, such as BNF, DNB or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        carriedBy: {
          label: 'Included In Object',
          helpText:
            'Search for Works that are included in the specified Objects. Use this option to include criteria from Objects in your search.',
          relation: 'item',
        },
        isOnline: {
          label: 'Are Online',
          helpText: 'Search for Works with Online Versions.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        language: {
          label: 'Language',
          helpText: 'Search for Works in the specified Language.',
          relation: 'concept',
          autoCompleteContext: 'work.language',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        publishedAt: {
          label: 'Published At',
          helpText:
            'Search for Works that were published by the specified People & Groups. Note the difference with Creation Place, which is where the text was originally created.',
          relation: 'place',
          autoCompleteContext: 'work.publishedAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        publishedBy: {
          label: 'Published By',
          helpText:
            'Search for Works that were published by the specified People & Groups. Note the difference with Creation People & Groups that originally wrote the text or conceived the work.',
          relation: 'agent',
          autoCompleteContext: 'work.publishedBy',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        publishedDate: {
          label: 'Published Date',
          helpText:
            'Search for Works by the date on which they were published. Note the difference with Creation Date, which is when the work was originally conceived by its creator.',
          relation: 'date',
        },
      },
    },
    options: {
      keyword: {
        allowed: [
          'case-sensitive',
          'case-insensitive',
          'diacritic-sensitive',
          'diacritic-insensitive',
          'punctuation-sensitive',
          'punctuation-insensitive',
          'whitespace-insensitive',
          'stemmed',
          'unstemmed',
          'wildcarded',
          'unwildcarded',
        ],
        default: [
          'case-insensitive',
          'diacritic-insensitive',
          'punctuation-insensitive',
          'whitespace-insensitive',
          'stemmed',
          'wildcarded',
        ],
      },
      exact: {
        allowed: ['exact'],
        default: ['exact'],
      },
    },
  }
}
