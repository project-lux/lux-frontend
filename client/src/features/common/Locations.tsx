import React from 'react'

import { useGetRelatedListsQuery } from '../../redux/api/ml_api'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import SemanticRelatedList from '../relatedLists/RelatedList'

interface ILocationsProps {
  halLink: {
    href: string
    _estimate: number | null
  }
}

// TODO: add visualization code back when ready
const Locations: React.FC<ILocationsProps> = ({ halLink }) => {
  const { href } = halLink
  // const [view, setView] = useState('List')

  const { data, isSuccess, isLoading } = useGetRelatedListsQuery({
    url: href,
  })

  if (isLoading) {
    return (
      <StyledEntityPageSection>
        <p>Loading...</p>
      </StyledEntityPageSection>
    )
  }

  if (isSuccess && data) {
    return (
      <StyledEntityPageSection>
        <div className="row">
          <div className="col-12">
            <h2>Related Locations</h2>
          </div>
          {/* <div className="col-2 d-flex justify-content-end">
            <ToggleButton
              className="btn"
              type="button"
              onClick={() => {
                const newView = view === 'List' ? 'Graph' : 'List'
                pushClientEvent('Related Locations', `${newView} View`)
                setView(newView)
              }}
            >
              {view === 'List' ? (
                <ToggleImg
                  src={location}
                  alt="Show map view"
                  aria-label="Show map view"
                />
              ) : (
                <ToggleImg
                  src={list}
                  alt="Show list view"
                  aria-label="Show list view"
                />
              )}
            </ToggleButton>
          </div> */}
        </div>
        <React.Fragment>
          {/* {view === 'List' ? ( */}
          <div className="row">
            <div className="col-12">
              {data !== null && (
                <SemanticRelatedList
                  activeAccordion={false}
                  results={data}
                  halLink={href}
                  next={undefined}
                  title="Related Locations"
                />
              )}
            </div>
          </div>
          {/* ) : (
            <div className="row">
              <div className="col-12">
                <p>Map view is still in progress.</p>
              </div>
            </div>
          )} */}
        </React.Fragment>
      </StyledEntityPageSection>
    )
  }

  return null
}

export default Locations
