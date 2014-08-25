var packageJson = require('../package.json');

module.exports = {
	getAppVersion: function() {
		return packageJson['version'];
	},

	getSourceCodeURL: function() {
		return 'https://github.com/umovers/voudebike';
	},

	getContributorsURL: function() {
		return 'https://github.com/umovers/voudebike/graphs/contributors';
	}
};
