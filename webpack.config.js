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
    watch: true,
    devServer: {
        static: './public',  // Serve files from 'dist' folder
        hot: true,         // Enable Hot Module Replacement (HMR)
        liveReload: true,  // Reload page when files change
        port: 3000,        // Run on http://localhost:3000
        open: true         // Open browser automatically
      }

};
