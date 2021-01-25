import React, { useCallback } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { darken, transparentize } from 'polished'

const tabOrder = [
  {
    path: '/',
    textKey: 'Assets',
    regex: /\/$/,
  },
  {
    path: '/asset-introducers',
    textKey: 'Introducers',
    regex: /\/asset-introducers/,
  },
]

const Tabs = styled.div`
  margin: 50px auto 25px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 2.5rem;
  background-color: #FFFFFF;
  border-radius: 3rem;
  box-shadow: 1px 1px 8px -4px rgba(0,0,0,.5), 1px 1px 4px -4px rgba(0,0,0,.5);
  z-index: 100;
  position: relative;
  width: 300px;
  max-width: 90vw;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row nowrap;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 2.5rem;
  border: 1px solid rgba(51,51,51,0);
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: #C4C4C4;
  font-size: 1rem;
  box-sizing: border-box;
  
  ${({ disabled }) => disabled && `
    cursor: default;
    pointer-events: none;
  `}

  &.${activeClassName} {
    background-color: #327ccb;
    border-radius: 3rem;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    box-sizing: border-box;
    font-weight: 400;
    color: #FFF;
    :focus
    :hover {
      background-color: #a3c3ea;
      color: #FFF;
    }
  }

  :hover {
    color: #000;
  }
`

function NavigationTabs({ location: { pathname }, history }) {
  const { t } = useTranslation()

  // const { account } = useWeb3React()

  const navigate = useCallback(
    direction => {
      const tabIndex = tabOrder.findIndex(({ regex }) => pathname.match(regex))
      history.push(tabOrder[(tabIndex + tabOrder.length + direction) % tabOrder.length].path)
    },
    [pathname, history]
  )
  const navigateRight = useCallback(() => {
    navigate(1)
  }, [navigate])
  const navigateLeft = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return (
    <>
      <Tabs>
        {tabOrder.map(({ path, textKey, regex, disabled }) => (
          <StyledNavLink disabled={disabled} key={path} to={path} isActive={(_, { pathname }) => pathname.match(regex)}>
            {t(textKey)}
          </StyledNavLink>
        ))}
      </Tabs>
    </>
  )
}

export default withRouter(NavigationTabs)
