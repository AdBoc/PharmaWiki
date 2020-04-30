PWA made with react and redux(state management), axios for API calls, mobile first approach for CSS with media queries.

ASYNC REDUX ACTIONS
-Synchronous action(changing theme) - as soon as action is dispatched, state is updated
-Async action(making API call) - uses thunk redux middleware, makes API call, waits for response and dispatches action based on response 


DEVELOPMENT HISTORY

    v 0.1   -   dzialajace fetche z db zrobione w lokalnym state

API:

    Naprawienie niepoprawnego wysyłania odpowiedzi na złe podanie loginu i hasła

    Dodanie CORS headers w backend, dodatnie opcji Authorize w headersach

    login w res.json przy logowaniu wysyla tylko token (nie wysyla juz user.view())

    id juz nie jest widowczne w metodzie view() w schema

CLIENT:

    Proxy w package.json nie jest juz potrzebne??

    Zrobienie Fetch z basicAuth


    V 0.2

API:

CLIENT:

Added simple working login and logout function

Login component is now fully rewritten
