const aafApi = require('../');

let dateRange = {
    from: '2019-02-10T23:00:00.000Z',
    to: '2019-03-31T22:59:59.999Z'
};

aafApi.getGamesByDateRange(dateRange, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.gamesConnection.nodes);
    }
});
