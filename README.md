# Tech interview

This code challenge is designed to assess your ability to create and manage API endpoints, build responsive web interfaces, and handle user states using Nextjs. You will be implementing a search feature for products, along with a history of user searches.

## Code challenge

#### API endpoints

- Create an Next API route `/search`. Inside this route fetch the products from this API >> https://dummyjson.com/docs/products.
- Add parameters to this route such as `rating`, `priceMin`, `priceMax`.

#### Search

- In the homepage, build a navbar with search inputs and a button to trigger the search.
- On the button click call the server endpoint to get the products.
- Show the products in a grid, use responsive styling to **make it look nice**.
  Products cards should include `title`, `price`, `image`, `category`, `reviewAverageRating`

example query => `rating > 4.25` and `price < 800`

#### User Search History Management

- Store all the searches a user do.
- Create a page `/history` where users can see all their searches.
- On the top-right, add a button to clear the search history.

## Svolgimento

### Recupero dati da DummyJSON

Come prima cosa sono andato a leggere la documentazione della Products API di DummyJSON. Ho visto che non è possibile filtrare nativamente i prodotti per le loro proprietà, se non per le categorie. Tuttavia, dato che non è richiesta la paginazione, posso semplicemente recuperarmi tutti i prodotti e filtrarli a mano all'interno della API.

Mi sono quindi creato l'API interna GET /search nel file `/app/api/search/route.ts` che recupera tutti i prodotti e li filtra in base alla query fornita dall'utente. La API calcola anche la valutazione media del prodotto sulla base delle recensioni.

### Ricerca

Ho creato un componente **Navbar**, con dentro un **SearchForm** e con a sua volta dentro degli **NumberInputWrapper**. Un paio di note:

- Il **SearchFrom** che prende le categorie come parametro era stato creato perché speravo di porter renderizzare quella parte come un componente server (dato che devo recuperare le categorie dalla stessa API di DummyJSON)
- Il **NumberInputWrapper** usa internamente degli input di tipo text, necessari dato che era richiesta la possibilità di filtrare per numeri decimali.

Al clic del bottone viene chiamata la API da me creata e viene aggiunta la ricerca alla history.

### Risultati

I prodotti vengono messi in un Context in cui è wrappata tutta la pagina. La **ProductsList** non fa altro che mappare ogni prodotto a una card **ProductItem**.

### History

L'app è troppo semplice per poter salvare le ricerche su un database, per cui le salvo semplicemente nel localStorage. Della ricerca vengono salvati solamente i parametri e il count di risultati per quella ricerca.

### Note aggiuntive

Visto il poco tempo per svolgere l'esercizio, sono consapevole della mancanza tantissime casistiche da gestire:

- Gestione di caricamenti ed errori
- Incorerenza dei filtri inseriti dall'utente (es. prezzo minimo più grande di quello massimo)
- Corretta visualizzazione di dati nella card nei casi limite e del nome corretto della categoria

Ho notato che alcune dipendenze del progetto sono state incorrettamente installate come _dependencies_ anziché _devDependencies_, ovvero `tailwindcss` e le altre utility CSS da cui dipende (`postcss` e `autoprefixer`), oltre a `typescript` e tutti gli altri `@types`.
Di per sé non è un problema dato che si tratta di un progetto a sé stante, ma nel caso stessimo sviluppando una libreria si tratterebbe di un errore.
