const aafApi = require('../');

// Get game ticker
let requestPayload = {
    query: `{
      node(id: "Gjm5E9bwm9-ZIwVYJqIG6cvI2Ner") {
        ... on Game {
          homeTeamEdge {
            ...teamEdge
          }
          awayTeamEdge {
            ...teamEdge
          }
        }
      }
    }

    fragment teamEdge on GameTeamEdge {
      stats {
        passingPlays
        rushingPlays
      }
    }`
};

// Get all Quarterbacks
// let requestPayload = {
//     query: '{teamsConnection {nodes {playersConnection(position: QUARTERBACK) {nodes {name {givenName familyName}}}}}}'
// };
aafApi.query(requestPayload, function(error, response, body) {
    if (error) {
        throw new Error(error);
    } else {
        console.log(body.data);
    }
});
