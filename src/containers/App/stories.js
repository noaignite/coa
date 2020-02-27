import React from 'react'
import { storiesOf } from '@storybook/react'
import { compose, defaultProps } from 'recompose'
import withApiContext from 'api'
import { withAppProvider } from './AppContext'
import App from './App'

const stories = storiesOf('Containers/App', module)

export const Default = compose(
  defaultProps({
    children: <div>[this.props.children]</div>,
  }),
  withApiContext(),
  withAppProvider(),
)(App)

stories.add('Default', Default)

export default App
