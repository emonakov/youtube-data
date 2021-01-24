import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const LinkTo = styled(NavLink)`
  text-decoration: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textColor};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-width: 100px;
  text-align: center;
  padding: ${({ theme }) => theme.paddingSm};

  &.active,
  &:active,
  &:hover {
    color: ${({ theme }) => theme.colors.textHoverColor};
    background: ${({ theme }) => theme.colors.backgroundHover};
  }

  &.active:hover {
    color: ${({ theme }) => theme.colors.textColor};
  }
`

const Link: React.FC<{ to: string; exact?: boolean }> = ({
  to,
  children,
  exact = false,
}) => (
  <LinkTo to={to} exact={exact}>
    {children}
  </LinkTo>
)

export default Link
