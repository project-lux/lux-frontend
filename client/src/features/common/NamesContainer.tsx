import React from 'react'

import StyledHr from '../../styles/shared/Hr'
import StyledDataRow from '../../styles/shared/DataRow'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../types/IContentWithLanguage'
import { getColumnWidth } from '../../lib/util/ui'
import { transformStringForTestId } from '../../lib/parse/data/helper'

import TextLabel from './TextLabel'
import TextValue from './TextValue'
import ExpandableList from './ExpandableList'
import Name from './Name'

interface INames {
  names: IContentWithLanguage
  showBreakline?: boolean
  expandColumns?: boolean
  length?: number
}

const NamesContainer: React.FC<INames> = ({
  names,
  showBreakline,
  expandColumns = false,
  length,
}) => {
  const [textValueWidth, textLabelWidth] = getColumnWidth(expandColumns)

  const name = (namesData: Array<INoteContent>): JSX.Element[] =>
    namesData.map((nameData, ind) => {
      const { content, language } = nameData
      const languageSuperscriptId =
        transformStringForTestId(content).toLowerCase()

      return (
        <Name
          key={`${content}-${ind}`}
          content={content}
          language={language}
          languageId={languageSuperscriptId}
        />
      )
    })

  return (
    <React.Fragment>
      {Object.keys(names).map((nameLabel) => {
        if (names[nameLabel].length === 0) {
          return null
        }

        return (
          <StyledDataRow
            className="row"
            key={nameLabel}
            data-testid="names-container"
          >
            <TextLabel
              className={textLabelWidth}
              label={nameLabel === '' ? 'Additional Names' : nameLabel}
            />
            <ExpandableList className={textValueWidth} length={length}>
              <TextValue
                values={name(names[nameLabel])}
                itemSpacing={showBreakline ? 'double' : 'single'}
                className={textValueWidth}
              />
            </ExpandableList>
            {showBreakline && <StyledHr />}
          </StyledDataRow>
        )
      })}
    </React.Fragment>
  )
}

export default NamesContainer
