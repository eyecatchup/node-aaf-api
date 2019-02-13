const aafApi = require('../');

let dateRange = {
    from: '2019-03-01T14:26:28.507Z',
    to: '2019-03-31T02:26:28.507Z'
};

aafApi.getLiveGamesByDateRange(dateRange, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.gamesConnection.nodes);
    }
});
