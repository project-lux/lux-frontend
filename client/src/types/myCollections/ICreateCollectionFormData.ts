export interface ICreateCollectionFormData {
  name: string
  classifications: Array<string>
  languages: Array<string>
  defaultCollection: boolean
  records?: Array<string>
}
