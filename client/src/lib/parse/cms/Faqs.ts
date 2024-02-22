import { FaqGroupKey, faqGroupKeys, faqGroupLabels } from '../../../config/cms'

export interface IFaq {
  title: string
  body: string
  group: FaqGroupKey
  sortWeight: number
}

export interface IFaqGroup {
  key: FaqGroupKey
  title: string
  faqs: IFaq[]
}

export type FaqGroupMap = { [key in FaqGroupKey]?: IFaq[] }

const sortFaqs = (faqs: IFaq[]): IFaq[] =>
  faqs.sort((a, b) => a.sortWeight - b.sortWeight)

// Temporary data store for FaqParser
export class Faqs {
  store: FaqGroupMap

  constructor() {
    this.store = {}

    for (let i = 0; i < faqGroupKeys.length; i += 1) {
      this.store[faqGroupKeys[i]] = []
    }
  }

  // Return currently stored FAQs as a list of IFaqGroups
  getFaqGroups(): IFaqGroup[] {
    return faqGroupKeys
      .map((groupKey) => {
        const faqs = sortFaqs(this.store[groupKey] || [])

        return {
          key: groupKey,
          title: faqGroupLabels[groupKey],
          faqs,
        }
      })
      .filter((group) => group.faqs.length > 0)
  }

  addToGroup(groupKey: FaqGroupKey, faq: IFaq): void {
    this.store[groupKey]?.push(faq)
  }
}
