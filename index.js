const request = require('request');

let aafApi = {};

const postRequest = (data, fn) => {
    let options = {
        method: 'POST',
        url: 'https://api.platform.aaf.com/v1/graphql',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'node-aaf-api (https://github.com/eyecatchup/node-aaf-api)'
        },
        body: data
    };

    request(options, (error, response, body) => {
        fn({
            status: !error ? 'success' : 'error',
            data: !error ? !body.data ? null : body.data : error
        });
    });
};

const fragments = {
    gameOnGame: `fragment game on Game {
            id
            timeToBeDetermined
            subseason
            time
            clock {
                seconds
                time
                __typename
            }
            homeTeam {
                ...team
            }
            awayTeam {
                ...team
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
            ticketingWebsiteURL
            availability {
                shortName
                url
            }
            avStreams {
                hlsMasterPlaylistURL
            }
            hlsMasterPlaylistURL
            __typename
        }`,
    teamOnTeam: `fragment team on Team {
            id
            name
            nickname
            regionName
            abbreviation
            colors
            avatar {
                url
            }
            logo {
                url
            }
            division {
                id
                name
            }
            seasonRecord: seasonsConnection(last: 1) {
                edges {
                    stats {
                        gamesWon
                        gamesLost
                        gamesPlayed
                    }
                }
            }
            __typename
        }`,
    teamIdNameAbbrOnTeam: `fragment teamIdNameAbbr on Team {
            id
            name
            abbreviation
        }`,
    playerOnPlayer: `fragment player on Player {
            id
            avatar {
                url
            }
            name {
                givenName
                familyName
            }
            platoon
            position
            jerseyNumber
            heightMillimeters
            weightGrams
        }`,
    playerStatsOnPlayerStats: `fragment playerStats on PlayerStats {
            assistedTackles
            fieldGoalsAttempted
            fieldGoalsBlocked
            fieldGoalsLongestMade
            fieldGoalsMade
            fumbles
            fumblesRecovered
            gamesPlayed
            interceptionReturns
            miscellaneousAssistedTackles
            miscellaneousFumblesRecovered
            miscellaneousOpponentFumblesForced
            miscellaneousOpponentFumblesRecovered
            miscellaneousOwnFumblesRecovered
            miscellaneousTackleAssists
            miscellaneousTackles
            opponentFumblesForced
            opponentFumblesRecovered
            opposingFieldGoalsBlocked
            ownFumblesRecovered
            passDefenses
            passesAttempted
            passesCompleted
            passesIntercepted
            passingTouchdowns
            passingYards
            puntingLongestKick
            puntingYards
            puntingYardsNet
            puntsAttempted
            quarterbackHits
            receivingLongestGain
            receivingTouchdowns
            receivingYards
            receptions
            rushesAttempted
            rushingLongestGain
            rushingTouchdowns
            rushingYards
            sackYardsGained
            sacks
            specialTeamsAssistedTackles
            specialTeamsFumblesRecovered
            specialTeamsOpponentFumblesForced
            specialTeamsOpponentFumblesRecovered
            specialTeamsOwnFumblesRecovered
            specialTeamsTackleAssists
            specialTeamsTackles
            tackleAssists
            tackles
            tacklesForLoss
            timesSacked
            twoPointConversionsCompleted
            __typename
        }`
};

aafApi.query = (requestPayload, fn) => {
    postRequest(requestPayload, fn);
};

aafApi.getSeasonScheduleGames = (fn) => {
    let requestPayload = {
        operationName: 'getSeasonScheduleGamesQuery',
        variables: {},
        query: `query getSeasonScheduleGamesQuery {
                    seasons: seasonsConnection(last: 1) {
                        nodes {
                            id
                            name
                            games: gamesConnection(first: 60) {
                                nodes {
                                    ...game
                                    __typename
                                }
                            }
                            __typename
                        }
                    }
                }

                ${fragments.gameOnGame}

                ${fragments.teamOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getGamesByDateRange = (dateRange, fn) => {
    let requestPayload = {
        operationName: 'getListOfGameQuery',
        variables: {
            'atOrAfterTime': dateRange.from,
            'beforeTime': dateRange.to,
            'first': 50
        },
        query: `query getListOfGameQuery($first: Int, $atOrAfterTime: DateTime!, $beforeTime: DateTime!) {
                    games: gamesConnection(first: $first, atOrAfterTime: $atOrAfterTime, beforeTime: $beforeTime) {
                        nodes {
                            ...game
                        }
                        __typename
                    }
                }

                ${fragments.gameOnGame}

                ${fragments.teamOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getLiveGamesByDateRange = (dateRange, fn) => {
    let requestPayload = {
        operationName: 'getListOfLiveGameQuery',
        variables: {
            atOrAfterTime: dateRange.from,
            beforeTime: dateRange.to
        },
        query: `query getListOfLiveGameQuery($beforeTime: DateTime!, $atOrAfterTime: DateTime!) {
                    games: gamesConnection(beforeTime: $beforeTime, atOrAfterTime: $atOrAfterTime, first: 50) {
                        nodes {
                            ...game
                        }
                        __typename
                    }
                }

                ${fragments.gameOnGame}

                ${fragments.teamOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getLiveGameData = (gameId, fn) => {
    let requestPayload = {
        operationName: 'getLiveGameDataQuery',
        variables: {
            gameId: gameId
        },
        query: `query getLiveGameDataQuery($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            ...game
                        }
                        __typename
                    }
                }

                ${fragments.gameOnGame}

                ${fragments.teamOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getFullGameStatsByPlayer = (gameId, fn) => {
    let requestPayload = {
        variables: {
            gameId: gameId
        },
        query: `query getFullGameStatsByPlayer($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            __typename
                            id
                            homeTeam {
                                ...teamIdNameAbbr
                            }
                            awayTeam {
                                ...teamIdNameAbbr
                            }
                            subseason
                            status {
                                homeTeamPoints
                                awayTeamPoints
                                phase
                            }
                            time
                            players: playersConnection(first: 500) {
                                edges {
                                    node {
                                        ...player
                                    }
                                    team {
                                        ...teamIdNameAbbr
                                    }
                                    stats {
                                        ...playerStats
                                    }
                                }
                            }
                        }
                    }
                }

                ${fragments.teamIdNameAbbrOnTeam}

                ${fragments.playerOnPlayer}

                ${fragments.playerStatsOnPlayerStats}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getFullGameStatsByTeam = (gameId, fn) => {
    let requestPayload = {
        variables: {
            gameId: gameId
        },
        query: `query getFullGameStatsByTeam($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            __typename
                            id
                            homeTeam {
                                ...teamIdNameAbbr
                            }
                            homeTeamEdge {
                                ...teamEdge
                            }
                            awayTeam {
                                ...teamIdNameAbbr
                            }
                            awayTeamEdge {
                                ...teamEdge
                            }
                            subseason
                            status {
                                homeTeamPoints
                                awayTeamPoints
                                phase
                            }
                            time
                        }
                    }
                }

                ${fragments.teamIdNameAbbrOnTeam}

                fragment teamEdge on GameTeamEdge {
                    stats {
                        gamesWon
                        gamesLost
                        gamesPlayed
                        points
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
                        averageTimeOfPossessionPerGameMilliseconds
                        timeOfPossessionMilliseconds
                        twoPointConversionsAttempted
                        twoPointConversionsCompleted
                        twoPointConversionCompletionPercentage
                        interceptionReturns
                    }
                }`
    };
    postRequest(requestPayload, fn);
};

aafApi.getFullSeasonStatsByTeam = (teamId, fn) => {
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
                    ...teamIdNameAbbr
                    seasonsConnection(last: 1) {
                        edges {
                            stats {
                                gamesWon
                                gamesLost
                                gamesPlayed
                                points
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
                                interceptionReturns
                            }
                        }
                    }
                    __typename
                }

                ${fragments.teamIdNameAbbrOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getFullSeasonStatsByTeamByPlayer = (teamId, fn) => {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getTeamPlayersSeasonStats($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamIdNameAbbr
                            seasonsConnection(last: 1) {
                                edges {
                                    stats {
                                        passingYardsGross
                                        passingYardsNet
                                        rushingYardsNet
                                        gamesWon
                                        gamesLost
                                        gamesPlayed
                                        __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                            players: playersConnection(first: 1000) {
                                nodes {
                                    ...player
                                    seasonsConnection(last: 1) {
                                        edges {
                                            stats {
                                                ...playerStats
                                                __typename
                                            }
                                            __typename
                                        }
                                        __typename
                                    }
                                    __typename
                                }
                                __typename
                            }
                            __typename
                        }
                        __typename
                    }
                }

                ${fragments.teamIdNameAbbrOnTeam}

                ${fragments.playerOnPlayer}

                ${fragments.playerStatsOnPlayerStats}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getPlayFeedByGame = (gameId, fn) => {
    let requestPayload = {
        variables: {
            gameId: gameId
        },
        query: `query getPlayFeedByGame($gameId: ID!) {
                    node(id: $gameId) {
                        ... on Game {
                            __typename
                            id
                            homeTeam {
                                ...teamIdNameAbbr
                            }
                            awayTeam {
                                ...teamIdNameAbbr
                            }
                            plays: playsConnection(first: 1000) {
                                nodes {
                                    ...liveGamePlayFragment
                                }
                            }
                            subseason
                            status {
                                homeTeamPoints
                                awayTeamPoints
                                phase
                            }
                            time
                        }
                    }
                }

                fragment liveGamePlayFragment on Play {
                    time
                    description
                    isComplete
                    down
                    yardsToGo
                    isConversion
                    gameClockSeconds
                    possession
                    quarter
                    yardLineTeam
                    yardLine
                    sequence
                    __typename
                }

                ${fragments.teamIdNameAbbrOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getTeams = (fn) => {
    let requestPayload = {
        operationName: 'getListOfTeamsQuery',
        variables: {},
        query: `query getListOfTeamsQuery {
                    teams: teamsConnection {
                        nodes {
                            ...team
                        }
                    }
                }

                ${fragments.teamOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getTeamInfoBasic = (teamId, fn) => {
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
                    }
                }

                fragment teamInformationFragment on Team {
                    ...team
                    facebookHandle
                    twitterHandle
                    instagramHandle
                    shopWebsiteURL
                    coach {
                        id
                        name {
                            givenName
                            familyName
                        }
                        title
                    }
                    stadium {
                        id
                        name
                    }
                    __typename
                }

                ${fragments.teamOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getTeamInfo = (teamId, fn) => {
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
                    ...team
                    facebookHandle
                    twitterHandle
                    instagramHandle
                    shopWebsiteURL
                    lightWordmark: wordmark(style: LIGHT_BACKGROUND) {
                        url
                    }
                    darkWordmark: wordmark(style: DARK_BACKGROUND) {
                        url
                    }
                    coach {
                        id
                        name {
                            givenName
                            familyName
                        }
                        title
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
                    games: gamesConnection {
                        edges {
                            node {
                                ...game
                            }
                        }
                    }
                    players: playersConnection(first: 500) {
                        edges {
                            node {
                                ...player
                            }
                        }
                    }
                    seasonStats: seasonsConnection(last: 1) {
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
                }

                ${fragments.teamOnTeam}

                ${fragments.gameOnGame}

                ${fragments.playerOnPlayer}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getGamesByTeam = (teamId, fn) => {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getGamesByTeam($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamInformationFragment
                            seasonRecord: seasonsConnection(last: 1) {
                                edges {
                                    stats {
                                        gamesWon
                                        gamesLost
                                        gamesPlayed
                                    }
                                }
                            }
                            __typename
                        }
                        __typename
                    }
                }

                fragment teamInformationFragment on Team {
                    ...teamIdNameAbbr
                    division {
                        name
                    }
                    games: gamesConnection {
                        edges {
                            node {
                                __typename
                                id
                                availability {
                                    shortName
                                    url
                                }
                                time
                                awayTeam {
                                    ...teamIdNameAbbr
                                }
                                homeTeam {
                                    ...teamIdNameAbbr
                                }
                                subseason
                                status {
                                    homeTeamPoints
                                    awayTeamPoints
                                    phase
                                }
                                stadium {
                                    id
                                    name
                                }
                            }
                        }
                    }
                    __typename
                }

                ${fragments.teamIdNameAbbrOnTeam}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getPlayersByTeam = (teamId, fn) => {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getPlayersByTeam($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamIdNameAbbr
                            ...teamInformationFragment
                            __typename
                        }
                        __typename
                    }
                }

                fragment teamInformationFragment on Team {
                    players: playersConnection(first: 500) {
                        edges {
                            node {
                                ...player
                            }
                        }
                    }
                    __typename
                }

                ${fragments.teamIdNameAbbrOnTeam}

                ${fragments.playerOnPlayer}`
    };
    postRequest(requestPayload, fn);
};

aafApi.getRosterByTeam = (teamId, fn) => {
    let requestPayload = {
        variables: {
            teamId: teamId
        },
        query: `query getTeamRosterListQuery($teamId: ID!) {
                    node(id: $teamId) {
                        ... on Team {
                            ...teamIdNameAbbr
                            offense: playersConnection(first: 100, platoon: OFFENSE) {
                                nodes {
                                    ...playerRosterFragment
                                    __typename
                                }
                            }
                            defense: playersConnection(first: 100, platoon: DEFENSE) {
                                nodes {
                                    ...playerRosterFragment
                                    __typename
                                }
                            }
                            specialTeams: playersConnection(first: 100, platoon: SPECIAL_TEAMS) {
                                nodes {
                                    ...playerRosterFragment
                                    __typename
                                }
                            }
                            coaches: coachesConnection(first: 200) {
                                nodes {
                                    ...coachRosterFragment
                                    __typename
                                }
                            }
                            __typename
                        }
                        __typename
                    }
                }

                fragment playerRosterFragment on Player {
                    ...player
                    school: schoolsConnection {
                        nodes {
                            ...schoolConnectionFragment
                            __typename
                        }
                    }
                    transactions: transactionsConnection(last: 1) {
                        nodes {
                            rosterStatus
                            __typename
                        }
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
                    avatar {
                        url
                    }
                    name {
                        familyName
                        givenName
                    }
                    title
                    __typename
                }

                ${fragments.playerOnPlayer}

                ${fragments.teamIdNameAbbrOnTeam}`
    };
    postRequest(requestPayload, fn);
};

module.exports = aafApi;
