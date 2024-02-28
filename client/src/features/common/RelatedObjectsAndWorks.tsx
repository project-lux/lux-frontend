import React from 'react'
import _ from 'lodash'
import { useParams } from 'react-router-dom'

import { IHalLinks } from '../../types/IHalLinks'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'

import ObjectsContainer from './ObjectsContainer'
import Tab from './Tab'
import Tabs from './Tabs'

interface IRelated {
  links: Record<string, { href: string; _estimate: number }>
  relationships: IHalLinks
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
              <ObjectsContainer
                uri={links[currentSearchTag].href}
                tab={tabSection.tab as string}
              />
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
}) => {
  const { type } = useParams<{ type: string }>()

  const tabs = tabsChildren(links, relationships)
  if (tabs.length !== 0) {
    return <Tabs>{tabs}</Tabs>
  }

  return (
    <StyledEntityPageSection>
      <p className="mb-0 fs-3 p-2">
        {`Yale University does not have any objects or works directly related to this ${
          type === 'activity' || type === 'period' ? 'event' : type
        }.`}
      </p>
    </StyledEntityPageSection>
  )
}

export default RelatedObjectsAndWorks
