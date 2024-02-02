import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    fileServerFolder: 'tests/e2e',
    fixturesFolder: 'tests/e2e/fixtures',
    downloadsFolder: 'tests/e2e/downloads',
    screenshotsFolder: 'tests/e2e/screenshots',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/e2e.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173'
  }
})
