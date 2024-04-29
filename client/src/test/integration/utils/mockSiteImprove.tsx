import * as siteImprove from '../../../lib/siteImprove'

export default function siteImproveMock(): void {
  // Mock Site Improve
  jest.spyOn(siteImprove, 'pushSiteImproveEvent').mockImplementation(() => null)
  jest
    .spyOn(siteImprove, 'pushSiteImprovePageEvent')
    .mockImplementation(() => null)
}
