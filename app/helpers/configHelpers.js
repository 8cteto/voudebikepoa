var packageJson = require('../../package.json');

module.exports = {
	getAppVersion: function() {
		return packageJson['version'];
	},

	getSourceCodeURL: function() {
		return 'https://github.com/8cteto/voudebikepoa';
	},

	getContributorsURL: function() {
		return 'https://github.com/8cteto/voudebikepoa/graphs/contributors';
	}
};
