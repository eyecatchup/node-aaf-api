const aafApi = require('../');

let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';
aafApi.getFullGameStatsByPlayer(gameId, (error, response, body) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node.playersConnection.edges);
    }
});
