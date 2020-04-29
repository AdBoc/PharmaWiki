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
