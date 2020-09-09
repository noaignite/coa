import * as React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { SITE_FOOTER_ID, SITE_HEADER_ID, SITE_MAIN_ID } from 'src/site.config'
import RouterLink from 'containers/RouterLink'
import BrandIcon from 'components/icons/Brand'
import BurgerIcon from 'components/icons/Burger'
import CartIcon from 'components/icons/Cart'
import CrossIcon from 'components/icons/Cross'
import SearchIcon from 'components/icons/Search'
import IconButton from 'components/IconButton'
import Toolbar from 'components/Toolbar'
import AppAppBar from './partials/AppAppBar'
import AppBackdrop from './partials/AppBackdrop'
import AppCartDrawer from './partials/AppCartDrawer'
import AppCookieBar from './partials/AppCookieBar'
import AppFooter from './partials/AppFooter'
import AppNavDrawer from './partials/AppNavDrawer'
import AppNavDropdown from './partials/AppNavDropdown'
import AppSearchDrawer from './partials/AppSearchDrawer'
import AppSkipLink from './partials/AppSkipLink'
import { useApp } from './AppContext'

const BREAKPOINT_KEY_DOWN = 'sm'
const BREAKPOINT_KEY_UP = 'md'

export const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appBar: {},
  appBarToolbar: {},
  appBarMobilePush: {
    [theme.breakpoints.down(BREAKPOINT_KEY_DOWN)]: {
      marginLeft: 'auto',
    },
  },
  appBarDesktopPush: {
    [theme.breakpoints.up(BREAKPOINT_KEY_UP)]: {
      marginLeft: 'auto',
    },
  },
  burgerIconButton: {
    [theme.breakpoints.up(BREAKPOINT_KEY_UP)]: {
      display: 'none',
    },
  },
  searchIconButton: {},
  brandIconButton: {
    [theme.breakpoints.down(BREAKPOINT_KEY_DOWN)]: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      marginLeft: 0, // Cancel margin of `edge="start"`
    },
  },
  cartIconButton: {},
  navDropdown: {
    [theme.breakpoints.down(BREAKPOINT_KEY_DOWN)]: {
      display: 'none',
    },
  },
  main: {
    flexGrow: 1,
    paddingTop: 'var(--coa-initial-sticky-top, 0px)',
    outline: 0, // Disable focus ring as `main` is focusable via "Skip Link".
  },
})

function App(props) {
  const { children, classes, ...other } = props

  const {
    appBarColor,
    hideFooter,
    hideHeader,
    isBackdropOpen,
    isCartMenuOpen,
    isCookieBarOpen,
    isLoading,
    isNavMenuOpen,
    isSearchMenuOpen,
    isSomeMenuOpen,
    onAppBarBurgerClick,
    onAppBarCartClick,
    onAppBarSearchClick,
  } = useApp()

  const burgerIconButton = (
    <IconButton
      className={classes.burgerIconButton}
      onClick={onAppBarBurgerClick}
      edge="start"
      size="small"
      aria-haspopup="true"
      aria-expanded={isNavMenuOpen}
      aria-label="Toggle main menu"
    >
      {isNavMenuOpen ? <CrossIcon /> : <BurgerIcon />}
    </IconButton>
  )

  const searchIconButton = (
    <IconButton
      className={classes.searchIconButton}
      onClick={onAppBarSearchClick}
      size="small"
      aria-haspopup="true"
      aria-expanded={isSearchMenuOpen}
      aria-label="Toggle search"
    >
      {isSearchMenuOpen ? <CrossIcon /> : <SearchIcon />}
    </IconButton>
  )

  const brandIconButton = (
    <IconButton
      className={classes.brandIconButton}
      component={RouterLink}
      href="/"
      edge="start"
      aria-label="Go to the homepage"
    >
      <BrandIcon style={{ width: 'auto' }} />
    </IconButton>
  )

  const cartIconButton = (
    <IconButton
      className={classes.cartIconButton}
      onClick={onAppBarCartClick}
      edge="end"
      size="small"
      aria-haspopup="true"
      aria-expanded={isCartMenuOpen}
      aria-label="Toggle cart menu"
    >
      {isCartMenuOpen ? <CrossIcon /> : <CartIcon amount={3} />}
    </IconButton>
  )

  return (
    <div className={classes.root} {...other}>
      <AppSkipLink href={`#${SITE_MAIN_ID}`}>Skip to content</AppSkipLink>

      {!hideHeader && (
        <AppAppBar
          className={classes.appBar}
          color={appBarColor}
          disableTransparency={isSomeMenuOpen}
          id={SITE_HEADER_ID}
        >
          <Toolbar className={classes.appBarToolbar}>
            {burgerIconButton}
            {brandIconButton}

            <AppNavDropdown className={classes.navDropdown} />

            <div className={classes.appBarDesktopPush} />
            {searchIconButton}
            <div className={classes.appBarMobilePush} />

            {cartIconButton}
          </Toolbar>
        </AppAppBar>
      )}

      <main className={classes.main} id={SITE_MAIN_ID} role="main" tabIndex="-1">
        {children}
      </main>

      {!hideFooter && <AppFooter id={SITE_FOOTER_ID} />}

      <AppNavDrawer open={isNavMenuOpen} />
      <AppCartDrawer open={isCartMenuOpen} />
      <AppSearchDrawer open={isSearchMenuOpen} />
      <AppCookieBar open={isCookieBarOpen} />
      <AppBackdrop open={isBackdropOpen} loading={isLoading} />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
