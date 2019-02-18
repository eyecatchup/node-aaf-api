const aafApi = require('../');

aafApi.getSeasonScheduleGames((response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.seasons.nodes[0].games.nodes);
    }
});
