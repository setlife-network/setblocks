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

    const fetchRepo = (params) => {
        return new Promise((resolve, reject) => {
            const octokit = new Octokit({
                auth: 'token ' + params.accessToken
            })

            const path = params.url.split('github.com/')[1]

            const owner = path.split('/')[0]
            const repo = path.split('/')[1]

            octokit.repos.get({ owner, repo })
            .then(results => {
                if (results.status == 200) {
                    console.log('results.data')
                    console.log(results.data)
                    resolve(results.data)
                } else {
                    reject('An error occurred')
                }
            })
            .catch(reject)
        })
    }

    const fetchUserData = (params) => {
        return new Promise((resolve, reject) => {
            const octokit = new Octokit({
                auth: 'token ' + params.accessToken
            })

            octokit.users.getAuthenticated({})
            .then(results => {
                if (results.status == 200) {
                    // console.log('results.data')
                    // console.log(results.data)
                    const { html_url, id, name } = results.data
                    resolve({
                        id,
                        name,
                        githubUrl: html_url
                    })
                } else {
                    reject('An error occurred')
                }
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
                resolve(response.access_token)
            })
        });
    };

    return {
        fetchAccessToken,
        fetchRepo,
        fetchUserData
    };

})();