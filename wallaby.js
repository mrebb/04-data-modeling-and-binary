module.exports = function () {
  return {
    files: [
      'src/**/*.js',
      '!__test__/**/*.test.js',
      'assets/*.bmp',
      '*.js',
      'src/*.js',
    ],

    tests: [
      '__test__/**/*.test.js',
    ],

    testFramework: 'jest',
    env: {
      type: 'node',
    },
  };
};