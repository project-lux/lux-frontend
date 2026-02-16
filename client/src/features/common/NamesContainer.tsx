import React, { useState, type JSX } from 'react'
import { useLocation } from 'react-router-dom'

import StyledHr from '../../styles/shared/Hr'
import StyledDataRow from '../../styles/shared/DataRow'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../types/IContentWithLanguage'
import { getColumnWidth } from '../../lib/util/ui'
import { transformStringForTestId } from '../../lib/parse/data/helper'
import { isObjectOrWork } from '../../lib/util/uri'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

import TextLabel from './TextLabel'
import TextValue from './TextValue'
import ExpandableList from './ExpandableList'
import Name from './Name'

interface INames {
  names: IContentWithLanguage
  showBreakline?: boolean
  expandColumns?: boolean
  length?: number
  showHeader?: boolean
}

const NamesContainer: React.FC<INames> = ({
  names,
  showBreakline,
  expandColumns = false,
  length,
  showHeader = false,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [textValueWidth, textLabelWidth] = getColumnWidth(expandColumns)

  const { pathname } = useLocation()

  useResizeableWindow(setIsMobile)

  const name = (namesData: Array<INoteContent>): JSX.Element[] =>
    namesData.map((nameData, ind) => {
      const { content, language, notation } = nameData
      const languageSuperscriptId =
        transformStringForTestId(content).toLowerCase()

      return (
        <Name
          key={`${content}-${ind}`}
          content={content}
          language={language}
          languageId={languageSuperscriptId}
          notation={notation}
        />
      )
    })

  return (
    <React.Fragment>
      {showHeader && <h3>Names</h3>}
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
            <StyledHr
              className="namesHr"
              hidden={!showBreakline || (isObjectOrWork(pathname) && isMobile)}
            />
          </StyledDataRow>
        )
      })}
    </React.Fragment>
  )
}

export default NamesContainer
