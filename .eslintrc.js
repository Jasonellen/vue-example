// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  'extends': 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
	"globals": {
	 	"process": true
	},
  // add your custom rules here
  'rules': {
		'indent': ['error', 'tab'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    'no-tabs': 0,
    'no-unused-vars': 1,
		'eqeqeq': 0,
		'no-new': 0,
		'import/first':0
  }
}
