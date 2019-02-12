const aafApi = require('../');

aafApi.getTeams(function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.teamsConnection.nodes);
    }
});