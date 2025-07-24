import ConceptSnippet from '../results/ConceptSnippet'
import EventSnippet from '../results/EventSnippet'
import MyCollectionSnippet from '../results/MyCollectionSnippet'
import ObjectSnippet from '../results/ObjectSnippet'
import PersonSnippet from '../results/PersonSnippet'
import PlaceSnippet from '../results/PlaceSnippet'
import SetSnippet from '../results/SetSnippet'
import WorksSnippet from '../results/WorksSnippet'

const ResultSnippet = (uri: string, tab: string): JSX.Element | null => {
  if (tab === 'objects') {
    return <ObjectSnippet uri={uri} view="list" />
  }

  if (tab === 'works') {
    return <WorksSnippet uri={uri} view="list" />
  }

  if (tab === 'collections') {
    return <SetSnippet uri={uri} view="list" />
  }

  if (tab === 'my-collections') {
    return <MyCollectionSnippet uri={uri} view="list" />
  }

  if (tab === 'people') {
    return <PersonSnippet uri={uri} view="list" />
  }

  if (tab === 'places') {
    return <PlaceSnippet uri={uri} />
  }

  if (tab === 'concepts') {
    return <ConceptSnippet uri={uri} />
  }

  if (tab === 'events') {
    return <EventSnippet uri={uri} />
  }

  return null
}

export default ResultSnippet
