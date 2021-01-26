import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > button {
    margin: ${({ theme }) => theme.paddingMd};
  }
`

const Button = styled.button`
  background: ${({ theme }) => theme.colors.niceGreen};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.textHoverColor};
    background: ${({ theme }) => theme.colors.backgroundHover};
  }
`

interface Props {
  onPageChange: (token: string) => void
  prevPage?: string
  nextPage?: string
  isDisabled?: boolean
}

const Pagination: React.FC<Props> = ({
  onPageChange,
  prevPage,
  nextPage,
  isDisabled,
}) => {
  return (
    <Container>
      {prevPage && (
        <Button
          data-testid="navigation-prev"
          disabled={isDisabled}
          onClick={() => onPageChange(prevPage)}
        >
          &#8249;
        </Button>
      )}
      {nextPage && (
        <Button
          data-testid="navigation-next"
          disabled={isDisabled}
          onClick={() => {
            onPageChange(nextPage)
          }}
        >
          &#8250;
        </Button>
      )}
    </Container>
  )
}

export default Pagination
