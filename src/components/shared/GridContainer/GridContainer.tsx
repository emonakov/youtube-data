import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);

  @media (min-width: 699px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
export default GridContainer
