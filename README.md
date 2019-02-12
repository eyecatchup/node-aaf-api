# node-aaf-api

Just a simple NodeJS wrapper for the AAF GraphQL API.

### Install & require `node-aaf-api`

```js
const aafApi = require('node-aaf-api');
```

## Examples

You can find examples in the examples directory. To run them, use (for example):

```sh
node examples/getFullGameStatsByTeam.js
```

### Custom queries

If you want to send your custom GraphQL queries, use:

```js
let customGraphqlQuery = {
    query: '{node(id: "Gid2AorIFgJgIqqgIphAWXYkSJWF") { ... on Game {playsConnection(first: 1000) {nodes {description}}}}}'
};

aafApi.query(customGraphqlQuery, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data);
    }
});
```

### Predefined queries

For convenience, some GraphQL queries are already wrapped:

#### Get all scheduled season games

```js
aafApi.getSeasonScheduleGames(function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.seasonsConnection.nodes[0].gamesConnection.nodes);
    }
});
```

#### Get games (by date range)

```js
let dateRange = {
    from: '2019-02-10T14:26:28.507Z',
    to: '2019-02-11T02:26:28.507Z'
};

aafApi.getGamesByDateRange(dateRange, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.gamesConnection.nodes);
    }
});
```

#### Get live games (by date range)

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

#### Get live game data (by gameId)

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

#### Get full team game stats (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getFullGameStatsByTeam(gameId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
```

#### Get full player game stats (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getFullGameStatsByPlayer(gameId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node.playersConnection.edges);
    }
});
```
