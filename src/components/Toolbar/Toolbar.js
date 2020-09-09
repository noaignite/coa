export { default } from '@material-ui/core/Toolbar'

export const styles = (theme) => ({
  gutters: {
    ...theme.mixins.gutters(2),
    [theme.breakpoints.up('sm')]: theme.mixins.gutters(2), // Override Mui styles
  },
  regular: theme.mixins.toolbar,
  dense: theme.mixins.toolbarDense,
})
