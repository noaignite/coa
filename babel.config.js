const defaultAlias = {
  api: './src/api',
  blocks: './src/blocks',
  components: './src/components',
  containers: './src/containers',
  src: './src',
  utils: './src/utils',
}

const productionPlugins = [
  '@babel/plugin-transform-react-constant-elements',
  'babel-plugin-transform-dev-warning',
  [
    'babel-plugin-transform-react-remove-prop-types',
    {
      mode: 'unsafe-wrap',
    },
  ],
]

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          // ES2015+ browsers
          targets: 'Chrome >= 60, Safari >= 10.1, iOS >= 10.3, Firefox >= 54, Edge >= 15',
          useBuiltIns: false,
        },
      },
    ],
  ],
  plugins: [
    'babel-plugin-optimize-clsx',
    'babel-plugin-lodash',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: defaultAlias,
      },
    ],
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
          // eslint-disable-next-line no-template-curly-in-string
          transform: '@material-ui/core/esm/${member}',
          preventFullImport: true,
        },
      },
    ],
  ],
  env: {
    development: {},
    production: {
      plugins: productionPlugins,
    },
  },
}
