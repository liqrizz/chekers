var path = require('path');
module.exports = {
    entry: './devfile/app.js',
    output: {
      filename: 'bundle.app.js',
        path: path.resolve(__dirname, 'src'),
        publicPath: 'src/'
    },
    devServer: {
    	overlay: true
    },
    module: {
    	rules: [
    		{
    			test: /\.js$/,
    			loader: 'babel-loader'
    		}
    	]
    },
    watch: true
};