const request = require('request');

let aafApi = {};

const postRequest = function(data, fn) {
    let options = {
        method: 'POST',
        url: 'https://api.platform.aaf.com/v1/graphql',
        json: true,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'User-Agent': 'node-aaf-api (https://github.com/eyecatchup/node-aaf-api)'
        },
        body: data
    };

    request(options, fn);
};

aafApi.query = function(requestPayload, fn) {
    postRequest(requestPayload, fn);
};

aafApi.getSeasonScheduleGames = function(fn) {
    let requestPayload = {
        operationName: 'getSeasonScheduleGamesQuery',
        variables: {},
        query: 'query getSeasonScheduleGamesQuery {\n' +
               '  seasonsConnection(last: 1) {\n' +
               '    nodes {\n' +
               '      id\n' +
               '      gamesConnection(first: 60) {\n' +
               '        nodes {\n' +
               '          ...seasonGameFragment\n' +
               '          __typename\n' +
               '        }\n' +
               '        __typename\n' +
               '      }\n' +
               '      __typename\n' +
               '    }\n' +
               '    __typename\n' +
               '  }\n' +
               '}\n' +
               '\n' +
               'fragment seasonGameFragment on Game {\n' +
               '  id\n' +
               '  timeToBeDetermined\n' +
               '  subseason\n' +
               '  time\n' +
               '  awayTeam {\n' +
               '    id\n' +
               '    regionName\n' +
               '    abbreviation\n' +
               '    name\n' +
               '    wordmark(style: LIGHT_BACKGROUND) {\n' +
               '      id\n' +
               '      url\n' +
               '      __typename\n' +
               '    }\n' +
               '    __typename\n' +
               '  }\n' +
               '  homeTeam {\n' +
               '    id\n' +
               '    regionName\n' +
               '    abbreviation\n' +
               '    name\n' +
               '    __typename\n' +
               '  }\n' +
               '  stadium {\n' +
               '    id\n' +
               '    name\n' +
               '    __typename\n' +
               '  }\n' +
               '  __typename\n' +
               '}\n'
    };
    postRequest(requestPayload, fn);
};

aafApi.getGamesByDateRange = function(dateRange, fn) {
    let requestPayload = {
        operationName: 'getListOfGameQuery',
        variables: {
            'atOrAfterTime': dateRange.from,
            'beforeTime': dateRange.to,
            'first': 20
        },
        query: 'query getListOfGameQuery($first: Int, $atOrAfterTime: DateTime!, $beforeTime: DateTime!) {\n' +
               '  gamesConnection(first: $first, atOrAfterTime: $atOrAfterTime, beforeTime: $beforeTime) {\n' +
               '    nodes {\n' +
               '      id\n' +
               '      time\n' +
               '      status {\n' +
               '        phase\n' +
               '        __typename\n' +
               '      }\n' +
               '      awayTeam {\n' +
               '        id\n' +
               '        abbreviation\n' +
               '        logo(style: LIGHT_BACKGROUND) {\n' +
               '          url\n' +
               '          __typename\n' +
               '        }\n' +
               '        colors\n' +
               '        seasonsConnection(last: 1) {\n' +
               '          edges {\n' +
               '            stats {\n' +
               '              gamesWon\n' +
               '              gamesLost\n' +
               '              __typename\n' +
               '            }\n' +
               '            __typename\n' +
               '          }\n' +
               '          __typename\n' +
               '        }\n' +
               '        __typename\n' +
               '      }\n' +
               '      homeTeam {\n' +
               '        id\n' +
               '        abbreviation\n' +
               '        logo(style: LIGHT_BACKGROUND) {\n' +
               '          url\n' +
               '          __typename\n' +
               '        }\n' +
               '        colors\n' +
               '        seasonsConnection(last: 1) {\n' +
               '          edges {\n' +
               '            stats {\n' +
               '              gamesWon\n' +
               '              gamesLost\n' +
               '              __typename\n' +
               '            }\n' +
               '            __typename\n' +
               '          }\n' +
               '          __typename\n' +
               '        }\n' +
               '        __typename\n' +
               '      }\n' +
               '      ticketingWebsiteURL\n' +
               '      availability {\n' +
               '        shortName\n' +
               '        url\n' +
               '        __typename\n' +
               '      }\n' +
               '      stadium {\n' +
               '        name\n' +
               '        __typename\n' +
               '      }\n' +
               '      __typename\n' +
               '    }\n' +
               '    __typename\n' +
               '  }\n' +
               '}\n'
    };
    postRequest(requestPayload, fn);
};

aafApi.getLiveGamesByDateRange = function(dateRange, fn) {
    let requestPayload = {
        operationName: 'getListOfLiveGameQuery',
        variables: {
            atOrAfterTime: dateRange.from,
            beforeTime: dateRange.to
        },
        query: 'query getListOfLiveGameQuery($beforeTime: DateTime!, $atOrAfterTime: DateTime!) {\n' +
               '  gamesConnection(beforeTime: $beforeTime, atOrAfterTime: $atOrAfterTime, first: 50) {\n' +
               '    nodes {\n' +
               '      id\n' +
               '      awayTeam {\n' +
               '        id\n' +
               '        name\n' +
               '        abbreviation\n' +
               '        logo(style: LIGHT_BACKGROUND) {\n' +
               '          url\n' +
               '          __typename\n' +
               '        }\n' +
               '        colors\n' +
               '        __typename\n' +
               '      }\n' +
               '      homeTeam {\n' +
               '        id\n' +
               '        name\n' +
               '        abbreviation\n' +
               '        logo(style: LIGHT_BACKGROUND) {\n' +
               '          url\n' +
               '          __typename\n' +
               '        }\n' +
               '        colors\n' +
               '        __typename\n' +
               '      }\n' +
               '      status {\n' +
               '        phase\n' +
               '        __typename\n' +
               '      }\n' +
               '      stadium {\n' +
               '        name\n' +
               '        __typename\n' +
               '      }\n' +
               '      __typename\n' +
               '    }\n' +
               '    __typename\n' +
               '  }\n' +
               '}\n'
    };
    postRequest(requestPayload, fn);
};

aafApi.getLiveGameData = function(gameId, fn) {
    let requestPayload = {
        operationName: 'getLiveGameDataQuery',
        variables: {
            gameId: gameId
        },
        query: 'query getLiveGameDataQuery($gameId: ID!) {\n' +
               '  node(id: $gameId) {\n' +
               '    ... on Game {\n' +
               '      id\n' +
               '      clock {\n' +
               '        seconds\n' +
               '        time\n' +
               '        __typename\n' +
               '      }\n' +
               '      homeTeam {\n' +
               '        id\n' +
               '        name\n' +
               '        abbreviation\n' +
               '        logo(style: LIGHT_BACKGROUND) {\n' +
               '          url\n' +
               '          __typename\n' +
               '        }\n' +
               '        colors\n' +
               '        seasonsConnection(last: 1) {\n' +
               '          edges {\n' +
               '            stats {\n' +
               '              gamesWon\n' +
               '              gamesLost\n' +
               '              __typename\n' +
               '            }\n' +
               '            __typename\n' +
               '          }\n' +
               '          __typename\n' +
               '        }\n' +
               '        __typename\n' +
               '      }\n' +
               '      awayTeam {' +
               '        id\n' +
               '        name\n' +
               '        abbreviation\n' +
               '        __typename\n' +
               '      }\n' +
               '      status {\n' +
               '        awayTeamPoints\n' +
               '        homeTeamPoints\n' +
               '        quarter\n' +
               '        time\n' +
               '        down\n' +
               '        yardsToGo\n' +
               '        phase\n' +
               '        possession\n' +
               '        __typename\n' +
               '      }\n' +
               '      stadium {\n' +
               '        name\n' +
               '        __typename\n' +
               '      }\n' +
               '      avStreams {\n' +
               '        hlsMasterPlaylistURL\n' +
               '        __typename\n' +
               '      }\n' +
               '      hlsMasterPlaylistURL\n' +
               '      __typename\n' +
               '    }\n' +
               '    __typename\n' +
               '  }\n' +
               '}\n'
    };
    postRequest(requestPayload, fn);
};

module.exports = aafApi;
