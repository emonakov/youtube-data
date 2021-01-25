import React, { useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Loading from 'react-loading'


import Search from '../Search'
import Pagination from '../shared/Pagination'
import GridContainer from '../shared/GridContainer'
import VideoThumbnail from '../shared/VideoThumbnail'
import {
  getMostPopular,
  selectItems,
  selectSearchToken,
  searchVideos,
  selectPageTokens,
  setSearchToken,
  selectLoading,
} from '../../Pages/Home'

const Container = styled.main`
  display: flex;
  padding: ${({ theme }) => theme.paddingContent};
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const Head = styled.h1`
  text-align: center;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HomePage: React.FC = () => {
  const theme = useContext(ThemeContext)
  const items = useSelector(selectItems)
  const searchToken = useSelector(selectSearchToken)
  const [prevPageToken, nextPageToken] = useSelector(selectPageTokens)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!items) {
      dispatch(getMostPopular())
    }
  }, [dispatch, items])

  const onPopularNextPage = (pageToken: string) =>
    dispatch(getMostPopular(pageToken))

  const onSearchNextPage = (pageToken: string) =>
    dispatch(searchVideos(searchToken, pageToken))

  const onSearch = (queryToken: string) => {
    dispatch(setSearchToken(queryToken))
    dispatch(searchVideos(queryToken))
  }

  const onReset = () => {
    dispatch(setSearchToken(''))
    dispatch(getMostPopular())
  }

  return (
    <>
      <Header>
        <Head>Search youtube or see popular</Head>
        <Search onSearch={onSearch} onReset={onReset} />
      </Header>
      <Container>
        {!isLoading && (
          <>
            <GridContainer>
              {items &&
                items.map((item) => (
                  <VideoThumbnail key={item.etag} item={item} />
                ))}
              {items?.length === 0 && <h2>Nothing found</h2>}
            </GridContainer>
            <Pagination
              onPageChange={searchToken ? onSearchNextPage : onPopularNextPage}
              nextPage={nextPageToken}
              prevPage={prevPageToken}
              isDisabled={isLoading}
            />
          </>
        )}
        {
          isLoading && <Loading type="spin" color={theme.colors.niceGreen} />
        }
      </Container>
    </>
  )
}

export default HomePage
