PWA made with react and redux(state management), axios for API calls, mobile first approach, CSS with media queries.

REDUX ACTIONS

-Synchronous actions - as soon as action is dispatched, state is updated

-Async action(making API call) - uses thunk redux middleware, makes API call, waits for response and dispatches action based on response 

SECURITY

1 App has isLogged flag in redux store. Components and their text is rendered accordingly to value of isLogged value. User can manually add token to browser with dev tools (ex. localStorage.setItem('token', '"fdksnjdsnfodmjfkmzfdmzfdsz"');) and turn isLogged flag to true. It could be security risk but all protection comes from server which verifies token on every request to api.

PS.I know ENV in API should not be public

### Code should be refractored 
