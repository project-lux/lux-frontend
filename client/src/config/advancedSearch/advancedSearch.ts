/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IAdvancedSearchConfig {
  terms: any
  options: any
  stopWords: Array<string>
}

/**
 * Local copy of the advanced search configuration used to render components based on
 * user interaction with the advanced search form. This configuration is requested from
 * a server on system start up.
 */

export function advancedSearch(): IAdvancedSearchConfig {
  return {
    terms: {
      item: {
        memberOf: {
          label: 'are a member of',
          aiInterpretationLabel: 'Member Of',
          helpText:
            'Search for Objects that are members of the specified Collection, Exhibition or Archive.',
          relation: 'set',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'are categorized as',
          aiInterpretationLabel: 'Categorized As',
          helpText:
            'Search for Objects that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'item.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        material: {
          label: 'are made of a material',
          aiInterpretationLabel: 'Made Of A Material',
          helpText:
            'Search for Objects that are made of the specified Material (used primarily for art works).',
          relation: 'concept',
          autoCompleteContext: 'item.material',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        name: {
          label: 'are named',
          aiInterpretationLabel: 'Named',
          helpText:
            'Enter term(s) to be found within the title or name of the Object. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        similar: {
          label: 'are similar to',
          aiInterpretationLabel: 'Similar To',
          helpText:
            'Search for Objects that are similar to the specified Objects.',
          relation: 'text',
        },
        subjectOfSet: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Objects that are the subject of the specified Collections.',
          relation: 'set',
        },
        subjectOfWork: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Objects that are the subject of the specified Works.',
          relation: 'work',
        },
        carries: {
          label: 'carry or show',
          aiInterpretationLabel: 'Carry Or Show',
          helpText:
            'Search for Objects that include the specified Works. Use this option to include additional criteria from Works records in your search.',
          relation: 'work',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'contain, anywhere in the record',
          aiInterpretationLabel: 'Contain, Anywhere In The Record',
          helpText:
            'Search for Objects by terms anywhere in the record. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        id: {
          label: 'have a LUX URI of',
          aiInterpretationLabel: 'LUX URI Of',
          helpText:
            'Search for Objects by their LUX data URI (e.g. starting with https://lux-front-dev.collections.yale.edu/data/ and followed by a URI path containing a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        hasDigitalImage: {
          label: 'have a digital image available',
          aiInterpretationLabel: 'Digital Image Available',
          helpText:
            'Search for Objects for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        identifier: {
          label: 'have an external authority URI of',
          aiInterpretationLabel: 'External Authority URI Of',
          helpText:
            'Search for Objects by a string identifier or an external authority URI, such as LCSH, BNF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        recordType: {
          label: 'have an object class of',
          aiInterpretationLabel: 'Object Class Of',
          helpText:
            'Search for records categorized as either a "Physical Object" or a "Digital Object". Physical Objects are physical items, such as paintings, sculptures, fossils and other specimens, and archival objects. Individual physical copies of books are included in this class. Digital Object are digital items, such as internet resources (datasets, e-books, and other digital files). Digitized images of collection items that are physical objects can be found with the “Is Online” facet on Physical Objects.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        isOnline: {
          label: 'have an online version available',
          aiInterpretationLabel: 'Online Version Available',
          helpText: 'Search for Objects with Online Versions.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        productionInfluencedBy: {
          label: 'have creation influenced by',
          aiInterpretationLabel: 'Creation Influenced By',
          helpText:
            'Search for Objects that were created with influence by the specified Person or Group',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        depth: {
          label: 'have some depth of',
          aiInterpretationLabel: 'Some Depth Of',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against the object's depth dimension. The unit is centimeters.",
          relation: 'float',
        },
        dimension: {
          label: 'have some dimension of',
          aiInterpretationLabel: 'Some Dimension Of',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against each of the object's dimensions. The unit is centimeters.",
          relation: 'float',
        },
        height: {
          label: 'have some height of',
          aiInterpretationLabel: 'Some Height Of',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against the object's height dimension. The unit is centimeters.",
          relation: 'float',
        },
        width: {
          label: 'have some width of',
          aiInterpretationLabel: 'Some Width Of',
          helpText:
            "Search for Objects by selecting a comparison operator and entering a value to be compared against the object's width dimension. The unit is centimeters.",
          relation: 'float',
        },
        producedAt: {
          label: 'were created at',
          aiInterpretationLabel: 'Created At',
          helpText:
            'Search for Objects that were created at the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        producedBy: {
          label: 'were created by',
          aiInterpretationLabel: 'Created By',
          helpText:
            'Search for Objects that were created by the specified People & Groups.',
          relation: 'agent',
          autoCompleteContext: 'item.producedBy',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        producedDate: {
          label: 'were created on',
          aiInterpretationLabel: 'Created On',
          helpText:
            'Search for Objects by the date on which they were created.',
          relation: 'date',
        },
        producedUsing: {
          label: 'were created using a technique',
          aiInterpretationLabel: 'Created Using A Technique',
          helpText:
            'Search for Objects that were created using the specified Technique.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        encounteredAt: {
          label: 'were encountered at',
          aiInterpretationLabel: 'Encountered At',
          helpText:
            'Search for Objects that were encountered or found at the specified Place. This is primarily used for Specimens.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        encounteredBy: {
          label: 'were encountered by',
          aiInterpretationLabel: 'Encountered By',
          helpText:
            'Search for Objects that were encountered or found by the specified People & Groups. This is primarily used for Specimens.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        encounteredDate: {
          label: 'were encountered on',
          aiInterpretationLabel: 'Encountered On',
          helpText:
            'Search for Objects by the date on which they were encountered or found.',
          relation: 'date',
        },
      },
      work: {
        partOfWork: {
          label: 'are a part of',
          aiInterpretationLabel: 'Part Of',
          helpText: 'Search for Works that are part of the specified Works.',
          relation: 'work',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutAgent: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Works that are about the specified People & Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutConcept: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Works that are about the specified Concept or Type terms.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutEvent: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText: 'Search for Works that are about the specified Events.',
          relation: 'event',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutItem: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText: 'Search for Works that are about the specified Objects.',
          relation: 'item',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutPlace: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText: 'Search for Works that are about the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutWork: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText: 'Search for Works that are about the specified Works.',
          relation: 'work',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        carriedBy: {
          label: 'are carried or shown by',
          aiInterpretationLabel: 'Carried Or Shown By',
          helpText:
            'Search for Works that are included in the specified Objects. Use this option to include criteria from Objects in your search.',
          relation: 'item',
        },
        classification: {
          label: 'are categorized as',
          aiInterpretationLabel: 'Categorized As',
          helpText:
            'Search for Works that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'work.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        isPublicDomain: {
          label: 'are in the public domain',
          aiInterpretationLabel: 'Public Domain',
          helpText:
            'Search for Works that have been identified as public domain/no copyright materials. Note that this only applies to materials from the Yale University Art Gallery and Yale Center for British Art collections at this time. For copyright questions or more information about rights and re-use of content found in LUX, please contact the appropriate museum or library or consult the Rights and Usage Frequently Asked Questions(Advanced Search Help) linked below.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        name: {
          label: 'are named',
          aiInterpretationLabel: 'Named',
          helpText:
            'Enter term(s) to be found within the title or name of the Work. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        similar: {
          label: 'are similar to',
          aiInterpretationLabel: 'Similar To',
          helpText: 'Search for Works that are similar to the specified Works.',
          relation: 'text',
        },
        subjectOfSet: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Works that are the subject of the specified Collections.',
          relation: 'set',
        },
        subjectOfWork: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Works that are the subject of the specified Works.',
          relation: 'work',
        },
        containsWork: {
          label: 'contain',
          aiInterpretationLabel: 'Contain',
          helpText: 'Search for Works that contain the specified Works.',
          relation: 'work',
        },
        text: {
          label: 'contain, anywhere in the record',
          aiInterpretationLabel: 'Contain, Anywhere In The Record',
          helpText:
            'Search for Works by terms anywhere in the record. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        id: {
          label: 'have a LUX URI of',
          aiInterpretationLabel: 'LUX URI Of',
          helpText:
            'Search for Works by their LUX data URI (e.g. starting with https://lux-front-dev.collections.yale.edu/data/ and followed by a URI path containing a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        creationCausedBy: {
          label: 'have a creation caused by',
          aiInterpretationLabel: 'Creation Caused By',
          helpText:
            'Search for Works that were created because of the specified Events.',
          relation: 'event',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        creationInfluencedBy: {
          label: 'have a creation influenced by',
          aiInterpretationLabel: 'Creation Influenced By',
          helpText:
            'Search for Works that were created with influence by the specified Person or Group',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        hasDigitalImage: {
          label: 'have a digital image available',
          aiInterpretationLabel: 'Digital Image Available',
          helpText: 'Search for Works for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        language: {
          label: 'have a language of',
          aiInterpretationLabel: 'Language Of',
          helpText: 'Search for Works in the specified Language.',
          relation: 'concept',
          autoCompleteContext: 'work.language',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        recordType: {
          label: 'have a work class of',
          aiInterpretationLabel: 'Work Class Of',
          helpText:
            'Search for records categorized as either a "Visual Work" or a "Textual Work. Visual Works are Works that are primarily visual, such as the images shown by paintings or photographs, sculptures, or other non language oriented creative expressions. Textual Works are Works that are primarily textual or otherwise convey information via human language. An Object may include both visual and textual works, such as a poster with graphics and text. In addition, Textual Works encompasses most items from the Library collections, including posters, artworks, musical scores, video and sound recordings.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        identifier: {
          label: 'have an external authority URI of',
          aiInterpretationLabel: 'External Authority URI Of',
          helpText:
            'Search for Works by a string identifier, such as a call number, or an external authority URI, such as BNF, DNB or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        isOnline: {
          label: 'have an online version available',
          aiInterpretationLabel: 'Online Version Available',
          helpText: 'Search for Works with Online Versions.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        createdAt: {
          label: 'were created at',
          aiInterpretationLabel: 'Created At',
          helpText:
            'Search for Works that were created at the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        createdBy: {
          label: 'were created by',
          aiInterpretationLabel: 'Created By',
          helpText:
            'Search for Works that were authored or created by the specified People & Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        createdDate: {
          label: 'were created on',
          aiInterpretationLabel: 'Created On',
          helpText:
            'Search for Works by the date on which they were authored or created. Note the difference with Publication Date.',
          relation: 'date',
        },
        publishedAt: {
          label: 'were published at',
          aiInterpretationLabel: 'Published At',
          helpText:
            'Search for Works that were published at the specified Place. Note the difference with Creation Place, which is where the text was originally created.',
          relation: 'place',
          autoCompleteContext: 'work.publishedAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        publishedBy: {
          label: 'were published by',
          aiInterpretationLabel: 'Published By',
          helpText:
            'Search for Works that were published by the specified People & Groups. Note the difference with Creation People & Groups that originally wrote the text or conceived the work.',
          relation: 'agent',
          autoCompleteContext: 'work.publishedBy',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        publishedDate: {
          label: 'were published on',
          aiInterpretationLabel: 'Published On',
          helpText:
            'Search for Works by the date on which they were published. Note the difference with Creation Date, which is when the work was originally conceived by its creator.',
          relation: 'date',
        },
      },
      set: {
        memberOf: {
          label: 'are a member of',
          aiInterpretationLabel: 'Member Of',
          helpText:
            'Search for Collections that are hierarchically within the specified Collection.',
          relation: 'set',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutAgent: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Collections that are about the specified People & Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutConcept: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Collections that are about the specified Concept or Type terms.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutEvent: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Collections that are about the specified Events.',
          relation: 'event',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutItem: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Collections that are about the specified Objects.',
          relation: 'item',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutPlace: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Collections that are about the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        aboutWork: {
          label: 'are about',
          aiInterpretationLabel: 'About',
          helpText:
            'Search for Collections that are about the specified Works.',
          relation: 'work',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'are categorized as',
          aiInterpretationLabel: 'Categorized As',
          helpText:
            'Search for Collections that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        curatedBy: {
          label: 'are curated by',
          aiInterpretationLabel: 'Curated By',
          helpText:
            'Search for Collections that are maintained by the specified Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        name: {
          label: 'are named',
          aiInterpretationLabel: 'Named',
          helpText:
            'Enter term(s) to be found within the title or name of the Collection. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        similar: {
          label: 'are similar to',
          aiInterpretationLabel: 'Similar To',
          helpText:
            'Search for Collections that are similar to the specified Collections.',
          relation: 'text',
        },
        containingItem: {
          label: 'contain',
          aiInterpretationLabel: 'Contain',
          helpText:
            'Search for Collections that contain the specified Objects.',
          relation: 'item',
        },
        containingSet: {
          label: 'contain',
          aiInterpretationLabel: 'Contain',
          helpText:
            'Search for Collections that contain the specified Collections.',
          relation: 'set',
        },
        text: {
          label: 'contain, anywhere in the record',
          aiInterpretationLabel: 'Contain, Anywhere In The Record',
          helpText:
            'Search for Collections by terms anywhere in the record. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        id: {
          label: 'have a LUX URI of',
          aiInterpretationLabel: 'LUX URI Of',
          helpText:
            'Search for Collections by their LUX data URI (e.g. starting with https://lux-front-dev.collections.yale.edu/data/ and followed by a URI path containing a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        creationCausedBy: {
          label: 'have a creation caused by',
          aiInterpretationLabel: 'Creation Caused By',
          helpText:
            'Search for Collections that were created because of the specified Events.',
          relation: 'event',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        creationInfluencedBy: {
          label: 'have a creation influenced by',
          aiInterpretationLabel: 'Creation Influenced By',
          helpText:
            'Search for Collections that were created with influence by the specified Person or Group',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        hasDigitalImage: {
          label: 'have a digital image available',
          aiInterpretationLabel: 'Digital Image Available',
          helpText:
            'Search for Collections for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        identifier: {
          label: 'have an external authority URI of',
          aiInterpretationLabel: 'External Authority URI Of',
          helpText:
            'Search for Collections by a string identifier or an external authority URI, such as VIAF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        createdAt: {
          label: 'were created at',
          aiInterpretationLabel: 'Created At',
          helpText:
            'Search for Collections that were created at the specified Places.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        createdBy: {
          label: 'were created by',
          aiInterpretationLabel: 'Created By',
          helpText:
            'Search for Collections that were created by the specified People & Groups.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        createdDate: {
          label: 'were created on',
          aiInterpretationLabel: 'Created On',
          helpText:
            'Search for Collections by the date on which they were created. Note the difference with Publication Date.',
          relation: 'date',
        },
        publishedAt: {
          label: 'were published at',
          aiInterpretationLabel: 'Published At',
          helpText:
            'Search for Collections that were published at the specified Place. Note the difference with Creation Place, which is where the text was originally created.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        publishedBy: {
          label: 'were published by',
          aiInterpretationLabel: 'Published By',
          helpText:
            'Search for Collections that were published by the specified People & Groups. Note the difference with Creation People & Groups that originally wrote the text or conceived the Collection.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        publishedDate: {
          label: 'were published on',
          aiInterpretationLabel: 'Published On',
          helpText:
            'Search for Collections by the date on which they were published. Note the difference with Creation Date, which is when the collection was originally conceived by its creator.',
          relation: 'date',
        },
        usedForEvent: {
          label: 'were used for',
          aiInterpretationLabel: 'Used For',
          helpText:
            'Search for Collections that record the objects used in the specified Events.',
          relation: 'event',
        },
      },
      agent: {
        memberOf: {
          label: 'are a member of',
          aiInterpretationLabel: 'Member Of',
          helpText:
            'Search for People & Groups that are members of other Groups.',
          relation: 'agent',
          autoCompleteContext: 'agent.memberOf',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        classification: {
          label: 'are categorized as',
          aiInterpretationLabel: 'Categorized As',
          helpText:
            'Search for People & Groups that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'agent.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        name: {
          label: 'are named',
          aiInterpretationLabel: 'Named',
          helpText:
            'Enter term(s) to be found within the title or name of the Person or Group. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        similar: {
          label: 'are similar to',
          aiInterpretationLabel: 'Similar To',
          helpText:
            'Search for People & Groups that are similar to the specified People & Groups.',
          relation: 'text',
        },
        subjectOfSet: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for People & Groups that are the subject of the specified Collections.',
          relation: 'set',
        },
        subjectOfWork: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for People & Groups that are the subject of the specified Works.',
          relation: 'work',
        },
        carriedOut: {
          label: 'carried out',
          aiInterpretationLabel: 'Carried Out',
          helpText:
            'Search for People & Groups that carried out the specified Event.',
          relation: 'event',
        },
        professionalActivity: {
          label: 'carried out professional activity categorized as',
          aiInterpretationLabel: 'Carried Out Professional Activity',
          helpText:
            'Search for people and groups that carried out professional activities of the given categorization.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        text: {
          label: 'contain, anywhere in the record',
          aiInterpretationLabel: 'Contain, Anywhere In The Record',
          helpText:
            'Search for People & Groups by terms anywhere in the record. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        created: {
          label: 'created',
          aiInterpretationLabel: 'Created',
          helpText:
            'Search for People & Groups that authored or created the specified Works.',
          relation: 'work',
        },
        createdSet: {
          label: 'created',
          aiInterpretationLabel: 'Created',
          helpText:
            'Search for People & Groups that created the specified Collections.',
          relation: 'set',
        },
        produced: {
          label: 'created',
          aiInterpretationLabel: 'Created',
          helpText:
            'Search for People & Groups that created the specified Objects.',
          relation: 'item',
        },
        curated: {
          label: 'curated',
          aiInterpretationLabel: 'Curated',
          helpText:
            "Search for Groups responsible for the curation of Yale's collections.",
          relation: 'set',
        },
        endAt: {
          label: 'died or dissolved at',
          aiInterpretationLabel: 'Died Or Dissolved At',
          helpText:
            'Search for People & Groups that died or were dissolved in the specified Place.',
          relation: 'place',
          autoCompleteContext: 'agent.endAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        endDate: {
          label: 'died or dissolved on',
          aiInterpretationLabel: 'Died Or Dissolved On',
          helpText:
            'Search for People & Groups by the date on which they died or were dissolved.',
          relation: 'date',
        },
        encountered: {
          label: 'encountered',
          aiInterpretationLabel: 'Encountered',
          helpText:
            'Search for People & Groups that encountered or found the specified Objects.',
          relation: 'item',
        },
        founded: {
          label: 'founded',
          aiInterpretationLabel: 'Founded',
          helpText:
            'Search for People who were responsible for the foundation of the specified Groups.',
          relation: 'agent',
        },
        id: {
          label: 'have a LUX URI of',
          aiInterpretationLabel: 'LUX URI Of',
          helpText:
            'Search for People & Groups by their LUX data URI (e.g. starting with https://lux-front-dev.collections.yale.edu/data/ and followed by a URI path containing a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        hasDigitalImage: {
          label: 'have a digital image available',
          aiInterpretationLabel: 'Digital Image Available',
          helpText:
            'Search for People & Groups for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        gender: {
          label: 'have a gender categorized as',
          aiInterpretationLabel: 'Gender',
          helpText:
            'Search for People by the specified Gender. This information comes from external sources, and gender information may not match expected results.',
          relation: 'concept',
          autoCompleteContext: 'agent.gender',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        nationality: {
          label: 'have a nationality categorized as',
          aiInterpretationLabel: 'Nationality',
          helpText:
            'Search for People & Groups with the specified Nationality.',
          relation: 'concept',
          autoCompleteContext: 'agent.nationality',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        recordType: {
          label: 'have a person or group class of',
          aiInterpretationLabel: 'Person Or Group Class Of',
          helpText:
            'Search for records categorized as either a "Person" or a "Group". Person is an individual either real or fictionalized. Group is an organization, either real or fictionalized, with one or more members.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        identifier: {
          label: 'have an external authority identifier of',
          aiInterpretationLabel: 'External Authority Identifier Of',
          helpText:
            'Search for People & Groups by a string identifier or an external authority URI, such as ULAN, VIAF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        occupation: {
          label: 'have an occupation or role categorized as',
          aiInterpretationLabel: 'Occupation Or Role',
          helpText:
            'Search for People & Groups with the specified Occupation or Role.',
          relation: 'concept',
          autoCompleteContext: 'agent.occupation',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        memberOfInverse: {
          label: 'include a member',
          aiInterpretationLabel: 'Include A Member',
          helpText:
            'Search for Groups that have the specified People & Groups as members.',
          relation: 'agent',
        },
        influenced: {
          label: 'influenced the creation of',
          aiInterpretationLabel: 'Influenced The Creation Of',
          helpText:
            'Search for People & Groups that influenced the specified Concepts',
          relation: 'concept',
        },
        influencedCreation: {
          label: 'influenced the creation of',
          aiInterpretationLabel: 'Influenced The Creation Of',
          helpText:
            'Search for People & Groups that influenced the creation of the specified Works',
          relation: 'work',
        },
        influencedCreationSet: {
          label: 'influenced the creation of',
          aiInterpretationLabel: 'Influenced The Creation Of',
          helpText:
            'Search for People & Groups that influenced the creation of the specified Collections',
          relation: 'set',
        },
        influencedProduction: {
          label: 'influenced the production of',
          aiInterpretationLabel: 'Influenced The Production Of',
          helpText:
            'Search for People & Groups that influenced the creation of the specified Objects',
          relation: 'item',
        },
        published: {
          label: 'published',
          aiInterpretationLabel: 'Published',
          helpText:
            'Search for People & Groups that published the specified Works.',
          relation: 'work',
        },
        publishedSet: {
          label: 'published',
          aiInterpretationLabel: 'Published',
          helpText:
            'Search for People & Groups that published the specified Collections.',
          relation: 'set',
        },
        startAt: {
          label: 'were born or formed at',
          aiInterpretationLabel: 'Born Or Formed At',
          helpText:
            'Search for People & Groups that were born or formed in the specified Place.',
          relation: 'place',
          autoCompleteContext: 'agent.startAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        startDate: {
          label: 'were born or formed on',
          aiInterpretationLabel: 'Born Or Formed On',
          helpText:
            'Search People & Groups by the date on which they were born or formed.',
          relation: 'date',
        },
        foundedBy: {
          label: 'were founded by',
          aiInterpretationLabel: 'Founded By',
          helpText:
            'Search for Groups by the specified People that were responsible for their foundation.',
          relation: 'agent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        activeAt: {
          label: 'were professionally active at',
          aiInterpretationLabel: 'Professionally Active At',
          helpText:
            'Search for People & Groups that were professionally active in the specified Places.',
          relation: 'place',
          autoCompleteContext: 'agent.activeAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        activeDate: {
          label: 'were professionally active on',
          aiInterpretationLabel: 'Professionally Active On',
          helpText:
            'Search for People & Groups by the dates on which they were professionally active.',
          relation: 'date',
        },
      },
      place: {
        classification: {
          label: 'are categorized as',
          aiInterpretationLabel: 'Categorized As',
          helpText:
            'Search for Places that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        name: {
          label: 'are named',
          aiInterpretationLabel: 'Named',
          helpText:
            'Enter term(s) to be found within the title or name of the Place. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        similar: {
          label: 'are similar to',
          aiInterpretationLabel: 'Similar To',
          helpText:
            'Search for Places that are similar to the specified Places.',
          relation: 'text',
        },
        placeOfEvent: {
          label: 'are the location of',
          aiInterpretationLabel: 'Location Of',
          helpText: 'Search for Places where the specified Events occurred.',
          relation: 'event',
        },
        startPlaceOfAgent: {
          label: 'are the location of birth or formation of',
          aiInterpretationLabel: 'Location Of Birth Or Formation Of',
          helpText:
            'Search for Places where People & Groups were born or formed.',
          relation: 'agent',
        },
        createdHere: {
          label: 'are the location of creation of',
          aiInterpretationLabel: 'Location Of Creation Of',
          helpText: 'Search for Places where Works were Created.',
          relation: 'work',
        },
        producedHere: {
          label: 'are the location of creation of',
          aiInterpretationLabel: 'Location Of Creation Of',
          helpText:
            'Search for Places where the specified Objects were created.',
          relation: 'item',
        },
        endPlaceOfAgent: {
          label: 'are the location of death or dissolution of',
          aiInterpretationLabel: 'Location Of Death Or Dissolution Of',
          helpText:
            'Search for Places where the specified People & Groups died or were dissolved.',
          relation: 'agent',
        },
        encounteredHere: {
          label: 'are the location of encounter with',
          aiInterpretationLabel: 'Location Of Encounter With',
          helpText:
            'Search for Places where the specified Objects were encountered.',
          relation: 'item',
        },
        activePlaceOfAgent: {
          label: 'are the location of professional activity for',
          aiInterpretationLabel: 'Location Of Professional Activity For',
          helpText:
            'Search for Places where the specified People & Groups were professionally active.',
          relation: 'agent',
        },
        setPublishedHere: {
          label: 'are the location of publication of',
          aiInterpretationLabel: 'Location Of Publication Of',
          helpText:
            'Search for Places where the specified Collections were published.',
          relation: 'set',
        },
        publishedHere: {
          label: 'are the location of the publication of',
          aiInterpretationLabel: 'Location Of The Publication Of',
          helpText:
            'Search for Places where the specified Works were published.',
          relation: 'work',
        },
        subjectOfSet: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Places that are the subject of the specified Collections.',
          relation: 'set',
        },
        subjectOfWork: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Places that are the subject of the specified Works.',
          relation: 'work',
        },
        partOf: {
          label: 'are within',
          aiInterpretationLabel: 'Within',
          helpText: 'Search for Places that are within the specified Place.',
          relation: 'place',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        contains: {
          label: 'contain',
          aiInterpretationLabel: 'Contain',
          helpText: 'Search for Places that contain the specified Places.',
          relation: 'place',
        },
        text: {
          label: 'contain, anywhere in the record',
          aiInterpretationLabel: 'Contain, Anywhere In The Record',
          helpText:
            'Search for Places by terms anywhere in the record. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        id: {
          label: 'have a LUX URI of',
          aiInterpretationLabel: 'LUX URI Of',
          helpText:
            'Search for Places by their LUX data URI (e.g. starting with https://lux-front-dev.collections.yale.edu/data/ and followed by a URI path containing a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        hasDigitalImage: {
          label: 'have a digital image available',
          aiInterpretationLabel: 'Digital Image Available',
          helpText: 'Search for Places for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        identifier: {
          label: 'have an external authority URI of',
          aiInterpretationLabel: 'External Authority URI Of',
          helpText:
            'Search for Places by a string identifier or an external authority URI, such as TGN, Geonames or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        influenced: {
          label: 'influenced the creation of',
          aiInterpretationLabel: 'Influenced The Creation Of',
          helpText: 'Search for Places that influenced the specified Concepts.',
          relation: 'concept',
        },
      },
      concept: {
        narrower: {
          label: 'are broader in scope than',
          aiInterpretationLabel: 'Broader In Scope Than',
          helpText:
            'Search for Concept terms that are hierarchically broader than the specified narrower term.',
          relation: 'concept',
        },
        classification: {
          label: 'are categorized as',
          aiInterpretationLabel: 'Categorized As',
          helpText:
            'Search for Concept and Type terms that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'concept.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        name: {
          label: 'are named',
          aiInterpretationLabel: 'Named',
          helpText:
            'Enter term(s) to be found within the title or name of the Concept or Type. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        broader: {
          label: 'are narrower in scope than',
          aiInterpretationLabel: 'Narrower In Scope Than',
          helpText:
            'Search for Concept terms that are hierarchically narrower than the specified broader term.',
          relation: 'concept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        similar: {
          label: 'are similar to',
          aiInterpretationLabel: 'Similar To',
          helpText:
            'Search for Concept & Type that are similar to the specified Concept & Type.',
          relation: 'text',
        },
        classificationOfAgent: {
          label: 'are the category of',
          aiInterpretationLabel: 'Category Of',
          helpText:
            'Search for Concept and Type terms that are the category of the specified People & Groups.',
          relation: 'agent',
        },
        classificationOfConcept: {
          label: 'are the category of',
          aiInterpretationLabel: 'Category Of',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Concept & Type terms.',
          relation: 'concept',
        },
        classificationOfEvent: {
          label: 'are the category of',
          aiInterpretationLabel: 'Category Of',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Events.',
          relation: 'event',
        },
        classificationOfItem: {
          label: 'are the category of',
          aiInterpretationLabel: 'Category Of',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Objects.',
          relation: 'item',
        },
        classificationOfPlace: {
          label: 'are the category of',
          aiInterpretationLabel: 'Category Of',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Places.',
          relation: 'place',
        },
        classificationOfSet: {
          label: 'are the category of',
          aiInterpretationLabel: 'Category Of',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Collections.',
          relation: 'set',
        },
        classificationOfWork: {
          label: 'are the category of',
          aiInterpretationLabel: 'Category Of',
          helpText:
            'Search for Concept and Type terms that are the category of the specified Works.',
          relation: 'work',
        },
        genderOf: {
          label: 'are the gender of',
          aiInterpretationLabel: 'Gender Of',
          helpText:
            'Search for Concept terms that describe the Gender of the specified People & Groups. This information comes from external sources, and gender information may not match expected results.',
          relation: 'agent',
        },
        languageOf: {
          label: 'are the language of',
          aiInterpretationLabel: 'Language Of',
          helpText:
            'Search for Concept terms that describe the Language of the specified Work.',
          relation: 'work',
        },
        materialOfItem: {
          label: 'are the material of',
          aiInterpretationLabel: 'Material Of',
          helpText:
            'Search for Concepts that are the material of the specified Object (used primarily for art works).',
          relation: 'item',
        },
        nationalityOf: {
          label: 'are the nationality of',
          aiInterpretationLabel: 'Nationality Of',
          helpText:
            'Search for Concept terms that describe the Nationality of the specified People & Groups.',
          relation: 'agent',
        },
        occupationOf: {
          label: 'are the occupation or role of',
          aiInterpretationLabel: 'Occupation Or Role Of',
          helpText:
            'Search for Concept terms that describe the Occupation of the specified People & Groups.',
          relation: 'agent',
        },
        professionalActivityOf: {
          label: 'are the professional activity of',
          aiInterpretationLabel: 'Professional Activity Of',
          helpText:
            'Search for Concept terms that describe the Professional Activity of the specified People & Groups.',
          relation: 'agent',
        },
        subjectOfSet: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Concept & Type terms that are the subject of the specified Collections.',
          relation: 'set',
        },
        subjectOfWork: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Concept & Type terms that are the subject of the specified Works.',
          relation: 'work',
        },
        usedToProduce: {
          label: 'are the technique of',
          aiInterpretationLabel: 'Technique Of',
          helpText:
            'Search for Concept and Type terms that are the creation technique of the specified Objects.',
          relation: 'item',
        },
        text: {
          label: 'contain, anywhere in the record',
          aiInterpretationLabel: 'Contain, Anywhere In The Record',
          helpText:
            'Search for Concept & Types by terms anywhere in the record. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        id: {
          label: 'have a LUX URI of',
          aiInterpretationLabel: 'LUX URI Of',
          helpText:
            'Search for Concept or Type terms by their LUX data URI (e.g. starting with https://lux-front-dev.collections.yale.edu/data/ and followed by a URI path containing a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        recordType: {
          label: 'have a concept class of',
          aiInterpretationLabel: 'Concept Class Of',
          helpText:
            'Search for records categorized as either a "Measurement Unit", "Language", "Material", "Currency" or a "General Concept". Measurement Units are Concepts that are used as the unit of a measurement, such as inches, seconds, kilograms or bytes. Languages are Concepts that represent human-spoken languages, such as English, Spanish or Latin. Materials are Concepts that represent a class of physical material, such as bronze, paper, or agate. Currencies are Concepts that represent monetary currencies, such as dollars, euros, or francs. General Concepts are Concepts that represent more general ideas or subjects, which excludes the more specific classes of Measurement Unit, Language, Material, and Currency.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        hasDigitalImage: {
          label: 'have a digital image available',
          aiInterpretationLabel: 'Digital Image Available',
          helpText:
            'Search for Concept and Type terms for which digital images are available.',
          relation: 'boolean',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        identifier: {
          label: 'have an external authority identifier of',
          aiInterpretationLabel: 'External Authority Identifier Of',
          helpText:
            'Search for Concept or Type terms by a string identifier or an external authority URI, such as AAT, LCSH or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        influenced: {
          label: 'influenced the creation of',
          aiInterpretationLabel: 'Influenced The Creation Of',
          helpText:
            'Search for Concepts that influenced the specified Concepts.',
          relation: 'concept',
        },
        influencedByAgent: {
          label: 'whose creation was influenced by',
          aiInterpretationLabel: 'Whose Creation Was Influenced By',
          helpText:
            'Search for Concepts which are influenced by the specified People & Groups.',
          relation: 'agent',
          autoCompleteContext: 'concept.influencedByAgent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        influencedByConcept: {
          label: 'whose creation was influenced by',
          aiInterpretationLabel: 'Whose Creation Was Influenced By',
          helpText:
            'Search for Concepts which are influenced by the specified Concepts.',
          relation: 'concept',
          autoCompleteContext: 'concept.influencedByConcept',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        influencedByEvent: {
          label: 'whose creation was influenced by',
          aiInterpretationLabel: 'Whose Creation Was Influenced By',
          helpText:
            'Search for Concepts which are influenced by the specified Events.',
          relation: 'event',
          autoCompleteContext: 'concept.influencedByEvent',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        influencedByPlace: {
          label: 'whose creation was influenced by',
          aiInterpretationLabel: 'Whose Creation Was Influenced By',
          helpText:
            'Search for Concepts which are influenced by the specified Places.',
          relation: 'place',
          autoCompleteContext: 'concept.influencedByPlace',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
      },
      event: {
        classification: {
          label: 'are categorized as',
          aiInterpretationLabel: 'Categorized As',
          helpText:
            'Search for Events that are categorized with the specified Concept or Type terms.',
          relation: 'concept',
          autoCompleteContext: 'event.classification',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        name: {
          label: 'are named',
          aiInterpretationLabel: 'Named',
          helpText:
            'Enter term(s) to be found within the title or name of the Event. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        similar: {
          label: 'are similar to',
          aiInterpretationLabel: 'Similar To',
          helpText:
            'Search for Events that are similar to the specified Events.',
          relation: 'text',
        },
        subjectOfSet: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Events that are the subject of the specified Collections.',
          relation: 'set',
        },
        subjectOfWork: {
          label: 'are the subject of',
          aiInterpretationLabel: 'Subject Of',
          helpText:
            'Search for Events that are the subject of the specified Works.',
          relation: 'work',
        },
        causedCreationOf: {
          label: 'caused the creation of',
          aiInterpretationLabel: 'Caused The Creation Of',
          helpText:
            'Search for Events that caused the creation of the specified Works.',
          relation: 'work',
        },
        text: {
          label: 'contain, anywhere in the record',
          aiInterpretationLabel: 'Contain, Anywhere In The Record',
          helpText:
            'Search for Events by terms anywhere in the record. "AND", "OR", and "-" do not have special meaning in Advanced Search as they do in Simple Search. Instead use multiple fields connected with "have All of", "have Any of", and "have None of" respectively.',
          relation: 'text',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        endDate: {
          label: 'ended on',
          aiInterpretationLabel: 'Ended On',
          helpText: 'Search for Events by the date on which they ended.',
          relation: 'date',
        },
        id: {
          label: 'have a LUX URI of',
          aiInterpretationLabel: 'LUX URI Of',
          helpText:
            'Search for Events by their LUX data URI (e.g. starting with https://lux-front-dev.collections.yale.edu/data/ and followed by a URI path containing a UUID, not the URI with /view/ in it).',
          relation: 'text',
        },
        recordType: {
          label: 'have an event class of',
          aiInterpretationLabel: 'Event Class Of',
          helpText:
            'Search for records categorized as either a "Period" or an "Activity". Periods are Events that have the class of Period, which consists of a Time Period, as opposed to other human-caused activities. Activities are Events that have the class of Activity, which consists of events such as Exhibitions or other collections-related activities.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        identifier: {
          label: 'have an external authority identifier of',
          aiInterpretationLabel: 'External Authority Identifier Of',
          helpText:
            'Search for Events by a string identifier, such as an Accession Number, or an external authority URI, such as VIAF or wikidata.',
          relation: 'text',
          allowedOptionsName: 'exact',
          defaultOptionsName: 'exact',
        },
        influenced: {
          label: 'influenced the creation of',
          aiInterpretationLabel: 'Influenced The Creation Of',
          helpText: 'Search for Events that influenced the specified Concepts.',
          relation: 'concept',
        },
        startDate: {
          label: 'started on',
          aiInterpretationLabel: 'Started On',
          helpText: 'Search for Events by the date on which they started.',
          relation: 'date',
        },
        tookPlaceAt: {
          label: 'took place at',
          aiInterpretationLabel: 'Took Place At',
          helpText: 'Search for Events which occurred at the specified Place.',
          relation: 'place',
          autoCompleteContext: 'event.tookPlaceAt',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        used: {
          label: 'used',
          aiInterpretationLabel: 'Used',
          helpText: 'Search for Events which used the specified records.',
          relation: 'set',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
        carriedOutBy: {
          label: 'were carried out by',
          aiInterpretationLabel: 'Carried Out By',
          helpText:
            'Search for Events that were carried out by the specified People & Groups.',
          relation: 'agent',
          autoCompleteContext: 'event.carriedOutBy',
          allowedOptionsName: 'keyword',
          defaultOptionsName: 'keyword',
        },
      },
    },
    options: {
      keyword: {
        allowed: [
          'case-insensitive',
          'diacritic-insensitive',
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
      exact: { allowed: ['exact'], default: ['exact'] },
    },
    stopWords: [
      'a',
      'about',
      'actually',
      'almost',
      'also',
      'although',
      'always',
      'am',
      'an',
      'and',
      'any',
      'are',
      'as',
      'at',
      'be',
      'became',
      'become',
      'but',
      'by',
      'can',
      'could',
      'did',
      'do',
      'does',
      'each',
      'either',
      'else',
      'for',
      'from',
      'had',
      'has',
      'have',
      'he',
      'her',
      'hers',
      'hence',
      'him',
      'his',
      'how',
      'i',
      'if',
      'in',
      'into',
      'is',
      'it',
      'its',
      'just',
      'like',
      'may',
      'maybe',
      'me',
      'might',
      'mine',
      'must',
      'my',
      'neither',
      'nor',
      'not',
      'of',
      'oh',
      'ok',
      'out',
      'over',
      'she',
      'the',
      'them',
      'these',
      'those',
      'under',
      'when',
      'where',
      'whereas',
      'wherever',
      'whenever',
      'whether',
      'which',
      'while',
      'who',
      'whom',
      'whoever',
      'whose',
      'why',
      'will',
      'with',
      'within',
      'without',
      'would',
      'yes',
      'yet',
      'you',
      'your',
      'yours',
    ],
  }
}
