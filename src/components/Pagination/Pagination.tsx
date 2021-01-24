import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { selectPageTokens } from '../../Pages/Home'

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > button {
    margin: ${({ theme }) => theme.paddingMd};
  }
`

interface Props {
  onPageChange: (token: string) => void
}

const Pagination: React.FC<Props> = ({ onPageChange }) => {
  const [prevPageToken, nextPageToken] = useSelector(selectPageTokens)
  const dispatch = useDispatch()

  return (<Container>
    {prevPageToken && (
      <button onClick={() => dispatch(onPageChange(prevPageToken))}>PREV</button>
    )}
    {nextPageToken && (
      <button onClick={() => dispatch(onPageChange(nextPageToken))}>NEXT</button>
    )}
  </Container>)
}

export default Pagination
