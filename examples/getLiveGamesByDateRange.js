const aafApi = require('../');

let dateRange = {
    from: '2019-03-01T14:26:28.507Z',
    to: '2019-03-31T02:26:28.507Z'
};
aafApi.getLiveGamesByDateRange(dateRange, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.gamesConnection.nodes);
    }
});
