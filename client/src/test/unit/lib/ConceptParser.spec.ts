import config from '../../../config/config'
import ConceptParser from '../../../lib/parse/data/ConceptParser'
import { concept as mockConcept } from '../../data/concept'

describe('ConceptParser', () => {
  describe('getBroaderId function', () => {
    it('returns broader ids', () => {
      const concept = new ConceptParser(mockConcept)
      const broader = concept.getBroaderId()
      expect(broader).toBe('https://endpoint.yale.edu/data/concept/broader-1')
    })
  })

  describe('getInfluencedBy function', () => {
    it('returns influenced ids', () => {
      const concept = new ConceptParser(mockConcept)
      const influenced = concept.getInfluencedBy()
      expect(influenced).toEqual([
        'https://endpoint.yale.edu/data/concept/influenced-by',
      ])
    })
  })

  describe('getDescriptions function', () => {
    it('returns array of string content', () => {
      const concept = new ConceptParser(mockConcept)
      const influenced = concept.getDescriptions(config.aat.langen)
      expect(influenced).toEqual(['Description statement in english.'])
    })
  })
})
