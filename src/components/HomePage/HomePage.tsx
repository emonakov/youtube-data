import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import Pagination from '../Pagination'
import GridContainer from '../shared/GridContainer'
import VideoThumbnail from '../shared/VideoThumbnail'
import { getMostPopular, selectItems } from '../../Pages/Home'

const Container = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.paddingContent};
`

const Head = styled.h1`
  text-align: center;
`

const HomePage: React.FC = () => {
  const items = useSelector(selectItems)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!items) {
      dispatch(getMostPopular())
    }
  }, [dispatch, items])

  return (
    <Container>
      <Head>Search youtube or see popular</Head>
      <GridContainer>
        {items &&
          items.map((item) => <VideoThumbnail key={item.id} item={item} />)}
      </GridContainer>
      <Pagination onPageChange={getMostPopular} />
    </Container>
  )
}

export default HomePage
