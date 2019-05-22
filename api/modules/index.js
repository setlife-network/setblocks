var apiModules = module.exports = (function() {
    return {
        authentication: require('./authentication'),
        payments: require('./payments'),
        schedule: require('./schedule'),
        team: require('./team')
    };
})();
