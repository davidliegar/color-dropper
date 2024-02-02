# color-dropper

**Live envrioment**: https://color-dropper-umber.vercel.app/

color dropper is a tool that enables users to upload an image and inspect the different colors of each pixel in hexadecimal, RGB, and HSL formats.

To install dependencies:

```sh
cd color-dropper
npm install
npm run dev
```

### Npm scripts ###

```sh
npm i
```

To run the frontend project

```sh
npm run dev
```

To lint all the js and ts
```sh
npm run lint:ts
```

To lint the styles

```sh
npm run lint:css
```

To run the unit testing

```sh
npm run test:unit
```

To run the E2E
```sh
npm run test:e2e
```

To launch the interactive GUI of cypress to manually run tests
```sh
npm run test:e2e:gui
```

### Architecture

It has been decided to implement a hexagonal architecture for the project. The core folder is where the product use cases are defined. We have two entities; the main entity is "canvas." The canvas contains all the code (framework agnostic) necessary for the view to construct the product.

As the project lacks storage features, there is no need for the implementation of a repository and the infrastructure layer.

Working with use cases makes the alignment with the product way easier because at any time, it is easy to know what can be done with each entity.

On the view side, Vue with TypeScript (TS) and Single File Component (SFC) features have been utilized. I decided not to implement a global state with Pinia or reactive composables because it would be an overkill for this small project. However, the implementation would be straightforward.

In the testing part, for unit testing, vitest and vue testing library are used.There is a proof of concept for using snapshots to test the canvas. End-to-End tests are done using Cypress.

### Next steps

- Implement storybook in the components folder
- Mobile version
- Allow to move or close the tools
- Pre commits hooks using Husky
