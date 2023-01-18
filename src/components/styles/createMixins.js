import grey from '../colors/grey'

export default function createMixins(breakpoints, spacing, mixins) {
  return {
    // Override Mui mixins
    toolbar: {
      minHeight: 'var(--cia-toolbar-min-height)',
      [breakpoints.up('sm')]: {
        minHeight: 'var(--cia-toolbar-min-height)',
      },
    },
    // Custom mixins
    gutters: (amount = 2) => ({
      paddingLeft: spacing(amount),
      paddingRight: spacing(amount),
    }),
    contain: (breakpoint = 'lg') => ({
      maxWidth: breakpoints.values[breakpoint] || breakpoint,
      marginRight: 'auto',
      marginLeft: 'auto',
    }),
    // Higher CSS specificity is needed, hence the `:not(style)` selector is needed.
    // https://github.com/mui-org/material-ui/issues/26384#issuecomment-844890584
    horizontalRhythm: (amount = 1, selector = ':not(style)') => ({
      [`& > ${selector} + ${selector}`]: {
        marginLeft: spacing(amount),
      },
    }),
    // Higher CSS specificity is needed, hence the `:not(style)` selector is needed.
    // https://github.com/mui-org/material-ui/issues/26384#issuecomment-844890584
    verticalRhythm: (amount = 1, selector = ':not(style)') => ({
      [`& > ${selector} + ${selector}`]: {
        marginTop: spacing(amount),
      },
    }),
    lineClamp: (lines) => ({
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: lines,
      overflow: 'hidden',
    }),
    scrollable: {
      overscrollBehaviorY: 'contain',
      overflowX: 'hidden',
      overflowY: 'auto',
      // Add iOS momentum scrolling.
      WebkitOverflowScrolling: 'touch',
    },
    scrollbars: {
      '&::-webkit-scrollbar': {
        width: 5,
        backgroundColor: grey[200],
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: grey[800],
      },
    },
    ...mixins,
  }
}
