export interface IEventReference {
  type: string
  content: string
}

// carried_out_by, attributed_by, referred_to_by
export interface IEventAgent {
  role: string
  id: string
  references: IEventReference[]
}

export interface IEventInfo {
  agents: IEventAgent[]
  dates: string[] // timespan
  locations: string[] // took_place_at
  techniques: string[] // technique
  timePeriods: string[] // occurred_during
  references: IEventReference[] // referred_to_by
  influences: string[]
  label: string | null
}

export interface IEventPart {
  [key: string]: {
    date: Array<string>
    transfer: Array<string>
  }
}
