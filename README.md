# Create Ignite App Template

This is the official [NoA Ignite](https://noaignite.se/) base template. It's built with [Next.js](https://nextjs.org/), [Storybook](https://storybook.js.org/), [MUI](https://mui.com/) and [NoA Ignite packages](https://www.npmjs.com/org/noaignite).
If something doesn’t work, please [file an issue](https://github.com/noaignite/create-ignite-app/issues).

## Getting started

```sh
npx @noaignite/create-app my-app
cd my-app
```

### Developing with Storybook

```sh
yarn storybook
```

Then open http://localhost:3001/ to see your app in Storybook.
If you need to deploy Storybook app to production, create a minified bundle with `yarn build-storybook`.

### Developing with Next.js

```sh
yarn dev
```

Then open http://localhost:3000/ to see your app in Next.js.
When you’re ready to deploy your Next.js app to production, create a minified bundle with `yarn build`.

### Creating a release

When going live, an initial release can be created. To do this, run:

```sh
yarn release --first-release --skip.changelog
```

For subsequent releases, run:

```sh
yarn release
```

## Developing the App

Inside the newly created directory, the initial project structure will look something like:

```
my-app
├── .husky
├── .storybook
├── node_modules
├── .eslintrc.js
├── .prettierrc
├── babel.config.js
├── next.config.js
├── package.json
├── public
│   ├── fonts
│   ├── locales
│   ├── media
│   └── favicon.ico
└── src
    ├── api
    ├── blocks
    ├── components
    ├── containers
    ├── contexts
    ├── layouts
    ├── pages
    ├── utils
    └── pages.stories.js
```

The philosophy behind some of this structure can be read below.

### src/api

The place for your api related utilities.

```
src/api
├── __mock__ (Mock data used for Storybook)
├── centra
├── utils
├── index.js
└── ...
```

### src/blocks

Blocks are top level modules in the application, hierarchically directly below the App layout and typically defined with a `section` element at it's root. These can also be configured as choosable modules for the admin panel of chosen CMS. When possible, these should be exported from their common exports file (`src/blocks/index.js`) using `next/dynamic`. This will ensure that blocks are chunked and not downloaded to the client on a particular page unless rendered.

```
src/blocks
├── Hero
├── Media
├── index.js
└── ...
```

### src/components

Components found here are meant to be presentational in nature, meaning they are not supposed to be aware of any overlaying structure such as page specific details or API data. Furthermore you will find the `theme` configuration and MUI/OUI overrides here. A good rule of thumb is to have components not importing project files outside of `src/components`.

```
src/components
├── colors (Color palettes)
├── icons (Icon components)
├── internal (MUI & OUI overrides)
├── styles (Theme configuration)
├── index.js
└── ...
```

### src/containers

Container components are "smart" components, they come in various sizes but what unifies them is that they have some understanding of the overlaying structure. This could be page layout, page routing or API data structure. An example of this could be a `<ProductCard product={product} />` component that receives complicated data such as a product object as a prop fetched from an API.

```
src/containers
├── RouterLink (A Next.js wrapped routing component)
├── index.js
└── ...
```

### src/contexts

This is a good place to add app-level providers that should be accessible from all corners of the application. Providers added here should be exported in the api directory's common export file(s). accessing data or helpers from these providers can look like this `import { usei18n } from '~/contexts'`.

```
src/contexts
├── Centra (Centra utilities)
├── Global (App state such as menus, cookie bars and such)
├── I18n (Internalization utilities)
├── RemoteConfig (CMS data or other remote settings)
├── index.js
└── ...
```

### src/layouts

this is a good place to add app-level providers that should be accessible from all corners of the application. providers added here should be exported in the api directory's common export file(s). accessing data or helpers from these providers can look like this `import { usei18n } from '~/contexts'`.

```
src/layouts
├── AppBase (Contains the necessary modules which should exist on all pages)
├── App (The default layout to be used)
├── index.js
└── ...
```

### src/pages & src/pages.stories.js

The `src/pages` directory is used by Next.js to configure page routing. [Read more about Next.js pages.](https://nextjs.org/docs/basic-features/pages)
The `src/pages.stories.js` file is used to generate your pages for Storybook based on `src/api/__mock__/cms/pages.js`.

Both Next.js & Storybook pages use the same `createRenderBlock` helper found under `src/utils/createRenderBlock.js` to iterate over Block components as described from an API. Using the same setup helps to keep a consistent codebase across both environments. Don't forget to add your newly created Block component to the common exports file!

## One template, two entry points

```
Component
├── Component.js
├── index.js
└── storybook.index.js (Optional)
```

The `index.js` file is used as the exports file for it's module. In some cases there is a need to enhance the module with business logic without adding it to the template file directly, this is the place for that. The benefits of doing so is that a separate exports file can be created for Storybook with or without mocked business logic, this is then added to `storybook.index.js`. Now two different versions of the module can be imported based on the working environment by importing the module from it's directory path; `import Component from 'path/to/Component'`.

## Other good to knows

### Favicons

Generate favicons on [favicon.io](https://favicon.io/) and replace the files under `public`.

### Fonts

Add font files to `public/fonts` and import them under `src/components/internal/MuiCssBaseline.js`. For font preloading add them to `src/pages/_document.js`. We only preload .woff2 files as it's supported by all browsers other than IE11, and adding the media-query wizardry for that doesn't feel worthy of today. Do note that the crossOrigin attribute may need to change if you're using a different domain for CDN, or loading the font from somewhere else.
