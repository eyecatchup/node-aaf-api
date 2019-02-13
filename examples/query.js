const aafApi = require('../');

// Get all Quarterbacks, grouped by team
let requestPayload = {
    query: `{
              teamsConnection {
                nodes {
                  id
                  name
                  abbreviation
                  playersConnection(position: QUARTERBACK) {
                    nodes {
                      id
                      name {
                        givenName
                        familyName
                      }
                    }
                  }
                }
              }
            }`
};

aafApi.query(requestPayload, (response) => {
    if (response.status === 'error') {
        throw new Error(response.data);
    } else {
        console.log(response.data.teamsConnection.nodes);
    }
});
