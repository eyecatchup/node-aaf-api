const aafApi = require('../');

// Get game ticker
let requestPayload = {
    query: '{node(id: "Gid2AorIFgJgIqqgIphAWXYkSJWF") { ... on Game {playsConnection(first: 1000) {nodes {description}}}}}'
};

// Get all Quarterbacks
// let requestPayload = {
//     query: '{teamsConnection {nodes {playersConnection(position: QUARTERBACK) {nodes {name {givenName familyName}}}}}}'
// };
aafApi.query(requestPayload, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data.node.playsConnection.nodes);
    }
});
