import React from 'react'
import _ from 'lodash'

import { IHalLinks } from '../../types/IHalLinks'

import ObjectsContainer from './ObjectsContainer'
import Tab from './Tab'
import Tabs from './Tabs'

interface IRelated {
  links: Record<string, { href: string; _estimate: number }>
  relationships: IHalLinks
}

const RelatedObjectsAndWorks: React.FC<IRelated> = ({
  links,
  relationships,
}) => (
  <Tabs>
    {Object.keys(relationships)
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
      .filter((entry) => entry !== null)}
  </Tabs>
)

export default RelatedObjectsAndWorks
