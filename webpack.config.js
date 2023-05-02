const path = require('path');

module.exports = {
    entry: {
        index: ['./src/index.js'],
        engine: ['./src/Engine.js'],
        controller: ['./src/Controller.js']
    },
    output: {
        libraryTarget: 'module',
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js',
    },
    experiments: {
        outputModule: true
      },
    mode: 'development',
    watch: true

};
