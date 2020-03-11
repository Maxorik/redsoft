const path = require('path')
const fs = require('fs') /////
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// Main const
const PATHS = {
    src: path.join(__dirname, '../src'),
    docs: path.join(__dirname, '../docs'),
    assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin 
const PAGES_DIR = `${PATHS.src}/pug/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    // BASE config
    externals:{
      paths: PATHS
    },
    entry:{
        app: PATHS.src
        // module: `${PATHS.src}/your-module.js`,
    },
    output:{
        filename:`${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.docs,
        publicPath: ''
    },
    optimization: { ////
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
    
    module:{
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                plugins: [
                    "@babel/plugin-syntax-dynamic-import"
                ]
            },
            exclude: '/node_modules/'
        },{
            test: /\.pug$/,
            loader: 'pug-loader'
        },
                
        {
            test: /\.(png|jpg|svg|gif|PNG)$/,
            loader: 'file-loader',
            options: {
                emitFile: true,
                name: 'assets/img/[name].[ext]'
            }
        },
                
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '../fonts/[name].[ext]'
            }
        },
            {
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'/*,
                    options:{ sourceMap: true }*/
                },
                {
                    loader: 'postcss-loader',
                    options:{ config: { path: `${PATHS.src}/js/postcss.config.js` } }
                }
            ]
        },{
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options:{ sourceMap: true }
                },
                {
                    loader: 'postcss-loader',
                    options:{ sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
                },
                {
                    loader: 'sass-loader',
                    options:{ sourceMap: true }
                }
            ]
        },{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loader: {
                    scss: 'vue-style-loader!css-loader!sass-loader'
                }
            }
        }
        ]
    },

    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    
    devServer: {
        historyApiFallback: true
    },
    
    
    plugins:[
        new MiniCssExtractPlugin({
            filename:`${PATHS.assets}css/[name].[hash].css`
        }),

	new VueLoaderPlugin(),
        
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/pug/index.pug`,
        }),
        
        new CopyWebpackPlugin([
            { from:`${PATHS.src}/img`, to:`${PATHS.assets}img` },
            { from:`${PATHS.src}/scss/fonts`, to:`${PATHS.assets}fonts` }
        ]),
        // Automatic creation any html pages (Don't forget to RERUN dev server)
        ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))
    ]
    
}