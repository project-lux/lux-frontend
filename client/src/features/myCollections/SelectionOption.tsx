import React, { useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import theme from '../../styles/theme'
import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'

interface IStyledDivProps {
  selected: boolean
}

const StyledDiv = styled.div<IStyledDivProps>`
  color: ${theme.color.trueBlack};
  background-color: ${(props) =>
    props.selected ? theme.color.lightBabyBlue : 'none'};

  &:hover {
    background-color: ${theme.color.lightBabyBlue};
  }
`

const SelectionOption: React.FC<{
  record: string
  selectedRecords: Array<{ uuid: string; isDefaultCollection: boolean }>
  handleSelection: (
    x: Array<{ uuid: string; isDefaultCollection: boolean }>,
  ) => void
}> = ({ record, selectedRecords, handleSelection }) => {
  const [isSelected, setIsSelected] = useState<boolean>(true)
  const { data, isSuccess, isError } = useGetItemQuery({
    uri: stripYaleIdPrefix(record),
  })

  let primaryName: string = isError ? record : 'Loading...'
  let classifiedAsDefaultCollection: boolean = false
  if (isSuccess && data) {
    const entity = new EntityParser(data)
    primaryName = entity.getPrimaryName(config.aat.langen)
    classifiedAsDefaultCollection = primaryName === 'Default Collection'
    if (classifiedAsDefaultCollection) {
      const target = selectedRecords.find(
        (selected) => selected.uuid === record,
      )
      const source = {
        uuid: record,
        isDefaultCollection: true,
      }
      Object.assign(target, source)
      handleSelection(selectedRecords)
    }
    // TODO: add back in once AAT has been updated
    // classifiedAsDefaultCollection = entity.isClassifiedAs(
    //   config.aat.defaultCollection,
    // )
  }

  const handleSelectionOfCheckbox = (): void => {
    setIsSelected(!isSelected)
    if (isSelected) {
      handleSelection(
        _.remove(selectedRecords, function (entity) {
          return entity.uuid !== record
        }),
      )
    } else {
      handleSelection([
        ...selectedRecords,
        { uuid: record, isDefaultCollection: classifiedAsDefaultCollection },
      ])
    }
  }

  return (
    <StyledDiv
      className="py-1 px-2"
      data-testid="record-selection-div"
      selected={!classifiedAsDefaultCollection && isSelected}
    >
      <input
        disabled={classifiedAsDefaultCollection}
        className="checkbox d-inline mt-0 selectIndividualCheckbox"
        type="checkbox"
        id={record}
        onChange={() => handleSelectionOfCheckbox()}
        checked={!classifiedAsDefaultCollection && isSelected}
      />
      <label className="form-check-label ms-2" htmlFor={record}>
        {primaryName}{' '}
        {classifiedAsDefaultCollection
          ? '(Default collections cannot be deleted)'
          : ''}
      </label>
    </StyledDiv>
  )
}

export default SelectionOption
