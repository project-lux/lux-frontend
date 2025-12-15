import React, { useState, type JSX } from 'react'
import { useAuth } from 'react-oidc-context'
import _, { isUndefined } from 'lodash'

import { IHalLinks } from '../../types/IHalLinks'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { transformStringForTestId } from '../../lib/parse/data/helper'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { useGetUserResultsQuery } from '../../redux/api/ml_api'
import { ISearchResults } from '../../types/ISearchResults'
import { getOrderedItemsIds } from '../../lib/parse/search/searchResultParser'

import ObjectsContainer from './ObjectsContainer'
import Tabs from './Tabs'

interface IRelated {
  links: Record<string, { href: string; _estimate: number }> | undefined
  relationships: IHalLinks
  type: string
}

const tabsChildren = (
  links: Record<string, { href: string; _estimate: number }>,
  relationships: IHalLinks,
  isMobile: boolean,
  user?: ISearchResults,
): Array<JSX.Element> =>
  Object.keys(relationships)
    .map((key) => {
      const tabSection = relationships[key]
      const currentSearchTag = tabSection.searchTag

      // If the configured search tag exists in the returned HAL links, check for estimates
      if (!_.isNil(links) && Object.keys(links).includes(currentSearchTag)) {
        if (links[currentSearchTag]._estimate > 0) {
          // transform the title for accessibility uses
          const id = transformStringForTestId(
            tabSection.title as string,
          ).toLowerCase()

          // Return a tab with content if the related search returns data
          return (
            <StyledEntityPageSection
              key={tabSection.title}
              id={`panel-${id}`}
              role="tabpanel"
              tabIndex={0}
              style={{ paddingTop: 0 }}
              title={tabSection.title as string}
              aria-labelledby={`tab-${id}`}
              $borderTopLeftRadius={isMobile ? '0px' : undefined}
              $borderTopRightRadius={isMobile ? '0px' : undefined}
            >
              <ObjectsContainer
                uri={links[currentSearchTag].href}
                tab={tabSection.tab as string}
                title={tabSection.title as string}
                user={
                  getOrderedItemsIds(user).length > 0
                    ? getOrderedItemsIds(user)[0]
                    : undefined
                }
              />
            </StyledEntityPageSection>
          )
        }
      }
      return null
    })
    .filter((entry) => entry !== null) as Array<JSX.Element>

const RelatedObjectsWorksAndCollections: React.FC<IRelated> = ({
  links,
  relationships,
  type,
}) => {
  const auth = useAuth()
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )

  useResizeableWindow(setIsMobile)

  const username = auth.user?.profile['cognito:username']

  // get the current logged in user's record
  const { data } = useGetUserResultsQuery(
    {
      username,
    },
    { skip: !auth.isAuthenticated || !username },
  )

  if (!isUndefined(links)) {
    const tabs = tabsChildren(links, relationships, isMobile, data)
    if (tabs.length !== 0) {
      return <Tabs>{tabs}</Tabs>
    }
  }

  return (
    <StyledEntityPageSection>
      <p className="mb-0 fs-3 p-2" data-testid="no-related-objects-works">
        {`Yale University does not have any objects or works directly related to this ${type}.`}
      </p>
    </StyledEntityPageSection>
  )
}

export default RelatedObjectsWorksAndCollections
