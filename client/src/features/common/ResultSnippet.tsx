import type { JSX } from 'react'

import config from '../../config/config'
import ConceptSnippet from '../results/ConceptSnippet'
import EventSnippet from '../results/EventSnippet'
import MyCollectionSnippet from '../results/MyCollectionSnippet'
import ObjectSnippet from '../results/ObjectSnippet'
import PersonSnippet from '../results/PersonSnippet'
import PlaceSnippet from '../results/PlaceSnippet'
import SetSnippet from '../results/SetSnippet'
import WorksSnippet from '../results/WorksSnippet'

const ResultSnippet = (
  uri: string,
  tab: string,
  title: string,
): JSX.Element | null => {
  if (tab === 'objects') {
    return <ObjectSnippet uri={uri} view="list" titleOfTabbedContent={title} />
  }

  if (tab === 'works') {
    return <WorksSnippet uri={uri} view="list" titleOfTabbedContent={title} />
  }

  if (tab === 'collections') {
    return <SetSnippet uri={uri} view="list" titleOfTabbedContent={title} />
  }

  if (config.env.featureMyCollections && tab === 'my-collections') {
    return (
      <MyCollectionSnippet uri={uri} view="list" titleOfTabbedContent={title} />
    )
  }

  if (tab === 'people') {
    return <PersonSnippet uri={uri} view="list" titleOfTabbedContent={title} />
  }

  if (tab === 'places') {
    return <PlaceSnippet uri={uri} titleOfTabbedContent={title} />
  }

  if (tab === 'concepts') {
    return <ConceptSnippet uri={uri} titleOfTabbedContent={title} />
  }

  if (tab === 'events') {
    return <EventSnippet uri={uri} titleOfTabbedContent={title} />
  }

  return null
}

export default ResultSnippet
