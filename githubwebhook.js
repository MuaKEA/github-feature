const express = require('express');
const app = express();
app.use(express.json());

    //  set the headers
const headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
};
    //set the options
const options = {
    url: 'https://slack.com/api/chat.postMessage',
    method: 'POST',
    headers: headers,
    form: {
        'token': 'xoxp-2773101897-731794854357-735356593506-a1811d4d0dc2e50888a79f442a6968ea',
        'channel': 'interns-cph',
        "as_user": "true",
        "text": null
    }

};

app.post('/TeamThreeStar', function (request,response) {

    response.json(response.statusCode(200));

    if (publicORPrivateChecker(request.body) ||  nameRequirementsChecker(request.body)) {

    }

});
module.exports = app;


function SendApiRequest(errormessage) {
    // this functions prepares the post request and then sends it at the button at this function,
    var request = require('request');
    options["form"]["text"] = errormessage;

    // Start the request and checks for status codes
    request(options, function (error, response, body) {

        if (!error && response.statusCode === 200 && body != null ) {
        }
    });


}

    /* this functions checks if the name of the repository is a valid name declared
       by the nodes repository naming conventions project-platform */
function nameRequirementsChecker(repo) {
    const repositoryInfo = repo["repository"];
    const repositoryCommitInfo = repo["commits"];


    // different platforms which nodes has
    const platforms = ["ios", "android", "swift", "vapor", "mac"];
    // splits the whole string into repository name and platforms by the hyphen
    const platformMatch = repositoryInfo["name"].split("-");
    const isPlatformFormatValid = platforms.indexOf(platformMatch[1]);
    const isNameValid =repositoryInfo["name"].match(/-/g) ;


    var testResult = false;

    if (isNameValid.length !==1) {
        //checks if the repo name is in a va snake case
        testResult = true;

    } else if (isPlatformFormatValid === -1 || repositoryInfo["name"].match(/^[A-Z]/g)) {

        // checks if the repo name is a in a valid category and if the repository whole name is written in lowercase
        testResult = true;
    }
    if (testResult) {
        SendApiRequest("The Repository [" + repositoryInfo["name"] + "] does not meet the naming requirements of nodes"
            + "\nCommitter: " + repositoryCommitInfo[0]["committer"]["username"]+
            "\n*Github link:* " + repositoryInfo["url"])
    }
}


/**
 * @return {boolean}
 */

function publicORPrivateChecker(repo) {
    const repositoryInfo = repo["repository"];
    const repositoryCommitInfo = repo["commits"];


    if (repo["private"] === false) {

        SendApiRequest( "The Repository " + repositoryInfo["name"] + " is not private!!"
            + "\nCommitter: " + repositoryCommitInfo[0]["username"] + "\n *Github link*: " + repositoryInfo["url"]);

        return true
    }
    return false

}


