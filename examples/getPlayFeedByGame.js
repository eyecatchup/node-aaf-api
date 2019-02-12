const aafApi = require('../');

let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';
aafApi.getPlayFeedByGame(gameId, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node.playsConnection.nodes);
    }
});
