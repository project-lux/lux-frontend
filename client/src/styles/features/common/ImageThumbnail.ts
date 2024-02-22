import styled from 'styled-components'

import theme from '../../theme'

const ImageThumbnail = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;

  img {
    max-width: 100%;
    max-height: 100%;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    border: none;
    padding: 0;
  }

  button {
    position: absolute;
    background-color: transparent;
    border: none;
    left: 0;
    bottom: 0;
    height: 1.7rem;
    color: ${theme.color.black};
    box-shadow: none;
    z-index: 1;

    &:hover {
      color: ${theme.color.primary.blue};
      background-color: transparent;
    }

    &:focus {
      color: ${theme.color.black};
      background-color: transparent;
    }
  }

  i {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    left: 0;
    bottom: 0;
    padding: 0 0.2rem;
    font-size: 1.2rem;
    line-height: 1.6rem;
    z-index: 1;
  }
`

export default ImageThumbnail
