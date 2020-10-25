const path=require("path");
const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const {CleanWebpackPlugin}=require("clean-webpack-plugin");

module.exports={
	//mode:"development",
	entry:{
		main:"./src/index.js"
	},
	output:{
		filename:"[name].bundle.js",
		path:path.resolve(__dirname,"dist")
	},
	devtool:"source-map",
	resolve:{
		alias:{
			"vue$":"vue/dist/vue.esm.js"
		}
	},
	devServer:{
		contentBase:"./dist"
	},
	plugins:[
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template:"./src/index.html"
		})
	],
	module:{
		rules:[
			{
				test:/\.less$/,
				use:["style-loader","css-loader","less-loader"]
			},
			{
				test:/\.vue$/,
				loader:"vue-loader",
				options:{
					loaders:{
						"less":["style-loader","css-loader","less-loader"]
					}
				}
			}
		]
	}
};
