const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

let htmlPageNames = ['index', 'main', 'registration'];
let multipleHTMLPlugins = htmlPageNames.map(name => {
    return new HTMLWebpackPlugin({
        template: `./${name}.html`, // relative path to the HTML files
        filename: `${name}.html` // output HTML files
    })
});

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new CleanWebpackPlugin()
    ].concat(multipleHTMLPlugins),
    module:  {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    }
}