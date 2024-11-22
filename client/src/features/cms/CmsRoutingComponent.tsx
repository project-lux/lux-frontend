import React from 'react'
import { useParams } from 'react-router-dom'

import {
  aboutPageRouteToKey,
  contentPageRouteToKey,
  faqPageRouteToKey,
} from '../../config/cms'
import ErrorPage from '../error/ErrorPage'

import AboutPage from './AboutPage'
import ContentPage from './ContentPage'
import FaqPage from './FaqPage'

const CmsRoutingComponent: React.FC = () => {
  const { pageKey } = useParams<{ pageKey: string }>()

  const key = pageKey as string
  if (aboutPageRouteToKey.hasOwnProperty(key)) {
    return <AboutPage pageKey={aboutPageRouteToKey[key]} />
  }

  if (contentPageRouteToKey.hasOwnProperty(key)) {
    return <ContentPage pageKey={contentPageRouteToKey[key]} />
  }

  if (faqPageRouteToKey.hasOwnProperty(key)) {
    return <FaqPage groupKeys={faqPageRouteToKey[key]} />
  }

  return <ErrorPage code={404} />
}

export default CmsRoutingComponent
