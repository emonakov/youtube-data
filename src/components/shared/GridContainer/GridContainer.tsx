import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.paddingMd};
  grid-auto-rows: minmax(100px, auto);
  max-width: 1200px;
  width: 100%;

  @media (min-width: 699px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
export default GridContainer
