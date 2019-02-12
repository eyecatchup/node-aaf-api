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
aafApi.getTeams(function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.teamsConnection.nodes);
    }
});
```

[See query/result in AAF API explorer][explorer_getTeams]

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

[See query/result in AAF API explorer][explorer_getSeasonScheduleGames]

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

[See query/result in AAF API explorer][explorer_getGamesByDateRange]

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

#### Get feed of game plays a.k.a. live ticker (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getPlayFeedByGame(gameId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node.playsConnection.nodes);
    }
});
```

[See query/result in AAF API explorer][explorer_getPlayFeedByGame]

#### Get game stats by player (by gameId)

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

[See query/result in AAF API explorer][explorer_getFullGameStatsByPlayer]

#### Get game stats by team (by gameId)

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

[See query/result in AAF API explorer][explorer_getFullGameStatsByTeam]

#### Get full season team stats (by teamId)

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getFullSeasonStatsByTeam(teamId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
```

[See query/result in AAF API explorer][explorer_getFullSeasonStatsByTeam]

#### Get _basic_ team info (by teamId)

_No season stats, player & game infos included_

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getTeamInfoBasic(teamId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
```

[See query/result in AAF API explorer][explorer_getTeamInfoBasic]

#### Get _full_ team info (by teamId)

_Incl. season stats, player & game infos_

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getTeamInfo(teamId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
```

[See query/result in AAF API explorer][explorer_getTeamInfo]

#### Get all matches by team (by teamId)

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getGamesByTeam(teamId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
```

[See query/result in AAF API explorer][explorer_getGamesByTeam]

#### Get all players by team (by teamId)

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getPlayersByTeam(teamId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
```

[See query/result in AAF API explorer][explorer_getPlayersByTeam]




[explorer_getSeasonScheduleGames]: https://api.platform.aaf.com/#query=query%20getSeasonScheduleGamesQuery%20%7B%0A%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20gamesConnection(first%3A%2060)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20...seasonGameFragment%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20seasonGameFragment%20on%20Game%20%7B%0A%20%20id%0A%20%20timeToBeDetermined%0A%20%20subseason%0A%20%20time%0A%20%20awayTeam%20%7B%0A%20%20%20%20id%0A%20%20%20%20regionName%0A%20%20%20%20abbreviation%0A%20%20%20%20name%0A%20%20%20%20wordmark(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20homeTeam%20%7B%0A%20%20%20%20id%0A%20%20%20%20regionName%0A%20%20%20%20abbreviation%0A%20%20%20%20name%0A%20%20%20%20wordmark(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20stadium%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20__typename%0A%7D%0A&operationName=getSeasonScheduleGamesQuery
[explorer_getGamesByDateRange]: https://api.platform.aaf.com/#query=query%20getListOfGameQuery%20%7B%0A%20%20gamesConnection(first%3A%2050%2C%20atOrAfterTime%3A%20%222019-02-10T23%3A00%3A00.000Z%22%2C%20beforeTime%3A%20%222019-03-31T22%3A59%3A59.999Z%22)%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20status%20%7B%0A%20%20%20%20%20%20%20%20phase%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20awayTeam%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20logo(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20colors%0A%20%20%20%20%20%20%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20homeTeam%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20logo(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20colors%0A%20%20%20%20%20%20%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20ticketingWebsiteURL%0A%20%20%20%20%20%20availability%20%7B%0A%20%20%20%20%20%20%20%20shortName%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20stadium%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A&operationName=getListOfGameQuery
[explorer_getGamesByTeam]: https://api.platform.aaf.com/#operationName=getGamesByTeam&query=query%20getGamesByTeam%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20gamesConnection%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20time%0A%20%20%20%20%20%20%20%20awayTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20homeTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20status%20%7B%0A%20%20%20%20%20%20%20%20%20%20phase%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getPlayersByTeam]: https://api.platform.aaf.com/#operationName=getPlayersByTeam&query=query%20getPlayersByTeam%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20playersConnection(first%3A%20500)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20name%20%7B%0A%20%20%20%20%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20%20%20%20%20familyName%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20position%0A%20%20%20%20%20%20%20%20jerseyNumber%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getFullSeasonStatsByTeam]: https://api.platform.aaf.com/#operationName=getFullSeasonStatsByTeam&query=query%20getFullSeasonStatsByTeam%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20gamesPlayed%0A%20%20%20%20%20%20%20%20rushingPlays%0A%20%20%20%20%20%20%20%20rushingYardsNet%0A%20%20%20%20%20%20%20%20passingPlays%0A%20%20%20%20%20%20%20%20passesAttempted%0A%20%20%20%20%20%20%20%20passesCompleted%0A%20%20%20%20%20%20%20%20passesIntercepted%0A%20%20%20%20%20%20%20%20passingYardsNet%0A%20%20%20%20%20%20%20%20passingYardsGross%0A%20%20%20%20%20%20%20%20firstDownsByPassing%0A%20%20%20%20%20%20%20%20firstDownsByPenalty%0A%20%20%20%20%20%20%20%20firstDownsByRushing%0A%20%20%20%20%20%20%20%20thirdDownsConverted%0A%20%20%20%20%20%20%20%20thirdDownsUnconverted%0A%20%20%20%20%20%20%20%20fourthDownsConverted%0A%20%20%20%20%20%20%20%20fourthDownsUnconverted%0A%20%20%20%20%20%20%20%20fumbles%0A%20%20%20%20%20%20%20%20ownFumblesRecovered%0A%20%20%20%20%20%20%20%20turnovers%0A%20%20%20%20%20%20%20%20timesSacked%0A%20%20%20%20%20%20%20%20sackYardsLost%0A%20%20%20%20%20%20%20%20averageYardsPerPlay%0A%20%20%20%20%20%20%20%20averagePointsPerGame%0A%20%20%20%20%20%20%20%20averageTurnoversPerGame%0A%20%20%20%20%20%20%20%20averageTimesSackedPerGame%0A%20%20%20%20%20%20%20%20averagePassingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageRushingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageTimeOfPossessionPerGameMilliseconds%0A%20%20%20%20%20%20%20%20timeOfPossessionMilliseconds%0A%20%20%20%20%20%20%20%20twoPointConversionsAttempted%0A%20%20%20%20%20%20%20%20twoPointConversionsCompleted%0A%20%20%20%20%20%20%20%20twoPointConversionCompletionPercentage%0A%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getTeamInfo]: https://api.platform.aaf.com/#operationName=getTeamInfo&query=query%20getTeamInfo%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20colors%0A%20%20coach%20%7B%0A%20%20%20%20name%20%7B%0A%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20familyName%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20wordmark%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20nickname%0A%20%20facebookHandle%0A%20%20twitterHandle%0A%20%20instagramHandle%0A%20%20shopWebsiteURL%0A%20%20avatar%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20stadium%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20address%20%7B%0A%20%20%20%20%20%20postalCode%0A%20%20%20%20%20%20locality%0A%20%20%20%20%20%20administrativeArea%0A%20%20%20%20%20%20line1%0A%20%20%20%20%20%20line2%0A%20%20%20%20%20%20countryCode%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20gamesConnection%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20time%0A%20%20%20%20%20%20%20%20awayTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20homeTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20status%20%7B%0A%20%20%20%20%20%20%20%20%20%20phase%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20playersConnection(first%3A%20100)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20name%20%7B%0A%20%20%20%20%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20%20%20%20%20familyName%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20position%0A%20%20%20%20%20%20%20%20jerseyNumber%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20gamesPlayed%0A%20%20%20%20%20%20%20%20rushingPlays%0A%20%20%20%20%20%20%20%20rushingYardsNet%0A%20%20%20%20%20%20%20%20passingPlays%0A%20%20%20%20%20%20%20%20passesAttempted%0A%20%20%20%20%20%20%20%20passesCompleted%0A%20%20%20%20%20%20%20%20passesIntercepted%0A%20%20%20%20%20%20%20%20passingYardsNet%0A%20%20%20%20%20%20%20%20passingYardsGross%0A%20%20%20%20%20%20%20%20firstDownsByPassing%0A%20%20%20%20%20%20%20%20firstDownsByPenalty%0A%20%20%20%20%20%20%20%20firstDownsByRushing%0A%20%20%20%20%20%20%20%20thirdDownsConverted%0A%20%20%20%20%20%20%20%20thirdDownsUnconverted%0A%20%20%20%20%20%20%20%20fourthDownsConverted%0A%20%20%20%20%20%20%20%20fourthDownsUnconverted%0A%20%20%20%20%20%20%20%20fumbles%0A%20%20%20%20%20%20%20%20ownFumblesRecovered%0A%20%20%20%20%20%20%20%20turnovers%0A%20%20%20%20%20%20%20%20timesSacked%0A%20%20%20%20%20%20%20%20sackYardsLost%0A%20%20%20%20%20%20%20%20averageYardsPerPlay%0A%20%20%20%20%20%20%20%20averagePointsPerGame%0A%20%20%20%20%20%20%20%20averageTurnoversPerGame%0A%20%20%20%20%20%20%20%20averageTimesSackedPerGame%0A%20%20%20%20%20%20%20%20averagePassingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageRushingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageTimeOfPossessionPerGameMilliseconds%0A%20%20%20%20%20%20%20%20timeOfPossessionMilliseconds%0A%20%20%20%20%20%20%20%20twoPointConversionsAttempted%0A%20%20%20%20%20%20%20%20twoPointConversionsCompleted%0A%20%20%20%20%20%20%20%20twoPointConversionCompletionPercentage%0A%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getTeamInfoBasic]: https://api.platform.aaf.com/#operationName=getTeamInfoBasic&query=query%20getTeamInfoBasic%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20colors%0A%20%20coach%20%7B%0A%20%20%20%20name%20%7B%0A%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20familyName%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20wordmark%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20nickname%0A%20%20facebookHandle%0A%20%20twitterHandle%0A%20%20instagramHandle%0A%20%20shopWebsiteURL%0A%20%20avatar%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20stadium%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getPlayFeedByGame]: https://api.platform.aaf.com/#operationName=getPlayFeedByGame&query=query%20getPlayFeedByGame%20%7B%0A%20%20node(id%3A%20%22GjoCxWXQfvKpZuFlqeOgB5I-ceJn%22)%20%7B%0A%20%20%20%20...%20on%20Game%20%7B%0A%20%20%20%20%20%20playsConnection(first%3A%201000)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20%20%20yardLine%0A%20%20%20%20%20%20%20%20%20%20yardsToGo%0A%20%20%20%20%20%20%20%20%20%20yardLineTeam%0A%20%20%20%20%20%20%20%20%20%20gameClockSeconds%0A%20%20%20%20%20%20%20%20%20%20quarter%0A%20%20%20%20%20%20%20%20%20%20time%0A%20%20%20%20%20%20%20%20%20%20possession%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
[explorer_getFullGameStatsByPlayer]: https://api.platform.aaf.com/#operationName=getFullGameStatsByPlayer&query=query%20getFullGameStatsByPlayer%20%7B%0A%20%20node(id%3A%20%22GjoCxWXQfvKpZuFlqeOgB5I-ceJn%22)%20%7B%0A%20%20%20%20...%20on%20Game%20%7B%0A%20%20%20%20%20%20playersConnection(first%3A%20500)%20%7B%0A%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20jerseyNumber%0A%20%20%20%20%20%20%20%20%20%20%20%20legalName%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20familyName%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20team%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20passesAttempted%0A%20%20%20%20%20%20%20%20%20%20%20%20passesCompleted%0A%20%20%20%20%20%20%20%20%20%20%20%20passingYards%0A%20%20%20%20%20%20%20%20%20%20%20%20passingTouchdowns%0A%20%20%20%20%20%20%20%20%20%20%20%20passesIntercepted%0A%20%20%20%20%20%20%20%20%20%20%20%20rushesAttempted%0A%20%20%20%20%20%20%20%20%20%20%20%20rushingYards%0A%20%20%20%20%20%20%20%20%20%20%20%20rushingTouchdowns%0A%20%20%20%20%20%20%20%20%20%20%20%20receptions%0A%20%20%20%20%20%20%20%20%20%20%20%20receivingYards%0A%20%20%20%20%20%20%20%20%20%20%20%20receivingTouchdowns%0A%20%20%20%20%20%20%20%20%20%20%20%20tackles%0A%20%20%20%20%20%20%20%20%20%20%20%20assistedTackles%0A%20%20%20%20%20%20%20%20%20%20%20%20tacklesForLoss%0A%20%20%20%20%20%20%20%20%20%20%20%20sacks%0A%20%20%20%20%20%20%20%20%20%20%20%20sackYardsGained%0A%20%20%20%20%20%20%20%20%20%20%20%20passDefenses%0A%20%20%20%20%20%20%20%20%20%20%20%20quarterbackHits%0A%20%20%20%20%20%20%20%20%20%20%20%20fumbles%0A%20%20%20%20%20%20%20%20%20%20%20%20fumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%20%20fieldGoalsMade%0A%20%20%20%20%20%20%20%20%20%20%20%20fieldGoalsBlocked%0A%20%20%20%20%20%20%20%20%20%20%20%20twoPointConversionPassReceptionsGood%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousTackles%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousTackleAssists%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousAssistedTackles%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousFumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousOwnFumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousOpponentFumblesForced%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousOpponentFumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
[explorer_getFullGameStatsByTeam]: https://api.platform.aaf.com/#operationName=getFullGameStatsByTeam&query=query%20getFullGameStatsByTeam%20%7B%0A%20%20node(id%3A%20%22GjoCxWXQfvKpZuFlqeOgB5I-ceJn%22)%20%7B%0A%20%20%20%20...%20on%20Game%20%7B%0A%20%20%20%20%20%20homeTeamEdge%20%7B%0A%20%20%20%20%20%20%20%20...teamEdge%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20awayTeamEdge%20%7B%0A%20%20%20%20%20%20%20%20...teamEdge%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20teamEdge%20on%20GameTeamEdge%20%7B%0A%20%20stats%20%7B%0A%20%20%20%20gamesWon%0A%20%20%20%20gamesLost%0A%20%20%20%20gamesPlayed%0A%20%20%20%20rushingPlays%0A%20%20%20%20rushingYardsNet%0A%20%20%20%20passingPlays%0A%20%20%20%20passesAttempted%0A%20%20%20%20passesCompleted%0A%20%20%20%20passesIntercepted%0A%20%20%20%20passingYardsNet%0A%20%20%20%20passingYardsGross%0A%20%20%20%20firstDownsByPassing%0A%20%20%20%20firstDownsByPenalty%0A%20%20%20%20firstDownsByRushing%0A%20%20%20%20thirdDownsConverted%0A%20%20%20%20thirdDownsUnconverted%0A%20%20%20%20fourthDownsConverted%0A%20%20%20%20fourthDownsUnconverted%0A%20%20%20%20fumbles%0A%20%20%20%20ownFumblesRecovered%0A%20%20%20%20turnovers%0A%20%20%20%20timesSacked%0A%20%20%20%20sackYardsLost%0A%20%20%20%20averageYardsPerPlay%0A%20%20%20%20averagePointsPerGame%0A%20%20%20%20averageTurnoversPerGame%0A%20%20%20%20averageTimesSackedPerGame%0A%20%20%20%20averagePassingYardsNetPerGame%0A%20%20%20%20averageRushingYardsNetPerGame%0A%20%20%20%20averageTimeOfPossessionPerGameMilliseconds%0A%20%20%20%20timeOfPossessionMilliseconds%0A%20%20%20%20twoPointConversionsAttempted%0A%20%20%20%20twoPointConversionsCompleted%0A%20%20%20%20twoPointConversionCompletionPercentage%0A%20%20%20%20points%0A%20%20%7D%0A%7D%0A
[explorer_getTeams]: https://api.platform.aaf.com/#query=query%20getListOfTeamNameQuery%20%7B%0A%20%20teamsConnection%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20nickname%0A%20%20%20%20%20%20colors%0A%20%20%20%20%20%20logo%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20lightWordmark%3A%20wordmark(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20darkWordmark%3A%20wordmark(style%3A%20DARK_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A&operationName=getListOfTeamNameQuery
