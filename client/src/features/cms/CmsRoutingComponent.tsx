import React from 'react'
import { useParams } from 'react-router-dom'

import {
  aboutPageRouteToKey,
  termsOfUseRouteToKey,
  faqPageRouteToKey,
  openAccessPageRouteToKey,
} from '../../config/cms'
import ErrorPage from '../error/ErrorPage'
import { aboutPagesMap, openAccessRouteMap } from '../../config/routerPages'

import ContentPage from './ContentPage'
import FaqPage from './FaqPage'
import TermsOfUsePage from './TermsOfUsePage'

const CmsRoutingComponent: React.FC = () => {
  const { pageKey } = useParams<{ pageKey: string }>()

  const key = pageKey as string

  // About pages with sidebar menu
  if (aboutPageRouteToKey.hasOwnProperty(key)) {
    return (
      <ContentPage pageKey={aboutPageRouteToKey[key]} pages={aboutPagesMap} />
    )
  }

  // Open Access pages with sidebar menu
  if (openAccessPageRouteToKey.hasOwnProperty(key)) {
    return (
      <ContentPage
        pageKey={openAccessPageRouteToKey[key]}
        pages={openAccessRouteMap}
      />
    )
  }

  // Terms of Use page without sidebar menu
  if (termsOfUseRouteToKey.hasOwnProperty(key)) {
    return <TermsOfUsePage pageKey={termsOfUseRouteToKey[key]} />
  }

  if (faqPageRouteToKey.hasOwnProperty(key)) {
    return <FaqPage groupKeys={faqPageRouteToKey[key]} />
  }

  return <ErrorPage code={404} />
}

export default CmsRoutingComponent
