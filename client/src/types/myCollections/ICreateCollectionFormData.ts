export interface ICreateCollectionFormData {
  name: string
  classification: string
  language: string
  defaultCollection: boolean
  records?: Array<string>
}
