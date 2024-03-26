import React from 'react'
import _ from 'lodash'

import { IHalLinks } from '../../types/IHalLinks'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'

import ObjectsContainer from './ObjectsContainer'
import Tab from './Tab'
import Tabs from './Tabs'

interface IRelated {
  links: Record<string, { href: string; _estimate: number }>
  relationships: IHalLinks
  type: string
}

const tabsChildren = (
  links: Record<string, { href: string; _estimate: number }>,
  relationships: IHalLinks,
): Array<JSX.Element> =>
  Object.keys(relationships)
    .map((key) => {
      const tabSection = relationships[key]
      const currentSearchTag = tabSection.searchTag

      // If the configured search tag exists in the returned HAL links, check for estimates
      if (!_.isNil(links) && Object.keys(links).includes(currentSearchTag)) {
        if (links[currentSearchTag]._estimate > 0) {
          // Return a tab with content if the related search returns data
          return (
            <Tab key={tabSection.title} title={tabSection.title as string}>
              <StyledEntityPageSection style={{ paddingTop: 0 }}>
                <ObjectsContainer
                  uri={links[currentSearchTag].href}
                  tab={tabSection.tab as string}
                  title={tabSection.title as string}
                />
              </StyledEntityPageSection>
            </Tab>
          )
        }
      }
      return null
    })
    .filter((entry) => entry !== null) as Array<JSX.Element>

const RelatedObjectsAndWorks: React.FC<IRelated> = ({
  links,
  relationships,
  type,
}) => {
  const tabs = tabsChildren(links, relationships)
  if (tabs.length !== 0) {
    return <Tabs>{tabs}</Tabs>
  }

  return (
    <StyledEntityPageSection>
      <p className="mb-0 fs-3 p-2" data-testid="no-related-objects-works">
        {`Yale University does not have any objects or works directly related to this ${type}.`}
      </p>
    </StyledEntityPageSection>
  )
}

export default RelatedObjectsAndWorks
