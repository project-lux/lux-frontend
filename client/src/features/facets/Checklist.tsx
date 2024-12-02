import React from 'react'

import { ICriteria, IOrderedItems } from '../../types/ISearchResults'
import { IFacetsPagination } from '../../types/IFacets'
import { useAppDispatch } from '../../app/hooks'
import { addLastSelectedFacet } from '../../redux/slices/facetsSlice'

import Checkbox from './Checkbox'

interface IFacets {
  criteria: ICriteria
  facetValues: IFacetsPagination
  facetSection: string
  facetQuery: ICriteria
  scope: string
  selectedFacets: Map<string, Set<string>> | null
  page: number
  lastPage: number
  setPage: (x: number) => void
  setFacets: (x: IFacetsPagination) => void
}

const Checklist: React.FC<IFacets> = ({
  criteria,
  facetValues,
  facetSection,
  facetQuery,
  scope,
  selectedFacets,
  page,
  lastPage,
  setPage,
  setFacets,
}) => {
  const dispatch = useAppDispatch()

  const handleShowMore = (): void => {
    setPage(page + 1)
    dispatch(addLastSelectedFacet({ facetName: facetSection, facetUri: '' }))
  }

  const handleShowLess = (): void => {
    const currentRequest = `call${page}`
    if (facetValues.requests[currentRequest]) {
      delete facetValues.requests[currentRequest]
    }
    setFacets(facetValues)
    setPage(page - 1)
  }

  const list = (): JSX.Element[] => {
    const facetListCombined: Array<IOrderedItems> = []

    Object.keys(facetValues.requests).map((key) => {
      facetValues.requests[key].map((facet) => {
        if (facet.value !== null) {
          facetListCombined.push(facet)
        }
        return null
      })
      return null
    })

    return facetListCombined.map((facet) => (
      <React.Fragment key={facet.value}>
        <Checkbox
          criteria={criteria}
          facet={facet}
          facetSection={facetSection}
          selectedFacets={selectedFacets}
          facetQuery={facetQuery}
          scope={scope}
        />
      </React.Fragment>
    ))
  }

  return (
    <React.Fragment>
      <form>
        {list()}
        {page !== lastPage && (
          <button
            type="button"
            className="btn btn-link show-more"
            onClick={() => handleShowMore()}
          >
            Show More
          </button>
        )}
        {page !== 1 && (
          <button
            type="button"
            className="btn btn-link show-less"
            onClick={() => handleShowLess()}
          >
            Show Less
          </button>
        )}
      </form>
    </React.Fragment>
  )
}

export default Checklist
