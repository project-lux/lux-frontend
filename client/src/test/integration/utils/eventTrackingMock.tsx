import * as trackingEvent from '../../../lib/pushClientEvent'

export default function eventTrackingMock(): void {
  // Mock Site Improve
  jest.spyOn(trackingEvent, 'pushClientEvent').mockImplementation(() => null)
  jest
    .spyOn(trackingEvent, 'pushClientPageEvent')
    .mockImplementation(() => null)
}
