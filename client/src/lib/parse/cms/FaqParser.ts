import { FaqGroupKey, faqGroupKeyFromString } from '../../../config/cms'
import { IFaqsResponse } from '../../../redux/api/cmsApi'

import { Faqs, IFaqGroup } from './Faqs'

const faqGroupKeysFromAttribute = (attr: string | string[]): FaqGroupKey[] => {
  let values = attr

  if (typeof values === 'string') {
    values = [values]
  }

  return values.map((value) => faqGroupKeyFromString(value))
}

export class FaqParser {
  json: IFaqsResponse

  constructor(json: IFaqsResponse) {
    this.json = json
  }

  // Get FAQs that matches the FAQ groups represented by groupKeys
  // in the form of IFaqGroup list.
  getFaqs(groupKeys: FaqGroupKey[]): IFaqGroup[] {
    const faqs = new Faqs()
    const faqData = this.json.data

    for (const faqItem of faqData) {
      const attr = faqItem.attributes
      const faqGroupKeys = faqGroupKeysFromAttribute(attr.field_faq_tag)

      for (const faqGroupKey of faqGroupKeys) {
        if (groupKeys.includes(faqGroupKey)) {
          faqs.addToGroup(faqGroupKey, {
            title: attr.title,
            body: attr.body,
            group: faqGroupKey,
            sortWeight: attr.field_sort_weight,
          })
        }
      }
    }
    return faqs.getFaqGroups()
  }
}
