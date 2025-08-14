import IAgent from '../data/IAgent'

export interface ICreateCollectionFormData {
  name: string
  classifications: Array<string>
  languages: Array<string>
  records?: Array<string>
}
