import React from 'react'
import styled from 'styled-components'

const MenuContainer = styled.nav`
  display: flex;
  padding: ${({ theme }) => theme.paddingContent};

  & > a {
    margin-right: ${({ theme }) => theme.paddingMd}
  }
`

const MenuBar: React.FC = ({ children }) => (
  <MenuContainer>
    {children}
  </MenuContainer>
)

export default MenuBar
