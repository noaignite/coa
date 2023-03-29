import * as React from 'react'
import PropTypes from 'prop-types'
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils'
import { AppBar, Badge, IconButton, styled } from '@mui/material'
import { t } from '@lingui/macro'
import { useCentraSelection, useGlobalHandlers, useGlobalState } from '~/contexts'
import { RouterLink } from '~/containers'
import { BrandIcon, CartIcon, SearchIcon, CloseIcon, MenuIcon } from '~/components'
import AppStoreMessage from './AppStoreMessage'

const BREAKPOINT_KEY = 'md'

export const classes = generateUtilityClasses('CiaAppHeader', [
  'toolbarPushMobile',
  'toolbarPushDesktop',
  'hiddenOnMobile',
  'hiddenOnDesktop',
])

const AppHeaderRoot = styled(AppBar)(({ theme, ownerState }) => ({
  ...(ownerState.mounted && {
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shortest, // Match value of `IconButton`
    }),
  }),
  ...(ownerState.headerMode === 'transparent' && {
    '&:not(:hover):not(:focus-within)': {
      backgroundColor: 'transparent',
      color: ownerState.headerColor,
    },
  }),
  // Util classes
  [`& .${classes.toolbarPushMobile}`]: {
    [theme.breakpoints.down(BREAKPOINT_KEY)]: { marginLeft: 'auto' },
  },
  [`& .${classes.toolbarPushDesktop}`]: {
    [theme.breakpoints.up(BREAKPOINT_KEY)]: { marginLeft: 'auto' },
  },
  [`& .${classes.hiddenOnMobile}`]: {
    [theme.breakpoints.down(BREAKPOINT_KEY)]: { display: 'none' },
  },
  [`& .${classes.hiddenOnDesktop}`]: {
    [theme.breakpoints.up(BREAKPOINT_KEY)]: { display: 'none' },
  },
}))

const AppHeaderToolbar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: 'var(--cia-header-toolbar-primary-height)',
  paddingInline: 'var(--cia-container-spacing)',
})

const AppHeaderBrandLink = styled(RouterLink)({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  color: 'inherit',
  '& > svg': {
    display: 'block',
    width: 'auto',
  },
})

const AppHeader = React.memo(function AppHeader(props) {
  const {
    headerColor = 'inherit',
    headerMode: headerModeProp = 'opaque',
    isCartMenuOpen,
    isNavMenuOpen,
    isSearchMenuOpen,
    isSomeMenuOpen,
    isStoreMessageOpen,
    productsCount,
    ...other
  } = props

  const { onCartMenuToggle, onNavMenuToggle, onSearchMenuToggle } = useGlobalHandlers()

  const [disableTransparency, setDisableTransparency] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  const syncDisableTransparency = React.useCallback(() => {
    setDisableTransparency(window.pageYOffset > 100)
  }, [])

  React.useEffect(() => {
    setMounted(true)
    syncDisableTransparency()

    const handleScroll = () => {
      syncDisableTransparency()
    }

    if (headerModeProp === 'auto') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }

    return undefined
  }, [headerModeProp, syncDisableTransparency])

  let computedHeaderMode = 'opaque'
  if (
    (headerModeProp === 'transparent' || (headerModeProp === 'auto' && !disableTransparency)) &&
    !isSomeMenuOpen
  ) {
    computedHeaderMode = 'transparent'
  }

  let headerHeight = 'var(--cia-header-toolbar-primary-height)'
  if (isStoreMessageOpen) {
    headerHeight = `calc(${headerHeight} + var(--cia-header-toolbar-secondary-height))`
  }

  const ownerState = {
    headerColor,
    headerMode: computedHeaderMode,
    mounted,
  }

  return (
    <AppHeaderRoot
      ownerState={ownerState}
      position={headerModeProp === 'opaque' ? 'sticky' : 'fixed'}
      {...other}
    >
      {isStoreMessageOpen && <AppStoreMessage />}

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            --cia-header-height: ${headerHeight};
            --cia-initial-sticky-top: ${
              headerModeProp === 'opaque' ? 'var(--cia-header-height)' : 0
            };
            --cia-sticky-top: ${headerModeProp !== 'transparent' ? 'var(--cia-header-height)' : 0};
          }
        `,
        }}
      />

      <AppHeaderToolbar>
        <IconButton
          onClick={onNavMenuToggle}
          color="inherit" // Inherit color from `headerColor`.
          edge="start"
          size="small"
          aria-haspopup="true"
          aria-expanded={isNavMenuOpen}
          aria-label={t`Toggle main menu`}
        >
          {isNavMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <div className={classes.toolbarPushMobile} />
        <div className={classes.toolbarPushDesktop} />

        <AppHeaderBrandLink href="/" aria-label={t`Go to the homepage`}>
          <BrandIcon />
        </AppHeaderBrandLink>

        <IconButton
          onClick={onSearchMenuToggle}
          color="inherit" // Inherit color from `headerColor`.
          size="small"
          aria-haspopup="true"
          aria-expanded={isSearchMenuOpen}
          aria-label={t`Toggle search`}
        >
          {isSearchMenuOpen ? <CloseIcon /> : <SearchIcon />}
        </IconButton>

        <IconButton
          onClick={onCartMenuToggle}
          color="inherit" // Inherit color from `headerColor`.
          edge="end"
          size="small"
          aria-haspopup="true"
          aria-expanded={isCartMenuOpen}
          aria-label={t`Toggle cart menu`}
        >
          {isCartMenuOpen ? (
            <CloseIcon />
          ) : (
            <Badge badgeContent={productsCount} color="primary" overlap="circular">
              <CartIcon />
            </Badge>
          )}
        </IconButton>
      </AppHeaderToolbar>
    </AppHeaderRoot>
  )
})

AppHeader.propTypes = {
  headerColor: PropTypes.string,
  headerMode: PropTypes.oneOf(['opaque', 'transparent', 'auto']),
  isCartMenuOpen: PropTypes.bool,
  isNavMenuOpen: PropTypes.bool,
  isSearchMenuOpen: PropTypes.bool,
  isSomeMenuOpen: PropTypes.bool,
  isStoreMessageOpen: PropTypes.bool,
  productsCount: PropTypes.number,
}

function AppHeaderContainer(props) {
  const { isCartMenuOpen, isNavMenuOpen, isSearchMenuOpen, isSomeMenuOpen, isStoreMessageOpen } =
    useGlobalState()
  const {
    selection: { items },
  } = useCentraSelection()

  return (
    <AppHeader
      isCartMenuOpen={isCartMenuOpen}
      isNavMenuOpen={isNavMenuOpen}
      isSearchMenuOpen={isSearchMenuOpen}
      isSomeMenuOpen={isSomeMenuOpen}
      isStoreMessageOpen={isStoreMessageOpen}
      productsCount={items.length}
      {...props}
    />
  )
}

export default AppHeaderContainer
