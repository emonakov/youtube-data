import React from 'react'
import { Link as LinkUnstyled } from 'react-router-dom'
import styled from 'styled-components'
import { ItemInterface } from '../../../interfaces/ItemInterface'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 320px;
`

const Link = styled(LinkUnstyled)`
  text-decoration: none;
  color: unset;
`

const VideoThumbnail: React.FC<{ item: ItemInterface }> = ({ item }) => {
  let videoId = item.id

  if (item.id instanceof Object) {
    videoId = item.id.videoId
  }

  return (
    <Link to={`/video/${videoId}`}>
      <Container>
        <h4>{item.snippet.title}</h4>
        <img
          src={item.snippet.thumbnails.medium.url}
          width={item.snippet.thumbnails.medium.width}
          height={item.snippet.thumbnails.medium.height}
          alt=""
        />
      </Container>
    </Link>
  )
}

export default VideoThumbnail
