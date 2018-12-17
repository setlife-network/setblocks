var apiModules = module.exports = (function() {
    return {
        schedules: require('./schedule'),
        team: require('./team')
    };
})();
