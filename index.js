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
        query: `query getSeasonScheduleGamesQuery {
                    seasonsConnection(last: 1) {
                        nodes {
                            id
                            gamesConnection(first: 60) {
                                nodes {
                                    ...seasonGameFragment
                                    __typename
                                }
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }

                fragment seasonGameFragment on Game {
                    id
                    timeToBeDetermined
                    subseason
                    time
                    awayTeam {
                        id
                        regionName
                        abbreviation
                        name
                        wordmark(style: LIGHT_BACKGROUND) {
                            id
                            url
                            __typename
                        }
                        __typename
                    }
                    homeTeam {
                        id
                        regionName
                        abbreviation
                        name
                        wordmark(style: LIGHT_BACKGROUND) {
                            id
                            url
                            __typename
                        }
                        __typename
                    }
                    stadium {
                        id
                        name
                        __typename
                    }
                    __typename
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getGamesByDateRange = function(dateRange, fn) {
    let requestPayload = {
        operationName: 'getListOfGameQuery',
        variables: {
            'atOrAfterTime': dateRange.from,
            'beforeTime': dateRange.to,
            'first': 50
        },
        query: `query getListOfGameQuery($first: Int, $atOrAfterTime: DateTime!, $beforeTime: DateTime!) {
                    gamesConnection(first: $first, atOrAfterTime: $atOrAfterTime, beforeTime: $beforeTime) {
                        nodes {
                            id
                            time
                            status {
                                phase
                                __typename
                            }
                            awayTeam {
                                id
                                abbreviation
                                logo(style: LIGHT_BACKGROUND) {
                                    url
                                    __typename
                                }
                                colors
                                seasonsConnection(last: 1) {
                                    edges {
                                        stats {
                                            gamesWon
                                            gamesLost
                                            __typename
                                        }
                                        __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                            homeTeam {
                                id
                                abbreviation
                                logo(style: LIGHT_BACKGROUND) {
                                    url
                                    __typename
                                }
                                colors
                                seasonsConnection(last: 1) {
                                    edges {
                                        stats {
                                            gamesWon
                                            gamesLost
                                            __typename
                                        }
                                        __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                            ticketingWebsiteURL
                            availability {
                                shortName
                                url
                                __typename
                            }
                            stadium {
                                name
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }`
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
        query: `query getListOfLiveGameQuery($beforeTime: DateTime!, $atOrAfterTime: DateTime!) {
                    gamesConnection(beforeTime: $beforeTime, atOrAfterTime: $atOrAfterTime, first: 50) {
                        nodes {
                            id
                            awayTeam {
                                id
                                name
                                abbreviation
                                logo(style: LIGHT_BACKGROUND) {
                                    url
                                    __typename
                                }
                                colors
                                __typename
                            }
                            homeTeam {
                                id
                                name
                                abbreviation
                                logo(style: LIGHT_BACKGROUND) {
                                    url
                                    __typename
                                }
                                colors
                                __typename
                            }
                            status {
                                phase
                                __typename
                            }
                            stadium {
                                name
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getLiveGameData = function(gameId, fn) {
    let requestPayload = {
        operationName: 'getLiveGameDataQuery',
        variables: {
            gameId: gameId
        },
        query: `query getLiveGameDataQuery($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            id
                            clock {
                                seconds
                                time
                                __typename
                            }
                            homeTeam {
                                id
                                name
                                abbreviation
                                logo(style: LIGHT_BACKGROUND) {
                                    url
                                    __typename
                                }
                                colors
                                seasonsConnection(last: 1) {
                                    edges {
                                        stats {
                                            gamesWon
                                            gamesLost
                                            __typename
                                        }
                                        __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                            awayTeam {
                                id
                                name
                                abbreviation
                                logo(style: LIGHT_BACKGROUND) {
                                    url
                                    __typename
                                }
                                colors
                                seasonsConnection(last: 1) {
                                    edges {
                                        stats {
                                            gamesWon
                                            gamesLost
                                            __typename
                                        }
                                        __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                            status {
                                awayTeamPoints
                                homeTeamPoints
                                quarter
                                time
                                down
                                yardsToGo
                                phase
                                possession
                                __typename
                            }
                            stadium {
                                name
                                __typename
                            }
                            avStreams {
                                hlsMasterPlaylistURL
                                __typename
                            }
                            hlsMasterPlaylistURL
                            __typename
                        }
                        __typename
                    }
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getFullGameStatsByPlayer = function(gameId, fn) {
    let requestPayload = {
        variables: {
            gameId: gameId
        },
        query: `query getFullGameStatsByPlayer($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            playersConnection(first: 500) {
                                edges {
                                    node {
                                        jerseyNumber
                                        legalName {
                                            familyName
                                            givenName
                                        }
                                    }
                                    team {
                                        abbreviation
                                    }
                                    stats {
                                        passesAttempted
                                        passesCompleted
                                        passingYards
                                        passingTouchdowns
                                        passesIntercepted
                                        rushesAttempted
                                        rushingYards
                                        rushingTouchdowns
                                        receptions
                                        receivingYards
                                        receivingTouchdowns
                                        tackles
                                        assistedTackles
                                        tacklesForLoss
                                        sacks
                                        sackYardsGained
                                        passDefenses
                                        quarterbackHits
                                        fumbles
                                        fumblesRecovered
                                        fieldGoalsMade
                                        fieldGoalsBlocked
                                        twoPointConversionPassReceptionsGood
                                        miscellaneousTackles
                                        miscellaneousTackleAssists
                                        miscellaneousAssistedTackles
                                        miscellaneousFumblesRecovered
                                        miscellaneousOwnFumblesRecovered
                                        miscellaneousOpponentFumblesForced
                                        miscellaneousOpponentFumblesRecovered
                                    }
                                }
                            }
                        }
                    }
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getFullGameStatsByTeam = function(gameId, fn) {
    let requestPayload = {
        variables: {
            gameId: gameId
        },
        query: `query getFullGameStatsByTeam($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            homeTeamEdge {
                                ...teamEdge
                            }
                            awayTeamEdge {
                                ...teamEdge
                            }
                        }
                    }
                }

                fragment teamEdge on GameTeamEdge {
                    stats {
                        gamesWon
                        gamesLost
                        gamesPlayed
                        rushingPlays
                        rushingYardsNet
                        passingPlays
                        passesAttempted
                        passesCompleted
                        passesIntercepted
                        passingYardsNet
                        passingYardsGross
                        firstDownsByPassing
                        firstDownsByPenalty
                        firstDownsByRushing
                        thirdDownsConverted
                        thirdDownsUnconverted
                        fourthDownsConverted
                        fourthDownsUnconverted
                        fumbles
                        ownFumblesRecovered
                        turnovers
                        timesSacked
                        sackYardsLost
                        averageYardsPerPlay
                        averagePointsPerGame
                        averageTurnoversPerGame
                        averageTimesSackedPerGame
                        averagePassingYardsNetPerGame
                        averageRushingYardsNetPerGame
                        averageTimeOfPossessionPerGameMilliseconds
                        timeOfPossessionMilliseconds
                        twoPointConversionsAttempted
                        twoPointConversionsCompleted
                        twoPointConversionCompletionPercentage
                        points
                    }
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getFullSeasonStatsByTeam = function(teamId, fn) {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getFullSeasonStatsByTeam($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamInformationFragment
                            __typename
                        }
                        __typename
                    }
                }

                fragment teamInformationFragment on Team {
                    id
                    name
                    abbreviation
                    seasonsConnection(last: 1) {
                        edges {
                            stats {
                                gamesWon
                                gamesLost
                                gamesPlayed
                                rushingPlays
                                rushingYardsNet
                                passingPlays
                                passesAttempted
                                passesCompleted
                                passesIntercepted
                                passingYardsNet
                                passingYardsGross
                                firstDownsByPassing
                                firstDownsByPenalty
                                firstDownsByRushing
                                thirdDownsConverted
                                thirdDownsUnconverted
                                fourthDownsConverted
                                fourthDownsUnconverted
                                fumbles
                                ownFumblesRecovered
                                turnovers
                                timesSacked
                                sackYardsLost
                                averageYardsPerPlay
                                averagePointsPerGame
                                averageTurnoversPerGame
                                averageTimesSackedPerGame
                                averagePassingYardsNetPerGame
                                averageRushingYardsNetPerGame
                                averageTimeOfPossessionPerGameMilliseconds
                                timeOfPossessionMilliseconds
                                twoPointConversionsAttempted
                                twoPointConversionsCompleted
                                twoPointConversionCompletionPercentage
                                points
                            }
                        }
                    }
                    __typename
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getPlayFeedByGame = function(gameId, fn) {
    let requestPayload = {
        variables: {
            gameId: gameId
        },
        query: `query getPlayFeedByGame($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            playsConnection(first: 1000) {
                                nodes {
                                    description
                                    yardLine
                                    yardsToGo
                                    yardLineTeam
                                    gameClockSeconds
                                    quarter
                                    time
                                    possession
                                }
                            }
                        }
                    }
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getTeams = function(fn) {
    let requestPayload = {
        operationName: 'getListOfTeamNameQuery',
        variables: {},
        query: `query getListOfTeamNameQuery {
                    teamsConnection {
                        nodes {
                            id
                            name
                            abbreviation
                            nickname
                            colors
                            logo {
                                id
                                url
                                __typename
                            }
                            lightWordmark: wordmark(style: LIGHT_BACKGROUND) {
                                id
                                url
                                __typename
                            }
                            darkWordmark: wordmark(style: DARK_BACKGROUND) {
                                id
                                url
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getTeamInfoBasic = function(teamId, fn) {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getTeamInfoBasic($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamInformationFragment
                            __typename
                        }
                        __typename
                    }
                }

                fragment teamInformationFragment on Team {
                    id
                    name
                    abbreviation
                    colors
                    coach {
                        name {
                            givenName
                            familyName
                        }
                    }
                    wordmark {
                        id
                        url
                    }
                    nickname
                    facebookHandle
                    twitterHandle
                    instagramHandle
                    shopWebsiteURL
                    avatar {
                        id
                        url
                    }
                    stadium {
                        id
                        name
                    }
                    __typename
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getTeamInfo = function(teamId, fn) {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getTeamInfo($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamInformationFragment
                            __typename
                        }
                        __typename
                    }
                }

                fragment teamInformationFragment on Team {
                    id
                    name
                    abbreviation
                    colors
                    coach {
                        name {
                            givenName
                            familyName
                        }
                    }
                    wordmark {
                        id
                        url
                    }
                    nickname
                    facebookHandle
                    twitterHandle
                    instagramHandle
                    shopWebsiteURL
                    avatar {
                        id
                        url
                    }
                    stadium {
                        id
                        name
                        address {
                            postalCode
                            locality
                            administrativeArea
                            line1
                            line2
                            countryCode
                        }
                    }
                    gamesConnection {
                        edges {
                            node {
                                time
                                awayTeam {
                                    name
                                    abbreviation
                                }
                                homeTeam {
                                    name
                                    abbreviation
                                }
                                status {
                                    phase
                                }
                            }
                        }
                    }
                    playersConnection(first: 100) {
                        edges {
                            node {
                                name {
                                    givenName
                                    familyName
                                }
                                position
                                jerseyNumber
                            }
                        }
                    }
                    seasonsConnection(last: 1) {
                        edges {
                            stats {
                                gamesWon
                                gamesLost
                                gamesPlayed
                                rushingPlays
                                rushingYardsNet
                                passingPlays
                                passesAttempted
                                passesCompleted
                                passesIntercepted
                                passingYardsNet
                                passingYardsGross
                                firstDownsByPassing
                                firstDownsByPenalty
                                firstDownsByRushing
                                thirdDownsConverted
                                thirdDownsUnconverted
                                fourthDownsConverted
                                fourthDownsUnconverted
                                fumbles
                                ownFumblesRecovered
                                turnovers
                                timesSacked
                                sackYardsLost
                                averageYardsPerPlay
                                averagePointsPerGame
                                averageTurnoversPerGame
                                averageTimesSackedPerGame
                                averagePassingYardsNetPerGame
                                averageRushingYardsNetPerGame
                                averageTimeOfPossessionPerGameMilliseconds
                                timeOfPossessionMilliseconds
                                twoPointConversionsAttempted
                                twoPointConversionsCompleted
                                twoPointConversionCompletionPercentage
                                points
                            }
                        }
                    }
                    __typename
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getGamesByTeam = function(teamId, fn) {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getGamesByTeam($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamInformationFragment
                            __typename
                        }
                        __typename
                    }
                }

                fragment teamInformationFragment on Team {
                    id
                    name
                    abbreviation
                    gamesConnection {
                        edges {
                            node {
                                time
                                awayTeam {
                                    name
                                    abbreviation
                                }
                                homeTeam {
                                    name
                                    abbreviation
                                }
                                status {
                                    phase
                                }
                            }
                        }
                    }
                    __typename
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getPlayersByTeam = function(teamId, fn) {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getPlayersByTeam($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamInformationFragment
                            __typename
                        }
                        __typename
                    }
                }

                fragment teamInformationFragment on Team {
                    id
                    name
                    abbreviation
                    playersConnection(first: 500) {
                        edges {
                            node {
                                name {
                                    givenName
                                    familyName
                                }
                                position
                                jerseyNumber
                            }
                        }
                    }
                    __typename
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getRosterByTeam = function(teamId, fn) {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getTeamRosterListQuery($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            id
                            name
                            offense: playersConnection(first: 100, platoon: OFFENSE) {
                                nodes {
                                    ...playerRosterFragment
                                    __typename
                                }
                                __typename
                            }
                            defense: playersConnection(first: 100, platoon: DEFENSE) {
                                nodes {
                                    ...playerRosterFragment
                                    __typename
                                }
                                __typename
                            }
                            specialTeams: playersConnection(first: 100, platoon: SPECIAL_TEAMS) {
                                nodes {
                                    ...playerRosterFragment
                                    __typename
                                }
                                __typename
                            }
                            coachesConnection(first: 200) {
                                nodes {
                                    ...coachRosterFragment
                                    __typename
                                }
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }

                fragment playerRosterFragment on Player {
                    id
                    name {
                        familyName
                        givenName
                        __typename
                    }
                    position
                    jerseyNumber
                    heightMillimeters
                    weightGrams
                    avatar {
                        id
                        url
                        __typename
                    }
                    schoolsConnection {
                        nodes {
                            ...schoolConnectionFragment
                            __typename
                        }
                        __typename
                    }
                    transactionsConnection(last: 1) {
                        nodes {
                            rosterStatus
                            __typename
                        }
                        __typename
                    }
                    __typename
                }

                fragment schoolConnectionFragment on School {
                    id
                    name
                    isNCAA
                    abbreviation
                    __typename
                }

                fragment coachRosterFragment on Coach {
                    id
                    name {
                        familyName
                        givenName
                        __typename
                    }
                    title
                    __typename
                }`
    };
    postRequest(requestPayload, fn);
};

module.exports = aafApi;
