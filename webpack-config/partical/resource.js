module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|eot|woff|ttf|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash].[ext]',
                    publicPath: '/'
                }
            }
        ]
    }
}