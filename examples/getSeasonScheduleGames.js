const aafApi = require('../');

aafApi.getSeasonScheduleGames((response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.seasonsConnection.nodes[0].gamesConnection.nodes);
    }
});
