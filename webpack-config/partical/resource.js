module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg|eot|woff|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash].[ext]',
                    publicPath: '/'
                }
            }
        ]
    }
}