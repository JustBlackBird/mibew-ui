module.exports = {
    entry: [
        './src/operator_app.jsx'
    ],
    output: {
        path: './dist',
        filename: 'operator_app.bundle.js',
        publicPath: '/',
        library: 'OperatorApp'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
