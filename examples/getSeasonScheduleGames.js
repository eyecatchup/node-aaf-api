const aafApi = require('../');

aafApi.getSeasonScheduleGames((error, response, body) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.seasonsConnection.nodes[0].gamesConnection.nodes);
    }
});
