# node-aaf-api

Just a simple NodeJS wrapper for the AAF GraphQL API.

### Install & require `node-aaf-api`

```js
const aafApi = require('node-aaf-api');
```

## Examples

If you want to send your custom GraphQL queries, use:

```js
aafApi.query(customGraphqlQuery, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data);
    }
});
```

For convenience, some GraphQL queries are already wrapped:

### Get games (by date range)

```js
let dateRange = {
    from: '2019-02-10T14:26:28.507Z',
    to: '2019-02-11T02:26:28.507Z'
};

aafApi.getLiveGamesByDateRange(dateRange, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.gamesConnection.nodes);
    }
});
```

### Get live game data (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getLiveGameData(gameId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
```
