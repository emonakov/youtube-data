import React from 'react'
import styled from 'styled-components'
import { ItemInterface } from '../../../interfaces/ItemInterface'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 320px;
`

const VideoThumbnail: React.FC<{ item: ItemInterface }> = ({ item }) => (
  <Container>
    <h4>{item.snippet.title}</h4>
    <img
      src={item.snippet.thumbnails.medium.url}
      width={item.snippet.thumbnails.medium.width}
      height={item.snippet.thumbnails.medium.height}
      alt=""
    />
  </Container>
)

export default VideoThumbnail
