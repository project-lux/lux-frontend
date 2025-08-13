import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'

import { useGetItemQuery } from '../../redux/api/ml_api'
import PageLoading from '../common/PageLoading'
import ErrorPage from '../error/ErrorPage'
import WorksPage from '../works/WorksPage'
import SetsPage from '../set/SetsPage'
import PersonAndGroupPage from '../personAndGroup/PersonAndGroupPage'
import { searchTypes } from '../../config/searchTypes'
import ConceptPage from '../concept/ConceptPage'
import EventPage from '../event/EventPage'
import PlacePage from '../place/PlacePage'
import ObjectsPage from '../objects/ObjectsPage'
import useAuthentication from '../../lib/hooks/useAuthentication'
import IEntity from '../../types/data/IEntity'
import MyCollectionsAlert from '../myCollections/Alert'
import { IRouteState } from '../../types/myCollections/IRouteState'

const getEntityPage = (data: IEntity): any => {
  if (data.type === 'HumanMadeObject' || data.type === 'DigitalObject') {
    return <ObjectsPage data={data} />
  }

  if (data.type === 'LinguisticObject' || data.type === 'VisualItem') {
    return <WorksPage data={data} />
  }

  if (data.type === 'Set') {
    return <SetsPage data={data} />
  }

  if (data.type === 'Person' || data.type === 'Group') {
    return <PersonAndGroupPage data={data} />
  }

  if (data.type === 'Place') {
    return <PlacePage data={data} />
  }

  if (searchTypes.concepts.includes(data.type)) {
    return <ConceptPage data={data} />
  }

  if (searchTypes.events.includes(data.type)) {
    return <EventPage data={data} />
  }
}

const RoutingComponent: React.FC = () => {
  const auth = useAuthentication()
  const forceRefetch = auth.isAuthenticated
  const { pathname, state } = useLocation()
  const { isSuccess, isLoading, isError, data, error } = useGetItemQuery(
    {
      uri: pathname.replace('/view/', ''),
    },
    {
      skip: auth.isLoading === true,
      forceRefetch,
    },
  )

  const [alert, setAlert] = useState<IRouteState>({
    showAlert: false,
    alertMessage: '',
    alertVariant: 'primary',
  })

  useEffect(() => {
    if (state && state.hasOwnProperty('showAlert')) {
      setAlert(state as IRouteState)
    }
  }, [state])

  if (isSuccess && data) {
    return (
      <React.Fragment>
        {alert.showAlert && (
          <MyCollectionsAlert
            variant={alert.alertVariant as string}
            message={alert.alertMessage as string}
            handleOnClose={setAlert}
          />
        )}
        {getEntityPage(data)}
      </React.Fragment>
    )
  }

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    return <ErrorPage code={_.get(error, 'status')} />
  }
  return null
}

export default RoutingComponent
