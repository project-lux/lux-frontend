import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import config from '../../config/config'
import EntityParser from '../../lib/parse/data/EntityParser'
import {
  useGetConceptHierarchyQuery,
  useGetPlaceHierarchyQuery,
  useGetSetHierarchyQuery,
} from '../../redux/api/ml_api'
import IEntity from '../../types/data/IEntity'
import StyledExploreHierarchy from '../../styles/features/common/ExploreHierarchy'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface IProps {
  entity: IEntity
  expandType?: string
}

const LOWER_ITEM_LIMIT = 5

const queries: { [key: string]: typeof useGetConceptHierarchyQuery } = {
  concept: useGetConceptHierarchyQuery,
  place: useGetPlaceHierarchyQuery,
  set: useGetSetHierarchyQuery,
}

const getSearchType = (docType: string): string => {
  switch (docType) {
    case 'Currency':
    case 'Language':
    case 'Material':
    case 'MeasurementUnit':
    case 'Type':
      return 'concept'
    case 'Place':
      return 'place'
    case 'Set':
      return 'set'
  }
  throw new Error(`invalid type ${docType}`)
}

/**
 * Returns the hierarchy list view for the current entity
 * @param {IEntity} entity data for the current entity
 * @param {string} expandType optional; value used to render the expand button (currently not implemented)
 * @returns {JSX.Element}
 */
const ExploreHierarchy: React.FC<IProps> = ({ entity, expandType }) => {
  const { pathname } = useLocation()
  const [currentItem, setCurrentItem] = useState(entity)
  const [maxParents, setMaxParents] = useState(LOWER_ITEM_LIMIT)
  const [maxChildren, setMaxChildren] = useState(LOWER_ITEM_LIMIT)
  const searchType = getSearchType(currentItem.type || '')
  const result = queries[searchType]({ id: currentItem.id || '' })

  let backElem: React.ReactElement = <React.Fragment />
  let currentElem: React.ReactElement = <React.Fragment />
  let parentElems: React.ReactElement[] = []
  let childElems: React.ReactElement[] = []

  let entityMap: { [key: string]: IEntity } = {}

  useEffect(() => {
    setCurrentItem(entity)
    setMaxParents(LOWER_ITEM_LIMIT)
    setMaxChildren(LOWER_ITEM_LIMIT)
  }, [entity])

  const getSubList = (entities: IEntity[], max: number): React.ReactElement[] =>
    entities.slice(0, max).map((item: IEntity): React.ReactElement => {
      const parser = new EntityParser(item)
      const name = parser.getPrimaryName(config.dc.langen) || '<name unknown>'
      // const type = parser.getType()
      const path = item.id
        ? item.id.replace(/https?:\/\/[^/]*\/data/, '/view')
        : ''

      entityMap[item.id || ''] = item

      return (
        <li key={item.id}>
          {name}&nbsp;&nbsp;
          {/* {
            // If expandType is provided, make sure it is the same as type.
            // If not, just show the expand button.
            expandType && expandType !== type ? null : (
              <React.Fragment>
                <button
                  type="button"
                  onClick={onExpand}
                  data-id={item.id}
                  aria-label={`Expand hierarchy for ${name}`}
                >
                  [Expand]
                </button>
                &nbsp;
              </React.Fragment>
            )
          } */}
          <Link
            to={path}
            aria-label={`View ${name}`}
            onClick={() =>
              pushSiteImproveEvent('Entity Link', 'Selected', 'Hierarchy Link')
            }
            state={{
              prevPath: pathname,
              targetName: name,
            }}
          >
            [View]
          </Link>
        </li>
      )
    })

  // const onExpand = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //   const key = e.currentTarget.dataset.id || ''

  //   if (entityMap[key]) {
  //     setCurrentItem(entityMap[key])
  //   }

  //   setMaxParents(LOWER_ITEM_LIMIT)
  //   setMaxChildren(LOWER_ITEM_LIMIT)
  // }

  const onAllParents = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setMaxParents(Number.MAX_SAFE_INTEGER)
  }

  const onLessParents = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setMaxParents(LOWER_ITEM_LIMIT)
  }

  const onAllChildren = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setMaxChildren(Number.MAX_SAFE_INTEGER)
  }

  const onLessChildren = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setMaxChildren(LOWER_ITEM_LIMIT)
  }

  const onBack = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setCurrentItem(entity)
  }

  if (result.isSuccess && result.data) {
    const original = entity
    const { current } = result.data
    const currentName =
      new EntityParser(current).getPrimaryName(config.dc.langen) ||
      '<name unknown>'
    const currentId = current.id ?? ''

    const path = currentId.replace(/https?:\/\/[^/]*\/data/, '/view')
    let originalName = currentName

    if (currentId !== original.id) {
      originalName =
        new EntityParser(original).getPrimaryName(config.dc.langen) ||
        '<name unknown>'
    }

    currentElem = (
      <div>
        <strong>{currentName}</strong>&nbsp;
        {currentId !== original.id && (
          <Link
            to={path}
            onClick={() =>
              pushSiteImproveEvent('Entity Link', 'Selected', 'Hierarchy Link')
            }
            state={{
              prevPath: pathname,
              targetName: currentName,
            }}
          >
            [View]
          </Link>
        )}
      </div>
    )

    entityMap = {}
    entityMap[currentId] = current

    parentElems = getSubList(result.data.parents, maxParents)
    childElems = getSubList(result.data.children, maxChildren)

    backElem = (
      <div>
        <button
          type="button"
          onClick={onBack}
          aria-label={`Reset hierarchy to ${originalName}`}
        >
          Back to {originalName}
        </button>
      </div>
    )
  }

  return (
    <StyledExploreHierarchy>
      <h2>Explore</h2>
      {(result.isFetching || result.isLoading) && <span>Loading...</span>}
      {!result.isFetching && result.isSuccess && result.data && (
        <React.Fragment>
          {currentElem}
          <ul>
            <li>
              Parents
              <ul>{parentElems}</ul>
              <div className="moreless">
                {parentElems.length > LOWER_ITEM_LIMIT && (
                  <button data-fn="less" type="button" onClick={onLessParents}>
                    [Show less]
                  </button>
                )}
                {parentElems.length < result.data.parents.length && (
                  <button data-fn="more" type="button" onClick={onAllParents}>
                    [Show all]
                  </button>
                )}
              </div>
            </li>
            <li>
              Children
              <ul>{childElems}</ul>
              <div className="moreless">
                {childElems.length > LOWER_ITEM_LIMIT && (
                  <button type="button" onClick={onLessChildren}>
                    [Show less]
                  </button>
                )}
                {childElems.length < result.data.children.length && (
                  <button type="button" onClick={onAllChildren}>
                    [Show all]
                  </button>
                )}
              </div>
            </li>
          </ul>
          {currentItem.id !== entity.id && backElem}
        </React.Fragment>
      )}
    </StyledExploreHierarchy>
  )
}

export default ExploreHierarchy
