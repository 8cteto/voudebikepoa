var packageJson = require('../package.json');

module.exports = {
	getAppVersion: function() {
		return packageJson['version'];
	}
};
