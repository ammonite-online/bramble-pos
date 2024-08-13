### Cypress config issue

There is a issue with Cypress config and the default typescript config delivered by Vite. In order to solve the problem I had to change the cypress config file from .ts to .mjs. This is a quick work around, and would need a more robust solution for production. More details here: https://github.com/cypress-io/cypress/issues/23552

### Use of content selection in cypress

For the sake of expedience I have occaisionally used content to make selections in cypress specs. In a real application a more robust method should be employed, to avoid brittle tests that depend on what could be dynamic data. Two options could be employing a reliable and repeatable test data strategy, or consistent use of a data-cy selector.

### Testing Chart Interactions and add sale results

The most valuable test would be to make sure that adding sales is refelected in the analytics chart. However, testing advanced interactions with the charts would take to long for me to build it into this example app.

### Dispatch indirection

Given more time I would introduce a layer of indirection between the dispatch function which modifies the applications state and the components which trigger actions. This would provide an oportunity to run side effects, such as synchronising local storage. It would be more robust to do this rather than using an effect to watch for state changes and synchornise that way. All state changes are predictable and so local storage modification could be made explicit and declaritive.

### State denormalization

Given the amount of data involved, and the limited scope of deliverable, I chose to denormalise the ui.selectedCashier state property and include the entire cashier object rather than referencing it by id. It was a small convenience.

### Vite

Given the small scope of the project, and it being entirely client side, I chose to implement it using Vite with very few modifications to the default config.

### User feedback

I have not added a cohesive logging strategy or any rich way of alerting the user to potential problems. Given more time I would include a Toast component to inform users of errors or other info. For example, at the moment if data initialisation from local storage were to fail, the loading spinner would stay there with no additional feedback.

### UI, Styling & Theme

For the sake of simplicity I did not implement a themeing system and kept styling very minimal. I did not do much in the way of style abstraction. I chose to use emotion for styling of non MUI element to maintain consistency.

### Ts-Pattern

I chose to use the ts-pattern library as I find it helps to keep code declaritive.

### Testing scope

There is definitely more that could be done with the unit testing. I kept things simple I just added a few examples of unit testing pure functions.

I also kept the e2e tests to a few simple examples.
