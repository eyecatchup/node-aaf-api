# node-aaf-api

(Simple) NodeJS wrapper for the [AAF GraphQL API](https://aaf.engineering/introducing-the-aaf-graphql-api/).

## Install

```sh
npm i node-aaf-api
```

## Examples

You can find several examples in the examples directory. To run them, use (for example):

```sh
node examples/getFullSeasonStatsByTeam.js
```

## Use

Require `node-aaf-api`:

```js
const aafApi = require('node-aaf-api');
```

### Custom queries

If you want to send your custom GraphQL queries, use the `query` function:

```js
// Get all Quarterbacks, grouped by team
let requestPayload = {
    query: `{
              teamsConnection {
                nodes {
                  id
                  name
                  abbreviation
                  playersConnection(position: QUARTERBACK) {
                    nodes {
                      id
                      name {
                        givenName
                        familyName
                      }
                    }
                  }
                }
              }
            }`
};

aafApi.query(requestPayload, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_query]

### Predefined queries

For convenience, some common GraphQL queries - like getting game, team or player stats - are already wrapped:

#### Get all teams

```js
aafApi.getTeams((response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getTeams]

#### Get all scheduled season games

```js
aafApi.getSeasonScheduleGames((response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
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

aafApi.getGamesByDateRange(dateRange, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
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

aafApi.getLiveGamesByDateRange(dateRange, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

#### Get live game data (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getLiveGameData(gameId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

#### Get feed of game plays a.k.a. live ticker (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getPlayFeedByGame(gameId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getPlayFeedByGame]

#### Get game stats by player (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getFullGameStatsByPlayer(gameId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getFullGameStatsByPlayer]

#### Get game stats by team (by gameId)

```js
let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getFullGameStatsByTeam(gameId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getFullGameStatsByTeam]

#### Get full season team stats (by teamId)

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getFullSeasonStatsByTeam(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getFullSeasonStatsByTeam]

#### Get full season player stats by team (by teamId)

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getFullSeasonStatsByTeamByPlayer(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getFullSeasonStatsByTeamByPlayer]

#### Get _basic_ team info (by teamId)

_No season stats, player & game infos included_

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getTeamInfoBasic(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getTeamInfoBasic]

#### Get _full_ team info (by teamId)

_Incl. season stats, player & game infos_

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getTeamInfo(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getTeamInfo]

#### Get all matches by team (by teamId)

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getGamesByTeam(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getGamesByTeam]

#### Get roster by team (by teamId)

_Grouped by offense, defense, special teams & coaches_

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getRosterByTeam(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getRosterByTeam]

#### Get all players by team (by teamId)

_Not grouped (unlike getRosterByTeam) + no coaching stuff included. Just a simple list of players with id, jersey number, position and name._

```js
let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getPlayersByTeam(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data);
    }
});
```

[See query/result in AAF API explorer][explorer_getPlayersByTeam]




[explorer_getSeasonScheduleGames]: https://api.platform.aaf.com/#query=query%20getSeasonScheduleGamesQuery%20%7B%0A%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20gamesConnection(first%3A%2060)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20...seasonGameFragment%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20seasonGameFragment%20on%20Game%20%7B%0A%20%20id%0A%20%20timeToBeDetermined%0A%20%20subseason%0A%20%20time%0A%20%20awayTeam%20%7B%0A%20%20%20%20id%0A%20%20%20%20regionName%0A%20%20%20%20abbreviation%0A%20%20%20%20name%0A%20%20%20%20wordmark(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20homeTeam%20%7B%0A%20%20%20%20id%0A%20%20%20%20regionName%0A%20%20%20%20abbreviation%0A%20%20%20%20name%0A%20%20%20%20wordmark(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20stadium%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20__typename%0A%7D%0A&operationName=getSeasonScheduleGamesQuery
[explorer_getGamesByDateRange]: https://api.platform.aaf.com/#query=query%20getListOfGameQuery%20%7B%0A%20%20gamesConnection(first%3A%2050%2C%20atOrAfterTime%3A%20%222019-02-10T23%3A00%3A00.000Z%22%2C%20beforeTime%3A%20%222019-03-31T22%3A59%3A59.999Z%22)%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20time%0A%20%20%20%20%20%20status%20%7B%0A%20%20%20%20%20%20%20%20phase%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20awayTeam%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20logo(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20colors%0A%20%20%20%20%20%20%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20homeTeam%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20logo(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20colors%0A%20%20%20%20%20%20%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20ticketingWebsiteURL%0A%20%20%20%20%20%20availability%20%7B%0A%20%20%20%20%20%20%20%20shortName%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20stadium%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A&operationName=getListOfGameQuery
[explorer_getGamesByTeam]: https://api.platform.aaf.com/#operationName=getGamesByTeam&query=query%20getGamesByTeam%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20gamesConnection%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20time%0A%20%20%20%20%20%20%20%20awayTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20homeTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20status%20%7B%0A%20%20%20%20%20%20%20%20%20%20phase%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getPlayersByTeam]: https://api.platform.aaf.com/#operationName=getPlayersByTeam&query=query%20getPlayersByTeam%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20playersConnection(first%3A%20500)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%20%7B%0A%20%20%20%20%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20%20%20%20%20familyName%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20position%0A%20%20%20%20%20%20%20%20jerseyNumber%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getFullSeasonStatsByTeam]: https://api.platform.aaf.com/#operationName=getFullSeasonStatsByTeam&query=query%20getFullSeasonStatsByTeam%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20gamesPlayed%0A%20%20%20%20%20%20%20%20rushingPlays%0A%20%20%20%20%20%20%20%20rushingYardsNet%0A%20%20%20%20%20%20%20%20passingPlays%0A%20%20%20%20%20%20%20%20passesAttempted%0A%20%20%20%20%20%20%20%20passesCompleted%0A%20%20%20%20%20%20%20%20passesIntercepted%0A%20%20%20%20%20%20%20%20passingYardsNet%0A%20%20%20%20%20%20%20%20passingYardsGross%0A%20%20%20%20%20%20%20%20firstDownsByPassing%0A%20%20%20%20%20%20%20%20firstDownsByPenalty%0A%20%20%20%20%20%20%20%20firstDownsByRushing%0A%20%20%20%20%20%20%20%20thirdDownsConverted%0A%20%20%20%20%20%20%20%20thirdDownsUnconverted%0A%20%20%20%20%20%20%20%20fourthDownsConverted%0A%20%20%20%20%20%20%20%20fourthDownsUnconverted%0A%20%20%20%20%20%20%20%20fumbles%0A%20%20%20%20%20%20%20%20ownFumblesRecovered%0A%20%20%20%20%20%20%20%20turnovers%0A%20%20%20%20%20%20%20%20timesSacked%0A%20%20%20%20%20%20%20%20sackYardsLost%0A%20%20%20%20%20%20%20%20averageYardsPerPlay%0A%20%20%20%20%20%20%20%20averagePointsPerGame%0A%20%20%20%20%20%20%20%20averageTurnoversPerGame%0A%20%20%20%20%20%20%20%20averageTimesSackedPerGame%0A%20%20%20%20%20%20%20%20averagePassingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageRushingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageTimeOfPossessionPerGameMilliseconds%0A%20%20%20%20%20%20%20%20timeOfPossessionMilliseconds%0A%20%20%20%20%20%20%20%20twoPointConversionsAttempted%0A%20%20%20%20%20%20%20%20twoPointConversionsCompleted%0A%20%20%20%20%20%20%20%20twoPointConversionCompletionPercentage%0A%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getTeamInfo]: https://api.platform.aaf.com/#operationName=getTeamInfo&query=query%20getTeamInfo%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20colors%0A%20%20coach%20%7B%0A%20%20%20%20name%20%7B%0A%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20familyName%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20wordmark%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20nickname%0A%20%20facebookHandle%0A%20%20twitterHandle%0A%20%20instagramHandle%0A%20%20shopWebsiteURL%0A%20%20avatar%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20stadium%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20address%20%7B%0A%20%20%20%20%20%20postalCode%0A%20%20%20%20%20%20locality%0A%20%20%20%20%20%20administrativeArea%0A%20%20%20%20%20%20line1%0A%20%20%20%20%20%20line2%0A%20%20%20%20%20%20countryCode%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20gamesConnection%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20time%0A%20%20%20%20%20%20%20%20awayTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20homeTeam%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20status%20%7B%0A%20%20%20%20%20%20%20%20%20%20phase%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20playersConnection(first%3A%20100)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20name%20%7B%0A%20%20%20%20%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20%20%20%20%20familyName%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20position%0A%20%20%20%20%20%20%20%20jerseyNumber%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20gamesPlayed%0A%20%20%20%20%20%20%20%20rushingPlays%0A%20%20%20%20%20%20%20%20rushingYardsNet%0A%20%20%20%20%20%20%20%20passingPlays%0A%20%20%20%20%20%20%20%20passesAttempted%0A%20%20%20%20%20%20%20%20passesCompleted%0A%20%20%20%20%20%20%20%20passesIntercepted%0A%20%20%20%20%20%20%20%20passingYardsNet%0A%20%20%20%20%20%20%20%20passingYardsGross%0A%20%20%20%20%20%20%20%20firstDownsByPassing%0A%20%20%20%20%20%20%20%20firstDownsByPenalty%0A%20%20%20%20%20%20%20%20firstDownsByRushing%0A%20%20%20%20%20%20%20%20thirdDownsConverted%0A%20%20%20%20%20%20%20%20thirdDownsUnconverted%0A%20%20%20%20%20%20%20%20fourthDownsConverted%0A%20%20%20%20%20%20%20%20fourthDownsUnconverted%0A%20%20%20%20%20%20%20%20fumbles%0A%20%20%20%20%20%20%20%20ownFumblesRecovered%0A%20%20%20%20%20%20%20%20turnovers%0A%20%20%20%20%20%20%20%20timesSacked%0A%20%20%20%20%20%20%20%20sackYardsLost%0A%20%20%20%20%20%20%20%20averageYardsPerPlay%0A%20%20%20%20%20%20%20%20averagePointsPerGame%0A%20%20%20%20%20%20%20%20averageTurnoversPerGame%0A%20%20%20%20%20%20%20%20averageTimesSackedPerGame%0A%20%20%20%20%20%20%20%20averagePassingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageRushingYardsNetPerGame%0A%20%20%20%20%20%20%20%20averageTimeOfPossessionPerGameMilliseconds%0A%20%20%20%20%20%20%20%20timeOfPossessionMilliseconds%0A%20%20%20%20%20%20%20%20twoPointConversionsAttempted%0A%20%20%20%20%20%20%20%20twoPointConversionsCompleted%0A%20%20%20%20%20%20%20%20twoPointConversionCompletionPercentage%0A%20%20%20%20%20%20%20%20points%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getTeamInfoBasic]: https://api.platform.aaf.com/#operationName=getTeamInfoBasic&query=query%20getTeamInfoBasic%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20...teamInformationFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20teamInformationFragment%20on%20Team%20%7B%0A%20%20id%0A%20%20name%0A%20%20abbreviation%0A%20%20colors%0A%20%20coach%20%7B%0A%20%20%20%20name%20%7B%0A%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20familyName%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20wordmark%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20nickname%0A%20%20facebookHandle%0A%20%20twitterHandle%0A%20%20instagramHandle%0A%20%20shopWebsiteURL%0A%20%20avatar%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%7D%0A%20%20stadium%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%7D%0A%20%20__typename%0A%7D%0A
[explorer_getPlayFeedByGame]: https://api.platform.aaf.com/#operationName=getPlayFeedByGame&query=query%20getPlayFeedByGame%20%7B%0A%20%20node(id%3A%20%22GjoCxWXQfvKpZuFlqeOgB5I-ceJn%22)%20%7B%0A%20%20%20%20...%20on%20Game%20%7B%0A%20%20%20%20%20%20playsConnection(first%3A%201000)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%20%20%20%20yardLine%0A%20%20%20%20%20%20%20%20%20%20yardsToGo%0A%20%20%20%20%20%20%20%20%20%20yardLineTeam%0A%20%20%20%20%20%20%20%20%20%20gameClockSeconds%0A%20%20%20%20%20%20%20%20%20%20quarter%0A%20%20%20%20%20%20%20%20%20%20time%0A%20%20%20%20%20%20%20%20%20%20possession%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
[explorer_getFullGameStatsByPlayer]: https://api.platform.aaf.com/#operationName=getFullGameStatsByPlayer&query=query%20getFullGameStatsByPlayer%20%7B%0A%20%20node(id%3A%20%22GjoCxWXQfvKpZuFlqeOgB5I-ceJn%22)%20%7B%0A%20%20%20%20...%20on%20Game%20%7B%0A%20%20%20%20%20%20playersConnection(first%3A%20500)%20%7B%0A%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20jerseyNumber%0A%20%20%20%20%20%20%20%20%20%20%20%20legalName%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20familyName%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20team%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20passesAttempted%0A%20%20%20%20%20%20%20%20%20%20%20%20passesCompleted%0A%20%20%20%20%20%20%20%20%20%20%20%20passingYards%0A%20%20%20%20%20%20%20%20%20%20%20%20passingTouchdowns%0A%20%20%20%20%20%20%20%20%20%20%20%20passesIntercepted%0A%20%20%20%20%20%20%20%20%20%20%20%20rushesAttempted%0A%20%20%20%20%20%20%20%20%20%20%20%20rushingYards%0A%20%20%20%20%20%20%20%20%20%20%20%20rushingTouchdowns%0A%20%20%20%20%20%20%20%20%20%20%20%20receptions%0A%20%20%20%20%20%20%20%20%20%20%20%20receivingYards%0A%20%20%20%20%20%20%20%20%20%20%20%20receivingTouchdowns%0A%20%20%20%20%20%20%20%20%20%20%20%20tackles%0A%20%20%20%20%20%20%20%20%20%20%20%20assistedTackles%0A%20%20%20%20%20%20%20%20%20%20%20%20tacklesForLoss%0A%20%20%20%20%20%20%20%20%20%20%20%20sacks%0A%20%20%20%20%20%20%20%20%20%20%20%20sackYardsGained%0A%20%20%20%20%20%20%20%20%20%20%20%20passDefenses%0A%20%20%20%20%20%20%20%20%20%20%20%20quarterbackHits%0A%20%20%20%20%20%20%20%20%20%20%20%20fumbles%0A%20%20%20%20%20%20%20%20%20%20%20%20fumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%20%20fieldGoalsMade%0A%20%20%20%20%20%20%20%20%20%20%20%20fieldGoalsBlocked%0A%20%20%20%20%20%20%20%20%20%20%20%20twoPointConversionPassReceptionsGood%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousTackles%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousTackleAssists%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousAssistedTackles%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousFumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousOwnFumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousOpponentFumblesForced%0A%20%20%20%20%20%20%20%20%20%20%20%20miscellaneousOpponentFumblesRecovered%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
[explorer_getFullGameStatsByTeam]: https://api.platform.aaf.com/#operationName=getFullGameStatsByTeam&query=query%20getFullGameStatsByTeam%20%7B%0A%20%20node(id%3A%20%22GjoCxWXQfvKpZuFlqeOgB5I-ceJn%22)%20%7B%0A%20%20%20%20...%20on%20Game%20%7B%0A%20%20%20%20%20%20homeTeamEdge%20%7B%0A%20%20%20%20%20%20%20%20...teamEdge%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20awayTeamEdge%20%7B%0A%20%20%20%20%20%20%20%20...teamEdge%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20teamEdge%20on%20GameTeamEdge%20%7B%0A%20%20stats%20%7B%0A%20%20%20%20gamesWon%0A%20%20%20%20gamesLost%0A%20%20%20%20gamesPlayed%0A%20%20%20%20rushingPlays%0A%20%20%20%20rushingYardsNet%0A%20%20%20%20passingPlays%0A%20%20%20%20passesAttempted%0A%20%20%20%20passesCompleted%0A%20%20%20%20passesIntercepted%0A%20%20%20%20passingYardsNet%0A%20%20%20%20passingYardsGross%0A%20%20%20%20firstDownsByPassing%0A%20%20%20%20firstDownsByPenalty%0A%20%20%20%20firstDownsByRushing%0A%20%20%20%20thirdDownsConverted%0A%20%20%20%20thirdDownsUnconverted%0A%20%20%20%20fourthDownsConverted%0A%20%20%20%20fourthDownsUnconverted%0A%20%20%20%20fumbles%0A%20%20%20%20ownFumblesRecovered%0A%20%20%20%20turnovers%0A%20%20%20%20timesSacked%0A%20%20%20%20sackYardsLost%0A%20%20%20%20averageYardsPerPlay%0A%20%20%20%20averagePointsPerGame%0A%20%20%20%20averageTurnoversPerGame%0A%20%20%20%20averageTimesSackedPerGame%0A%20%20%20%20averagePassingYardsNetPerGame%0A%20%20%20%20averageRushingYardsNetPerGame%0A%20%20%20%20averageTimeOfPossessionPerGameMilliseconds%0A%20%20%20%20timeOfPossessionMilliseconds%0A%20%20%20%20twoPointConversionsAttempted%0A%20%20%20%20twoPointConversionsCompleted%0A%20%20%20%20twoPointConversionCompletionPercentage%0A%20%20%20%20points%0A%20%20%7D%0A%7D%0A
[explorer_getTeams]: https://api.platform.aaf.com/#query=query%20getListOfTeamNameQuery%20%7B%0A%20%20teamsConnection%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20nickname%0A%20%20%20%20%20%20colors%0A%20%20%20%20%20%20logo%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20lightWordmark%3A%20wordmark(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20darkWordmark%3A%20wordmark(style%3A%20DARK_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A&operationName=getListOfTeamNameQuery
[explorer_getRosterByTeam]: https://api.platform.aaf.com/#query=query%20getTeamRosterListQuery%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20offense%3A%20playersConnection(first%3A%20100%2C%20platoon%3A%20OFFENSE)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20...playerRosterFragment%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20defense%3A%20playersConnection(first%3A%20100%2C%20platoon%3A%20DEFENSE)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20...playerRosterFragment%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20specialTeams%3A%20playersConnection(first%3A%20100%2C%20platoon%3A%20SPECIAL_TEAMS)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20...playerRosterFragment%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20coachesConnection(first%3A%20200)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20...coachRosterFragment%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20playerRosterFragment%20on%20Player%20%7B%0A%20%20id%0A%20%20name%20%7B%0A%20%20%20%20familyName%0A%20%20%20%20givenName%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20position%0A%20%20jerseyNumber%0A%20%20heightMillimeters%0A%20%20weightGrams%0A%20%20avatar%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20schoolsConnection%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20...schoolConnectionFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20transactionsConnection(last%3A%201)%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20rosterStatus%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20__typename%0A%7D%0A%0Afragment%20schoolConnectionFragment%20on%20School%20%7B%0A%20%20id%0A%20%20name%0A%20%20isNCAA%0A%20%20abbreviation%0A%20%20__typename%0A%7D%0A%0Afragment%20coachRosterFragment%20on%20Coach%20%7B%0A%20%20id%0A%20%20name%20%7B%0A%20%20%20%20familyName%0A%20%20%20%20givenName%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20title%0A%20%20__typename%0A%7D%0A&operationName=getTeamRosterListQuery
[explorer_getFullSeasonStatsByTeamByPlayer]: https://api.platform.aaf.com/#operationName=getTeamPlayersSeasonStats&query=query%20getTeamPlayersSeasonStats%20%7B%0A%20%20node(id%3A%20%22DKY1420EnDNa1FwBlyC8sAV_1ft6%22)%20%7B%0A%20%20%20%20...%20on%20Team%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nickname%0A%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20colors%0A%20%20%20%20%20%20logo%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20wordmark(style%3A%20LIGHT_BACKGROUND)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20passingYardsGross%0A%20%20%20%20%20%20%20%20%20%20%20%20passingYardsNet%0A%20%20%20%20%20%20%20%20%20%20%20%20rushingYardsNet%0A%20%20%20%20%20%20%20%20%20%20%20%20gamesWon%0A%20%20%20%20%20%20%20%20%20%20%20%20gamesLost%0A%20%20%20%20%20%20%20%20%20%20%20%20gamesPlayed%0A%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20playersConnection(first%3A%201000)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20...playerConnectionFragment%0A%20%20%20%20%20%20%20%20%20%20seasonsConnection(last%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20stats%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20...playerStats%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A%0Afragment%20playerConnectionFragment%20on%20Player%20%7B%0A%20%20id%0A%20%20jerseyNumber%0A%20%20heightMillimeters%0A%20%20weightGrams%0A%20%20name%20%7B%0A%20%20%20%20familyName%0A%20%20%20%20givenName%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20position%0A%20%20avatar%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20schoolsConnection%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20...schoolConnectionFragment%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%20%20__typename%0A%7D%0A%0Afragment%20schoolConnectionFragment%20on%20School%20%7B%0A%20%20id%0A%20%20name%0A%20%20isNCAA%0A%20%20abbreviation%0A%20%20__typename%0A%7D%0A%0Afragment%20playerStats%20on%20PlayerStats%20%7B%0A%20%20assistedTackles%0A%20%20fieldGoalsAttempted%0A%20%20fieldGoalsBlocked%0A%20%20fieldGoalsLongestMade%0A%20%20fieldGoalsMade%0A%20%20fumbles%0A%20%20fumblesRecovered%0A%20%20gamesPlayed%0A%20%20interceptionReturns%0A%20%20miscellaneousAssistedTackles%0A%20%20miscellaneousFumblesRecovered%0A%20%20miscellaneousOpponentFumblesForced%0A%20%20miscellaneousOpponentFumblesRecovered%0A%20%20miscellaneousOwnFumblesRecovered%0A%20%20miscellaneousTackleAssists%0A%20%20miscellaneousTackles%0A%20%20opponentFumblesForced%0A%20%20opponentFumblesRecovered%0A%20%20opposingFieldGoalsBlocked%0A%20%20ownFumblesRecovered%0A%20%20passDefenses%0A%20%20passesAttempted%0A%20%20passesCompleted%0A%20%20passesIntercepted%0A%20%20passingTouchdowns%0A%20%20passingYards%0A%20%20puntingLongestKick%0A%20%20puntingYards%0A%20%20puntingYardsNet%0A%20%20puntsAttempted%0A%20%20quarterbackHits%0A%20%20receivingLongestGain%0A%20%20receivingTouchdowns%0A%20%20receivingYards%0A%20%20receptions%0A%20%20rushesAttempted%0A%20%20rushingLongestGain%0A%20%20rushingTouchdowns%0A%20%20rushingYards%0A%20%20sackYardsGained%0A%20%20sacks%0A%20%20specialTeamsAssistedTackles%0A%20%20specialTeamsFumblesRecovered%0A%20%20specialTeamsOpponentFumblesForced%0A%20%20specialTeamsOpponentFumblesRecovered%0A%20%20specialTeamsOwnFumblesRecovered%0A%20%20specialTeamsTackleAssists%0A%20%20specialTeamsTackles%0A%20%20tackleAssists%0A%20%20tackles%0A%20%20tacklesForLoss%0A%20%20timesSacked%0A%20%20twoPointConversionsCompleted%0A%20%20__typename%0A%7D%0A
[explorer_query]: https://api.platform.aaf.com/#query=%7B%0A%20%20teamsConnection%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20abbreviation%0A%20%20%20%20%20%20playersConnection(position%3A%20QUARTERBACK)%20%7B%0A%20%20%20%20%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20name%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20givenName%0A%20%20%20%20%20%20%20%20%20%20%20%20familyName%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
