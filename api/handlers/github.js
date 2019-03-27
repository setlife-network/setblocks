const request = require('request-promise');
const Octokit = require('@octokit/rest')

const { GITHUB } = require('../config/credentials')
const { GITHUB_OAUTH_URL } = require('../config/constants')

const json = request.defaults({
    json: true
});

const github = module.exports = (function () {
    // const gh = new GitHubApi()
    // const octokit = new Octokit({
    //     auth: undefined,
    // })

    const fetchUserData = (params) => {
        return new Promise((resolve, reject) => {
            const octokit = new Octokit({
                auth: params.accessToken
            })

            octokit.repos.list()
            .then(results => {
                console.log('results')
                console.log(results)
            })
        })
    }

    const fetchAccessToken = (params) => {
        return new Promise((resolve, reject) => {
            json({
                method: 'POST',
                url: `${GITHUB_OAUTH_URL}?client_id=${GITHUB.CLIENT_ID}&client_secret=${GITHUB.CLIENT_SECRET}&code=${params.code}`
            })
            .then(response => {
                console.log('response')
                console.log(response)
                resolve(response.access_token)
            })
        });
    };

    return {
        fetchAccessToken,
        fetchUserData
    };

})();