const _ = require('lodash');
const moment = require('moment');

const authentication = module.exports = (function() {

    const { User } = require('../models')

    const checkUserSession = (params) => {
        return new Promise((resolve, reject) => {

            getSession(params)
            .then(user => {
                if (user != null) {
                    console.log('user')
                    console.log(user)
                    resolve(user);
                } else {
                    params.req.session.setblocksUser = null
                    throw 'User has no session'
                }
            })
            .catch(reject)
        })
    }

    const createUser = (params) => {
        return new Promise((resolve, reject) => {
            User
            .forge({
                email: params.email || null,
                github_id: params.githubId || null
            })
            .save()
            .then(resolve)
            .catch(reject);
        });
    };

    const getsertUserByGithubId = (params) => {
        return new Promise((resolve, reject) => {
            User
            .where({ github_id: params.githubId })
            .fetch()
            .then(user => {
                if (user != null) {
                    return user;
                } else {
                    return createUser(params);
                }
            })
            .then(resolve)
            .catch(reject);
        });
    };

    const getSession = (params) => {

        return new Promise((resolve, reject) => {

            if (params.req.session.setblocksUser) {
                // User
                // .where({ id: params.req.session.setblocksUser })
                // .fetch()
                // .then(resolve)
                // .catch(reject);
                const github = require('../handlers/github')

                github.fetchUserData({ accessToken: params.req.session.setblocksUser })
                .then(userData => {
                    console.log('userData')
                    console.log(userData)
                    resolve(userData)
                })
                .catch(reject)

            } else {
                resolve();
            }
        });
    };

    const loginWithGithub = (params) => {
        return new Promise((resolve, reject) => {
            getSession(params)
            .then(user => {
                if (user) {
                    return user
                } else {
                    return getsertUserByGithubId(params)
                }
            })
            .then(user => {
                params.userId = user.id
                params.req.session.setblocksUser = user.id
                return user
            })
            .then(resolve)
            .catch(reject)
        });
    };

    const logoutUser = (params) => {
        return new Promise((resolve, reject) => {
            params.req.session.setblocksUser = null;
            resolve('Logged out of Setblocks');
        });
    };

    return {
        checkUserSession,
        loginWithGithub,
        logoutUser
    };
})();