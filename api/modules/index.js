var apiModules = module.exports = (function() {
    return {
        authentication: require('./authentication'),
        schedule: require('./schedule'),
        team: require('./team')
    };
})();
