const request = require("request");

let aafApi = {};

const postRequest = function(data, fn) {
    var options = {
        method: 'POST',
        url: 'https://api.platform.aaf.com/v1/graphql',
        json: true,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'User-Agent': 'node-aaf-api (0.0.1)'
        },
        body: data
    };

    request(options, fn);
};

aafApi.query = function(requestPayload, fn) {
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
               '  gamesConnection(beforeTime: $beforeTime, atOrAfterTime: $atOrAfterTime, first: 20) {\n' +
               '    nodes {\n' +
               '      id\n' +
               '      clock {\n' +
               '        seconds\n' +
               '        time\n' +
               '        __typename\n' +
               '      }\n' +
               '      awayTeam {\n' +
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
