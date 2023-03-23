const path = require('path');

module.exports = {
    entry: {
        index: ['./src/index.js'],
        number: ['./src/number.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].js',
    },
    mode: 'development',
    watch: true

};
