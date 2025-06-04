import { UnitCode } from '../../config/cms'

/**
 * Returns a list of 4 "random" "distinct" unit codes, such that
 * the first element is used for picking a hero image
 * and the rest for picking featured collection contents.
 */
export const pickRandomUnits = (): UnitCode[] => {
  const candidates = [
    UnitCode.YCBA,
    UnitCode.YPM,
    UnitCode.YUAG,
    UnitCode.YUL,
    UnitCode.CMI,
  ]
  let index = Math.floor(Math.random() * candidates.length)
  let result: UnitCode[] = candidates.splice(index, 1)

  // Remove UnitCode.CMI from featured collections candidates
  const cmiIndex = candidates.indexOf(UnitCode.CMI)
  if (cmiIndex !== -1) {
    candidates.splice(cmiIndex, 1)
  }

  // UnitCode.ALL is relevant only for featured collections
  candidates.push(UnitCode.ALL)

  for (let i = 0; i < 3; i += 1) {
    index = Math.floor(Math.random() * candidates.length)
    result = [...result, ...candidates.splice(index, 1)]
  }

  return result
}
