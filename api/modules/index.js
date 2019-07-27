var apiModules = module.exports = (function() {
    return {
        authentication: require('./authentication'),
        lightningNode: require('./lightningNode'),
        payments: require('./payments'),
        schedule: require('./schedule'),
        team: require('./team')
    };
})();
