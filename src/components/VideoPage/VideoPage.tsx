import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Loading from 'react-loading'
import { Helmet } from 'react-helmet-async'
import parse from 'html-react-parser'

import { RootState } from '../../Pages/Video'

import {
  getVideo,
  selectItem,
  selectLoading,
  cleanData,
  initFavorites,
  isFavSelector,
  addToFavorites,
  removeFromFavorites,
  selectError,
} from '../../Pages/Video'
import { formatDurationToTime } from '../../helpers/youtube'
import Error from '../shared/Error'

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
  padding: ${({ theme }) => theme.paddingContent};
`

const Stats = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  font-size: 16px;
  justify-content: space-evenly;
`

const Fav = styled.li`
  cursor: pointer;
`

const HomePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const fav = useSelector<RootState>((state) => isFavSelector(state, id))
  const error = useSelector(selectError)
  const theme = useContext(ThemeContext)
  const item = useSelector(selectItem)
  const isLoading = useSelector(selectLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVideo(id))
    dispatch(initFavorites())

    return () => {
      dispatch(cleanData())
    }
  }, [dispatch, id])

  return item && isLoading === false ? (
    <>
      <Helmet>
        <title>{item.snippet.title}</title>
      </Helmet>
      <Header>
        <Head>{item.snippet.title}</Head>
      </Header>
      <Container>
        <div>
          {parse(item.player.embedHtml)}
          <Stats>
            <li>
              {parse('&#x1F440')} {item.statistics.viewCount}
            </li>
            <li>
              {parse('&#x1F44D')} {item.statistics.likeCount}
            </li>
            <li>
              {parse('&#x1F44E')} {item.statistics.dislikeCount}
            </li>
            <li>
              {parse('&#x1F4AC')} {item.statistics.commentCount}
            </li>
            {!fav && (
              <Fav onClick={() => dispatch(addToFavorites(id))}>
                {parse('&#x1F90D')}
              </Fav>
            )}
            {fav && (
              <Fav onClick={() => dispatch(removeFromFavorites(id))}>
                {parse('&#x1F496')}
              </Fav>
            )}
            <li>
              {parse('&#x231A')}{' '}
              {formatDurationToTime(item.contentDetails.duration)}
            </li>
          </Stats>
        </div>
        <div>
          <p>{item.snippet.description}</p>
        </div>
      </Container>
    </>
  ) : (
    <Container>
      {isLoading && <Loading type="spin" color={theme.colors.niceGreen} />}
      {isLoading === false && <h1>Video not found</h1>}
      <Error error={error} />
    </Container>
  )
}

export default HomePage
