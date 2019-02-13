const aafApi = require('../');

let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';
aafApi.getRosterByTeam(teamId, (error, response, body) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node);
    }
});
