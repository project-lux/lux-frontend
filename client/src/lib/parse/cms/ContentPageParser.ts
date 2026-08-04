import { ICmsPage } from '../../../redux/api/returnTypes'

export class ContentPageParser {
  data: ICmsPage

  constructor(data: ICmsPage) {
    this.data = data
  }

  getTitle(): string {
    console.log('CMS DATA: ', this.data)
    console.log('')
    return this.data.data.attributes.title
  }

  getBody(): string {
    return this.data.data.attributes.body
  }
}

export default ContentPageParser
