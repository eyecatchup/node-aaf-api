const aafApi = require('../');

let teamId = 'DKY1420EnDNa1FwBlyC8sAV_1ft6';

aafApi.getFullSeasonStatsByTeamByPlayer(teamId, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.node);
    }
});
