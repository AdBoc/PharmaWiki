PWA made with react and redux(state management), axios for API calls, mobile first approach for CSS with media queries.
App will never need access to data from drugs and active substances outside of component so state will be stored locally(without redux).

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

Zrobienie Fetch z basicAuth


    v 0.2 - working login option

CLIENT:

Added simple working login and logout function

Login component is rewritten


    v 0.3 - working register option, simple routing

CLIENT:

Added history router and BrowserRouter is now Router

Added isLogged flag 

Added simple routing on website

Added working create account 


    v 0.4 - get drugs data on main page

CLIENT:

Searching for drugs now works


    v 0.5 - get active substances, search for drug by active substance

CLIENT:

Searching for active substances now works

Searching for drugs with active substances also works 


    v 0.6 - added working navbar

CLIENT:

Added working navbar


### Code will have to be refractored due to low readability 


    DO SPRAWDZANIA : CZY EMAILE MOGA BY TE SAME Z INNA DOMENA


TODO: 
Make user page and allow for edits 
Make password confirm while registering and other regex verifiers
PWA features