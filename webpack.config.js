module.exports = {
    entry: [
        './app/operator_app.jsx'
    ],
    output: {
        path: './dist',
        filename: 'operator_app.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
