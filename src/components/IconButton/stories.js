import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select } from '@storybook/addon-knobs'
import IconButton from './IconButton'

const stories = storiesOf('Components/IconButton', module)

export const Default = () => (
  <IconButton
    color={select('color', ['default', 'inherit', 'primary', 'secondary'], 'default')}
    disabled={boolean('disabled', false)}
    edge={select('edge', ['start', 'end', false], false)}
    size={select('size', ['small', 'medium'], 'medium')}
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </IconButton>
)

stories.add('Default', Default)

export default IconButton
