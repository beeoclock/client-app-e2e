import { defineConfig } from 'cypress'

module.exports = defineConfig({
  projectId: 'cypress-beeclock-at',
  env: {
      apiBackendEntryPoint: 'https://api.dev.beeoclock.com/client/api/v1/',
  },

  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 10000,
    experimentalRunAllSpecs: true,
    numTestsKeptInMemory: 1,
    pageLoadTimeout: 20000,
    requestTimeout: 10000,
    chromeWebSecurity: false,
    includeShadowDom: true,
    watchForFileChanges: false
  },
})
