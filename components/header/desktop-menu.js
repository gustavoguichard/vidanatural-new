import { useState } from 'react'
import { useRouter } from 'next/router'
import kebabCase from 'lodash/kebabCase'
import { Button, Menu, MenuItem } from '@material-ui/core'

import theme from 'lib/theme'

import ButtonLink from 'components/button-link'

import menu from 'data/menu'

const SubMenu = ({ name, path, as, links }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const id = `menu-appbar-${kebabCase(name)}`
  const active = [path, as].includes(router.pathname)
  return (
    <>
      <Button
        color={active ? 'secondary' : 'inherit'}
        aria-label={name}
        aria-haspopup="true"
        aria-controls={id}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        {name}
      </Button>
      <Menu
        id={id}
        autoFocus
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {links.map((subItem, idx) => (
          <MenuItem
            onClick={async () => {
              await router.push(subItem.path, subItem.as)
              setAnchorEl(null)
            }}
            key={`submenu-${idx}`}
          >
            {subItem.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const DesktopMenu = ({ children }) => {
  return (
    <>
      {menu.links.map((item) => {
        const hasSubmenu = !!item.links
        return hasSubmenu ? (
          <SubMenu key={item.name} {...item} />
        ) : (
          <ButtonLink
            css={{
              '&.active': {
                color: theme.palette.secondary.main,
              },
            }}
            color="inherit"
            key={item.name}
            href={item.path}
            as={item.as}
          >
            {item.name}
          </ButtonLink>
        )
      })}
      {children}
    </>
  )
}

export default DesktopMenu
