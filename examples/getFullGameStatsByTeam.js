const aafApi = require('../');

let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getFullGameStatsByTeam(gameId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.node);
    }
});
