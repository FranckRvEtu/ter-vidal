const { removeModuleScopePlugin } = require('customize-cra');

module.exports = removeModuleScopePlugin();
module.exports = function override(config, env) {
    config.resolve.fallback = {
        fs: false
    };
    return config
};