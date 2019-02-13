const aafApi = require('../');

let dateRange = {
    from: '2019-02-10T23:00:00.000Z',
    to: '2019-03-31T22:59:59.999Z'
};
aafApi.getGamesByDateRange(dateRange, (error, response, body) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.gamesConnection.nodes);
    }
});
