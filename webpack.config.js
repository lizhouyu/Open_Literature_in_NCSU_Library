const path=require('path'); 
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports={
    entry:{
        'src/js/background': path.resolve(__dirname, 'src/js/background.js'),
        'src/js/content': path.resolve(__dirname, 'src/js/content.js'),
    },
    output:{
        filename:'[name].js',   
        path: path.resolve(__dirname, 'dist') 
    },
    mode:"none",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: 'manifest.json',},
                {from: './images', to: path.resolve(__dirname, 'dist/images')},
            ],
          }),
    ],
}