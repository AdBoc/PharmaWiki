PWA made with react and redux(state management), axios for API calls, mobile first approach for CSS with media queries.

ASYNC REDUX ACTIONS
-Synchronous action(changing theme) - as soon as action is dispatched, state is updated
-Async action(making API call) - uses thunk redux middleware, makes API call, waits for response and dispatches action based on response 

SECURITY

1 App has isLogged flag in redux store. Components and their text is rendered accordingly to value of isLogged value. User can manually add token to browser with dev tools (ex. localStorage.setItem('token', '"fdksnjdsnfodmjfkmzfdmzfdsz"');) and turn isLogged flag to true. It could be security risk but all protection comes from server which verifies token on every request to api.

2 ENV variable in API should not be public

3 Token auth should look differently

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


    v 0.2

CLIENT:

    Added simple working login and logout function

    Login component is rewritten
    

    v 0.3

CLIENT:

    Added history router and BrowserRouter is now Router

    Added isLogged flag 

    Added simple routing on website

    Added working create account 




    DO SPRAWDZANIA : CZY EMAILE MOGA BY TE SAME Z INNA DOMENA