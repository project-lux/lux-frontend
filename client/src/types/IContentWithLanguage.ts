export interface INoteContent {
  content: string
  language?: string
  _content_html?: string
  equivalent?: Array<string>
  notation?: string
  classifications?: Array<string>
  languages?: Array<string>
  label?: string
  labelLanguages?: Array<string>
}

export interface IContentWithLanguage {
  [key: string]: Array<INoteContent>
}
