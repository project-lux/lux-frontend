export interface INoteContent {
  content: string
  language?: string
  _content_html?: string
}

export interface IContentWithLanguage {
  [key: string]: Array<INoteContent>
}
