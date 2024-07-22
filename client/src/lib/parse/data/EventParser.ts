/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import IEntity from '../../../types/data/IEntity'
import IEvent from '../../../types/data/IEvent'
import {
  IEventAgent,
  IEventInfo,
  IEventPart,
  IEventReference,
} from '../../../types/derived-data/events'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import {
  forceArray,
  getClassifiedAs,
  getDateContent,
  hasData,
  validateClassifiedAsIdMatches,
} from './helper'

const emptyProductionEventInfo = (): IEventInfo => ({
  agents: [],
  dates: [],
  locations: [],
  techniques: [],
  timePeriods: [],
  references: [],
  influences: [],
  label: null,
})

/**
 * Adds transformed agent data to the current array of agent data
 * @param {Array<IEventAgent>} agentMap the current array of transformed agent data that exist in the event
 * @param {IEventAgent | null} agent the transformed agent data to add to the map
 * @returns {void}
 */
const addAgent = (
  agentMap: Array<IEventAgent>,
  agent: IEventAgent | null,
): void => {
  if (agent === null) {
    return
  }
  agentMap.push(agent)
}

export default class EventParser extends EntityParser {
  event: IEvent

  unidentifiedAgentRole: string

  constructor(json: IEvent) {
    super(json as IEntity)
    this.event = json
    this.unidentifiedAgentRole = 'additional'
  }

  /**
   * Returns array of transformed event agent data from /carried_out_by
   * @returns {Array<IEventAgent>}
   */
  getCarriedOutBy(): Array<IEventAgent> {
    const carriedOutBy = forceArray(this.event.carried_out_by)
    const agents: IEventAgent[] = []

    for (const agent of carriedOutBy) {
      if (agent.id) {
        agents.push({
          role: this.unidentifiedAgentRole,
          id: agent.id,
          references: [],
        })
      }
    }

    // agents could be an empty array
    return agents
  }

  /**
   * Returns formatted dates from /timespan
   * @returns {Array<string>}
   */
  getDates(): Array<string> {
    return getDateContent(this.event.timespan)
  }

  /**
   * Returns data from /took_place_at
   * @returns {Array<string>}
   */
  getLocations(): Array<string> {
    const tookPlaceAt = forceArray(this.event.took_place_at)
    return getClassifiedAs(tookPlaceAt)
  }

  /**
   * Returns data from /part
   * @returns {Array<IEventPart>}
   */
  getPart(): Array<IEventPart> {
    const part = forceArray(this.event.part)
    return part.map((el) => {
      const date = getDateContent(el.timespan)
      const transferredTitleOf = getClassifiedAs(el.transferred_title_of)

      return {
        [el.type]: {
          date,
          transfer: transferredTitleOf,
        },
      }
    })
  }

  /**
   * Returns data used for rendering the web pages with their text to be rendered
   * @returns {Array<{ content: string; link: string }>}
   */
  getLinkToUnitSite(): Array<{ content: string; link: string }> {
    const subjectOf = forceArray(this.json.subject_of)
    const links = []

    for (const depicting of subjectOf) {
      const digitallyCarriedBy = forceArray(depicting.digitally_carried_by)

      for (const digital of digitallyCarriedBy) {
        let content = ''
        const accessPoint = forceArray(digital.access_point)
        const classifiedAs = digital.classified_as
        const identifiedBy = digital.identified_by
        if (identifiedBy !== undefined) {
          content = identifiedBy[0].content
        }

        if (classifiedAs !== undefined) {
          if (
            validateClassifiedAsIdMatches(classifiedAs, [config.aat.webPage])
          ) {
            for (const p of accessPoint) {
              links.push({ content, link: p.id })
            }
          }
        }
      }
    }

    return links.filter((siteLink) => siteLink.link !== '')
  }

  /**
   * Returns all of the data from the given event
   * @returns {IEventInfo}
   */
  getProductionEvent(): IEventInfo {
    const info = emptyProductionEventInfo()

    info.agents = this.getAgentMap()
    info.techniques = this.getTechniques()
    info.dates = this.getDates()
    info.locations = this.getLocations()
    info.timePeriods = this.getTimePeriods()
    info.references = this.getReferences()
    info.influences = this.getInfluences()
    info.label = this.getEventLabel()

    return info
  }

  /**
   * Returns array of transformed event agent data from all possible data points containing agent data
   * @returns {Array<IEventAgent>}
   */
  getAgentMap(): IEventAgent[] {
    const agents: IEventAgent[] = []

    const carriedOutByAgents = this.getCarriedOutBy()
    for (const carriedOutByAgent of carriedOutByAgents) {
      addAgent(agents, carriedOutByAgent)
    }

    const parts = forceArray(this.event.part)
    for (const part of parts) {
      const partAgents = this.getPartAgent(part, true)
      for (const agent of partAgents) {
        addAgent(agents, agent)
      }
    }

    const attributedBy = forceArray(this.event.attributed_by)
    for (const attributor of attributedBy) {
      addAgent(agents, this.getAttributors(attributor))
    }

    return agents
  }

  /**
   * Returns array of transformed event agent data
   * @param {IEvent} part the nested /part data from the event
   * @param {boolean} parseClassifiedAs boolean to determine if the /part/classified_as should be used as the role
   * @returns {Array<IEventAgent>}
   */
  getPartAgent(part: IEvent, parseClassifiedAs: boolean): Array<IEventAgent> {
    const parser = new EventParser(part)
    const references = parser.getReferences()
    const carriedOutBy = forceArray(part.carried_out_by)
    const influencedBy = forceArray(part.influenced_by)
    const classifiedAs = parseClassifiedAs
      ? getClassifiedAs(forceArray(part.classified_as))
      : []
    const agents = []

    let role = this.unidentifiedAgentRole

    if (classifiedAs.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      role = classifiedAs[0]
    }

    for (const ag of carriedOutBy) {
      if (ag.id) {
        agents.push({ role, id: ag.id, references })
      }
    }

    for (const ag of influencedBy) {
      if (ag.id) {
        agents.push({ role: 'Influenced By', id: ag.id, references })
      }
    }
    return agents
  }

  /**
   * Returns array of transformed event agent data from /attributed_by
   * @param {IEvent} attributedBy the nested /attributed_by data from the event
   * @returns {IEventAgent | null}
   */
  getAttributors(attributedBy: IEvent): IEventAgent | null {
    const parser = new EventParser(attributedBy)
    const references = parser.getReferences()
    const assigned = forceArray(attributedBy.assigned)
    const classifiedAs = getClassifiedAs(forceArray(attributedBy.classified_as))

    let role = ''
    let id = ''

    if (classifiedAs.length > 0) {
      role = classifiedAs[0] || this.unidentifiedAgentRole
    }

    if (assigned.length > 0) {
      // eslint-disable-next-line no-loop-func
      const carried = assigned.map((assign) => {
        const carriedOut = forceArray(assign.carried_out_by)
        const ids = carriedOut.map((carries) => carries.id)
        return ids.length > 0 ? ids[0] : ''
      })

      id = carried.length > 0 && carried[0]
    }

    return { role, id, references }
  }

  /**
   * Returns array of transformed event agent data from /carried_out_by
   * @returns {Array<IEventAgent>}
   */
  getAgentIds(): string | null {
    const agents = this.getAgentMap()

    if (agents.length > 0) {
      return agents[0].id
    }

    return null
  }

  /**
   * Returns array of uuids from /influenced_by
   * @returns {Array<string>}
   */
  getInfluences(): Array<string> {
    const influencedBy = forceArray(this.event.influenced_by)
    return influencedBy ? getClassifiedAs(influencedBy) : []
  }

  /**
   * Returns array of uuids from /technique
   * @returns {Array<string>}
   */
  getTechniques(): Array<string> {
    const technique = forceArray(this.event.technique)
    return technique ? getClassifiedAs(technique) : []
  }

  /**
   * Returns array of uuids from /occurred_during
   * @returns {Array<string>}
   */
  getTimePeriods(): Array<string> {
    const occurredDuring = forceArray(this.event.occurred_during)
    return occurredDuring ? getClassifiedAs(occurredDuring) : []
  }

  /**
   * Returns array of references from /referred_to_by
   * @returns {Array<IEventReference>}
   */
  getReferences(): Array<IEventReference> {
    const referredToBy = forceArray(this.event.referred_to_by)
    const refs: IEventReference[] = []

    for (const ref of referredToBy) {
      const classifiedAs = forceArray(ref.classified_as)
      const refTypeIds = getClassifiedAs(classifiedAs)
      const refTypeId = refTypeIds.length > 0 ? refTypeIds[0] : ''

      if (ref.content) {
        refs.push({
          type: refTypeId,
          content: ref.content,
        })
      }
    }
    return refs
  }

  /**
   * Returns uuid of label for the entire event
   * @returns {string | null}
   */
  getEventLabel(): string | null {
    const classifiedAs = forceArray(this.event.classified_as)
    return classifiedAs.length > 0 ? classifiedAs[0].id : null
  }

  /**
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    | null
    | string
    | Array<any>
    | IContentWithLanguage
    | Array<{ content: string; link: string }>
  > | null {
    let agents: Array<string> = []
    const carriedOutBy = this.getCarriedOutBy()
    if (carriedOutBy.length > 0) {
      agents = carriedOutBy.map((agent) => agent.id)
    }
    const data: Record<
      string,
      | null
      | string
      | Array<any>
      | IContentWithLanguage
      | Array<{ content: string; link: string }>
    > = {
      name: this.getPrimaryName(config.aat.langen),
      names: this.getNames(),
      entityClass: this.getEntityClass(),
      agents,
      dates: this.getDates(),
      types: this.getTypes(),
      locations: this.getLocations(),
      identifiers: this.getIdentifiers(),
      webPages: this.getLinkToUnitSite(),
      notes: this.getNotes(),
      part: this.getPart(),
    }

    return hasData(data)
  }
}
