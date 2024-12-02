import { vi } from 'vitest'

import * as trackingEvent from '../../../lib/pushClientEvent'

export default function eventTrackingMock(): void {
  // Mock Site Improve
  vi.spyOn(trackingEvent, 'pushClientEvent').mockImplementation(() => null)
  vi.spyOn(trackingEvent, 'pushClientPageEvent').mockImplementation(() => null)
}
