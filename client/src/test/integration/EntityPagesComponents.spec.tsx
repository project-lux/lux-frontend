import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import config from '../../config/config'
// import { getTimelines } from '../../lib/util/fetchTimeline'
import { timelineResults as mockTimeline } from '../data/timelineResults'
import * as eventTracking from '../../lib/pushClientEvent'
import { relatedObjectsAndWorks } from '../../config/personAndGroupSearchTags'

import AppRender from './utils/AppRender'
import entityMockApi from './utils/entityMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'

// Mock the request for timelines
vi.mock('../../lib/util/fetchTimeline', () => ({
  __esModule: true,
  getTimelines: vi.fn(() => ({
    data: mockTimeline,
  })),
}))

describe('Entity pages relationship components', () => {
  const page = '/view/person/mock-person'

  beforeEach(async () => {
    entityMockApi()
    sharedMock()
    eventTrackingMock()
  })

  describe('Related Objects and Works', () => {
    beforeEach(() => {
      vi.spyOn(eventTracking, 'pushClientEvent').mockImplementation(() => null)
    })

    it('renders the related objects tab', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(relatedObjectsAndWorks.objectsCreated.title as string)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the objects snippet', async () => {
      const { findByTestId } = render(<AppRender route={page} />)

      await findByTestId('object-snippet-list-view')
      const snippet = screen.getByTestId('object-snippet-list-view')
      expect(snippet).toBeInTheDocument()
    })

    it('renders the related objects show all results button with correct href', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/objects-container-show-all-button/i)
      const link = screen.getByTestId('objects-container-show-all-button')
      expect(link).toHaveAttribute(
        'href',
        '/view/results/objects?q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%2C%7B%22encounteredBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%2C%7B%22productionInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%5D%7D%5D%7D&searchLink=true',
      )
    })

    it('renders the related works tab', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(relatedObjectsAndWorks.worksCreated.title as string)
      const worksTab = screen.getByTestId(
        'works-created,-published,-or-influenced-by-button',
      )
      expect(worksTab).toBeInTheDocument()
    })

    it('renders the related works snippet', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(relatedObjectsAndWorks.worksCreated.title as string)
      const worksTab = screen.getByTestId(
        'works-created,-published,-or-influenced-by-button',
      )
      fireEvent.click(worksTab)

      await findAllByText(/Mock Work/i)
      const snippet = screen.getByTestId('work-snippet-list-view')
      expect(snippet).toBeInTheDocument()
    })
  })

  describe('Timeline', () => {
    it('renders the timeline', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Timeline of Related/i)
      const timeline = screen.getByTestId('timeline-container')
      expect(timeline).toBeInTheDocument()
    })

    it('renders the year', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Timeline of Related/i)
      const year = screen.getByTestId('1983-label')
      expect(year).toHaveTextContent('1983')
    })

    it('renders the corresponding year total', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Timeline of Related/i)
      const total = screen.getByTestId('1983-total')
      expect(total).toHaveTextContent('Total: 27')
    })

    it('renders the corresponding relationship', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Timeline of Related/i)
      const relation = screen.getByTestId(
        '1983-itemProductionDate-relationship',
      )
      expect(relation).toHaveTextContent('Objects Produced')
    })

    it('renders the year search link', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Timeline of Related/i)
      const link = screen.getByTestId('1983-itemProductionDate-search-link')
      expect(link).toHaveTextContent('Show all 22 results')
    })

    it('renders the year search link with correct href', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Timeline of Related/i)
      const link = screen.getByTestId('1983-itemProductionDate-search-link')
      expect(link).toHaveAttribute(
        'href',
        `/view/results/objects?q={"AND":[{"producedBy":{"id":"${config.env.dataApiBaseUrl}data/person/mock-person-1"}},{"producedDate":"1983-12-31T00:00:00.000Z","_comp":"<="},{"producedDate":"1983-01-01T00:00:00.000Z","_comp":">="}]}&searchLink=true`,
      )
    })
  })

  describe('Related accordions', () => {
    it('renders the accordion container', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Concepts Influenced/i)
      const accordion = screen.getByTestId('accordion-container')
      expect(accordion).toBeInTheDocument()
    })
  })

  describe('Related Facets list when open', () => {
    beforeEach(() => {
      vi.spyOn(eventTracking, 'pushClientEvent').mockImplementation(() => null)
    })

    it('renders the faceted lists accordion container', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Object Types/i)
      const header = screen.getByTestId(
        'faceted-list-accordion-item-agentRelatedItemTypes',
      )
      expect(header).toBeInTheDocument()
    })

    it('renders the related facets list', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      // select the accordion
      await findAllByText(/Object Types/i)
      const accordionButton = screen.getByTestId(
        'faceted-list-accordion-item-agentRelatedItemTypes-button',
      )
      fireEvent.click(accordionButton)

      // Find the related facet name
      await findAllByText(/Mock Facet Concept/i)

      const list = screen.getByTestId(
        'related-facets-description-list-classification',
      )
      expect(list).toBeInTheDocument()
    })

    it('renders the related facet', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      // select the accordion
      await findAllByText(/Object Types/i)
      const accordionButton = screen.getByTestId(
        'faceted-list-accordion-item-agentRelatedItemTypes-button',
      )
      fireEvent.click(accordionButton)

      // Find the related facet name
      await findAllByText(/Mock Facet Concept/i)
      const facet = screen.getByText(/Mock Facet Concept/i)
      expect(facet).toBeInTheDocument()
    })

    it("renders the related facet's search link", async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      // select the accordion
      await findAllByText(/Object Types/i)
      const accordionButton = screen.getByTestId(
        'faceted-list-accordion-item-agentRelatedItemTypes-button',
      )
      fireEvent.click(accordionButton)

      // Find the related facet name
      await findAllByText(/Mock Facet Concept/i)

      // get the related facet search link
      const link = screen.getByTestId('list-item-link-0')
      expect(link).toHaveAttribute(
        'href',
        `/view/results/objects?q={"AND":[{"producedBy":{"id":"${config.env.dataApiBaseUrl}data/person/mock-person"}},{"classification":{"id":"${config.env.dataApiBaseUrl}data/concept/mock-facet-concept"}}]}&searchLink=true`,
      )
    })
  })

  describe('Related search results list when open', () => {
    beforeEach(() => {
      vi.spyOn(eventTracking, 'pushClientEvent').mockImplementation(() => null)
    })

    it('renders the search results accordion container', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Concepts Influenced/i)
      const header = screen.getByTestId(
        'search-results-accordion-item-agentInfluencedConcepts',
      )
      expect(header).toBeInTheDocument()
    })

    it('renders the list of results', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      // find the accordion
      await findAllByText(/Concepts Influenced/i)
      const accordionButton = screen.getByTestId(
        'search-accordion-item-agentInfluencedConcepts-button',
      )
      fireEvent.click(accordionButton)

      await findAllByText(/Mock Search Concept/i)
      const result = screen.getByTestId('query-relations-list-row-0')
      expect(result).toBeInTheDocument()
    })

    it('renders the show all results link with correct href', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      // find the accordion
      await findAllByText(/Concepts Influenced/i)
      const accordionButton = screen.getByTestId(
        'search-accordion-item-agentInfluencedConcepts-button',
      )
      fireEvent.click(accordionButton)

      await findAllByText(/Mock Search Concept/i)
      // find the search link
      const link = screen.getByTestId('search-related-list-link')
      expect(link).toHaveAttribute(
        'href',
        `/view/results/concepts?q=agentInfluencedConcepts&searchLink=true`,
      )
    })
  })

  describe('Semantic search results list when open', () => {
    beforeEach(() => {
      vi.spyOn(eventTracking, 'pushClientEvent').mockImplementation(() => null)
    })

    it('renders the semantic accordion item', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Related People and Groups/i)
      const accordion = screen.getByTestId(
        'related-list-accordion-item-agentRelatedAgents',
      )
      expect(accordion).toBeInTheDocument()
    })

    it('renders the related list related entity name', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Related People and Groups/i)
      // click the accordion
      const button = screen.getByTestId(
        'related-list-accordion-item-agentRelatedAgents-button',
      )
      fireEvent.click(button)

      await findAllByText(/Mock Semantic Group/i)
      const name = screen.getByTestId('related-list-entity-0')
      expect(name).toBeInTheDocument()
    })

    it('renders the show all works link with correct href', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Related People and Groups/i)
      // click the accordion
      const button = screen.getByTestId(
        'related-list-accordion-item-agentRelatedAgents-button',
      )
      fireEvent.click(button)

      await findAllByText(/Mock Semantic Group/i)
      const worksLink = screen.getByTestId('related-list-search-link-work-0')
      expect(worksLink).toHaveAttribute(
        'href',
        `/view/results/works?q={"AND":[{"OR":[{"AND":[{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/mock-person"}},{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/mock-person-2"}}]}]}]}&searchLink=true`,
      )
    })

    it('renders the show all objects link with correct href', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Related People and Groups/i)
      // click the accordion
      const button = screen.getByTestId(
        'related-list-accordion-item-agentRelatedAgents-button',
      )
      fireEvent.click(button)

      await findAllByText(/Mock Semantic Group/i)
      const objectsLink = screen.getByTestId('related-list-search-link-item-1')
      expect(objectsLink).toHaveAttribute(
        'href',
        `/view/results/objects?q={"AND":[{"OR":[{"AND":[{"producedBy":{"id":"${config.env.dataApiBaseUrl}data/person/mock-person"}},{"producedBy":{"id":"${config.env.dataApiBaseUrl}data/group/mock-group"}}]}]}]}&searchLink=true`,
      )
    })

    it('renders the related entity relationship label', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Related People and Groups/i)
      // click the accordion
      const button = screen.getByTestId(
        'related-list-accordion-item-agentRelatedAgents-button',
      )
      fireEvent.click(button)

      const label = screen.getByTestId('work-related-list-label-0')
      expect(label).toHaveTextContent(/Co-created works with/i)
    })

    it('renders the pagination previous and next buttons', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Related People and Groups/i)
      // click the accordion
      const button = screen.getByTestId(
        'related-list-accordion-item-agentRelatedAgents-button',
      )
      fireEvent.click(button)

      const pagination = screen.getByTestId('related-list-pagination')
      expect(pagination).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
