const aafApi = require('../');

let gameId = 'GjoCxWXQfvKpZuFlqeOgB5I-ceJn';

aafApi.getPlayFeedByGame(gameId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.node.playsConnection.nodes);
    }
});
