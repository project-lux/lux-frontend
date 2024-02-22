import config from '../../../../config/config'
import { getMemberOfUris } from '../../../../lib/util/collectionHelper'

describe('getMemberOfUris', () => {
  const mockMemberOf = {
    id: 'test',
    type: 'HumanMadeObject',
    member_of: [
      {
        id: `${config.env.dataApiBaseUrl}data/set/member-of-1`,
        type: 'Set',
        _label:
          'Modern and Contemporary Art Collection, Yale University Art Gallery',
      },
      {
        id: `${config.env.dataApiBaseUrl}data/set/member-of-2`,
        type: 'Set',
        _label:
          'Recent Acquisitions, Yale University Art Gallery, New Haven, Conn., 2022-02-25 to 2022-06-26',
      },
      {
        id: `${config.env.dataApiBaseUrl}data/set/member-of-3`,
        type: 'Set',
        _label:
          'Paintings and Sculpture Collection, Yale Center for British Art',
      },
    ],
  }
  describe('getMemberOfUris', () => {
    it('returns array of member_of uuids', () => {
      expect(getMemberOfUris(mockMemberOf)).toEqual([
        `${config.env.dataApiBaseUrl}data/set/member-of-1`,
        `${config.env.dataApiBaseUrl}data/set/member-of-2`,
        `${config.env.dataApiBaseUrl}data/set/member-of-3`,
      ])
    })
  })
})
