/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import StyledAgents from '../../styles/features/common/Agents'
import {
  IEventAgent,
  IEventInfo,
  IEventReference,
} from '../../types/derived-data/events'
import { capitalizeLabels } from '../../lib/parse/data/helper'
import theme from '../../styles/theme'

import ApiText from './ApiText'
import LinkContainer from './LinkContainer'
import RecordLinksList from './RecordLinkList'
import ProductionLocation from './ProductionLocation'

interface IProps {
  event: IEventInfo
  showReferenceLabel: boolean
  id: string
  stackKeyValuePairs?: boolean
}

const { keyClass, valueClass } = theme.colWidths

const rightPanelKeyClass = 'col-12 col-sm-4 col-md-12 col-lg-12 col-xl-12'
const rightPanelValueClass = 'col-12 col-sm-8 col-md-12 col-lg-12 col-xl-12'

const AgentsRow: React.FC<{
  label: string
  uri: string
  id: string
  changeColumnWidths: boolean
}> = ({ label, uri, id, changeColumnWidths }) => {
  const agentLabel = ApiText(label)

  return (
    <StyledAgents className="row" key={uri}>
      <div className={changeColumnWidths ? rightPanelKeyClass : keyClass}>
        <dt>{agentLabel !== null && capitalizeLabels(agentLabel)}</dt>
      </div>
      <div className={changeColumnWidths ? rightPanelValueClass : valueClass}>
        <LinkContainer
          content={[uri]}
          id={`${id}-agent-link-container`}
          expandColumns
          rowClassName="mb-0 mt-0"
        />
      </div>
    </StyledAgents>
  )
}

// Create top level agent row
const agentRow = (
  agents: IEventAgent[],
  keyClassName: string,
  valueClassName: string,
  stackKeyValuePairs: boolean,
  componentId: string,
): JSX.Element[] => {
  const agentViews: JSX.Element[] = []

  for (const agent of agents) {
    const { role, id } = agent

    agentViews.push(
      <AgentsRow
        key={`${role}-${id}`}
        label={role}
        uri={id}
        id={componentId}
        changeColumnWidths={stackKeyValuePairs}
      />,
    )

    for (const ref of agent.references) {
      agentViews.push(
        <StyledAgents className="row" key={ref.content}>
          <div className={keyClassName}>
            <dt />
          </div>
          <div className={`${valueClassName} mb-2`}>
            <dd data-testid={`${componentId}-agent-reference-content`}>
              {ref.content}
            </dd>
          </div>
        </StyledAgents>,
      )
    }
  }
  return agentViews
}

const referenceRow = (
  refs: IEventReference[],
  showReferenceLabel: boolean,
): JSX.Element[] =>
  refs.map((ref) => {
    const { type, content } = ref

    const refLabel = showReferenceLabel ? ApiText(type) : null
    return (
      <div className="row" key={content}>
        <div className={keyClass}>
          <dt>{refLabel !== null && capitalizeLabels(refLabel)}</dt>
        </div>
        <div className={valueClass}>
          <dd>{content}</dd>
        </div>
      </div>
    )
  })

const ProductionEventBody: React.FC<IProps> = ({
  event,
  showReferenceLabel,
  id,
  stackKeyValuePairs = false,
}) => {
  const {
    agents,
    dates,
    locations,
    causes,
    references,
    techniques,
    timePeriods,
  } = event
  const keyClassName = stackKeyValuePairs ? rightPanelKeyClass : keyClass
  const valueClassName = stackKeyValuePairs ? rightPanelValueClass : valueClass

  return (
    <React.Fragment>
      {agentRow(agents, keyClassName, valueClassName, stackKeyValuePairs, id)}
      {dates.length > 0 && (
        <div className="row">
          <div className={keyClassName}>
            <dt>When</dt>
          </div>
          <div className={valueClassName}>
            <dd data-testid={`${id}-event-dates`}>{dates[0]}</dd>
          </div>
        </div>
      )}
      {locations.length > 0 && (
        <div className="row">
          <div className={keyClassName}>
            <dt>Where</dt>
          </div>
          <div className={valueClassName}>
            {locations.map((location, ind) => (
              <dd key={location} data-testid={`${id}-${ind}-event-location`}>
                <ProductionLocation location={location} />
              </dd>
            ))}
          </div>
        </div>
      )}
      {causes.length > 0 && (
        <div className="row">
          <div className={keyClassName}>
            <dt>Caused By</dt>
          </div>
          <div className={valueClassName}>
            <dd data-testid={`${id}-event-location`}>
              {RecordLinksList(causes)}
            </dd>
          </div>
        </div>
      )}
      {techniques.length > 0 && (
        <div className="row">
          <div className={keyClassName}>
            <dt>Technique</dt>
          </div>
          <div className={valueClassName}>
            <dd data-testid={`${id}-event-technique`}>
              {RecordLinksList(techniques)}
            </dd>
          </div>
        </div>
      )}
      {timePeriods.length > 0 && (
        <div className="row">
          <div className={keyClassName}>
            <dt>Time Period</dt>
          </div>
          <div className={valueClassName}>
            <dd data-testid={`${id}-event-time-period`}>
              {RecordLinksList(timePeriods)}
            </dd>
          </div>
        </div>
      )}
      {references.length > 0 && referenceRow(references, showReferenceLabel)}
    </React.Fragment>
  )
}

export default ProductionEventBody
