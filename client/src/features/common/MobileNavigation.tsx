import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components'

import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

import MobileTabButton from './MobileTabButton'

const StyledDiv = styled.div`
  box-shadow: 0px 0px 5px ${theme.color.black20};
  background-color: ${theme.color.white};
  color: ${theme.color.black};
  border-top-left-radius: ${theme.border.radius};
  border-top-right-radius: ${theme.border.radius};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`

const MobileNavigation: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
  selectedTab: number
  setSelectedTab: (index: number) => void
}> = ({ config, selectedTab, setSelectedTab }) => {
  const [show, setShow] = useState(false)

  const handleButtonClick = (i?: number): void => {
    if (i) {
      setSelectedTab(i)
    }
    setShow(!show)
  }

  const handleModalStateOnWindowResize = (isMobile: boolean): void => {
    if (!isMobile) {
      setShow(false)
    }
  }

  useResizeableWindow(handleModalStateOnWindowResize)

  return (
    <StyledDiv>
      <MobileTabButton
        title={config[selectedTab].props.title}
        handleOnClick={handleButtonClick}
        tab={config[selectedTab].props.children.props.tab}
        showArrow
        index={0}
        isActive={false}
        className="p-3"
      />
      <Modal show={show} animation={false} onHide={() => setShow(false)}>
        <Modal.Body>
          {config.map(
            (
              item: {
                props: {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  children: any
                  title: string
                }
              } | null,
              index: number,
            ) => {
              if (item !== null) {
                return (
                  <MobileTabButton
                    key={index}
                    tab={item.props.children.props.tab}
                    title={item.props.title}
                    index={index}
                    handleOnClick={handleButtonClick}
                    isActive={index === selectedTab}
                  />
                )
              }
              return null
            },
          )}
        </Modal.Body>
      </Modal>
    </StyledDiv>
  )
}

export default MobileNavigation
