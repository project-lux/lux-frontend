/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'

import { IImages } from '../../types/IImages'
import StyledImageThumbnail from '../../styles/features/common/ImageThumbnail'
import theme from '../../styles/theme'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface IProps {
  imageInfo: IImages
  linkUrl?: string
}

const popperConfig = {
  modifiers: [
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['bottom', 'top', 'left'],
      },
    },
  ],
}

const ImageThumbnail: React.FC<IProps> = ({ imageInfo, linkUrl }) => {
  const [show, setShow] = useState(false)
  const attribRef = useRef(null)

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    setShow(!show)
  }

  return (
    <StyledImageThumbnail data-testid="image-thumbnail-container">
      {linkUrl !== undefined ? (
        <Link
          to={`/view/${stripYaleIdPrefix(linkUrl)}`}
          onClick={() =>
            pushSiteImproveEvent(
              'Entity Link',
              'Selected',
              'Results Snippet Link',
            )
          }
          data-testid="image-link"
        >
          <img
            key={imageInfo.imageUrls[0]}
            className="img-thumbnail"
            src={imageInfo.imageUrls[0]}
            alt=""
          />
        </Link>
      ) : (
        <img
          key={imageInfo.imageUrls[0]}
          className="img-thumbnail"
          src={imageInfo.imageUrls[0]}
          alt=""
          data-testid="img-thumbnail"
        />
      )}
      {imageInfo.attribution && (
        <React.Fragment>
          <Button
            ref={attribRef}
            onClick={onClick}
            onMouseEnter={() => setShow(true)}
            data-testid="image-attribution-overlay-button"
          >
            {!show && <i className="bi bi-question-circle open" />}
            {show && <i className="bi bi-x-circle close" />}
          </Button>
          <Overlay
            target={attribRef.current}
            flip
            show={show}
            placement="right"
            popperConfig={popperConfig}
            data-testid="image-attribution-overlay"
          >
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                onMouseLeave={() => setShow(false)}
                {...props}
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(220, 220, 220, 0.9)',
                  maxWidth: '50%',
                  padding: '2px 10px',
                  color: theme.color.black,
                  borderRadius: 3,
                  wordBreak: 'break-all',
                  // eslint-disable-next-line react/prop-types
                  ...props.style,
                }}
                /* eslint-disable-next-line react/no-danger */
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(imageInfo.attribution, {
                    transformTags: {
                      a: sanitizeHtml.simpleTransform('a', {
                        target: '_blank',
                      }),
                    },
                  }),
                }}
              />
            )}
          </Overlay>
        </React.Fragment>
      )}
    </StyledImageThumbnail>
  )
}

export default ImageThumbnail
