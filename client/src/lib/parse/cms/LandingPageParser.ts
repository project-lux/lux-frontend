export interface ILandingPage {
  type: string

  attributes: {
    field_what_is_lu: string
    field_more_about_lux: string
    field_footer_blocks: string[]
  }
}

export class LandingPageParser {
  content: ILandingPage

  constructor(content: ILandingPage) {
    this.content = content
  }

  getWhatIsLux(): string {
    return this.content.attributes.field_what_is_lu
  }

  getMoreAboutLux(): string {
    return this.content.attributes.field_more_about_lux
  }

  getFooterBlocks(): string[] {
    return this.content.attributes.field_footer_blocks
  }
}
