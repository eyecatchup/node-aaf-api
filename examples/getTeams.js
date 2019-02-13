const aafApi = require('../');

aafApi.getTeams((response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.teamsConnection.nodes);
    }
});
