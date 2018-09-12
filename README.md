# react-wepack4-cli-xht
webpack今年推出的4这个版本就一直关注很学习它，webpack4这个版本借鉴了parcel的零配置，打包速度变得更快，值得大家去跟进学习。

既然我们已经迎接了webpack4的到来了，那么就一起来使用一下，即使你没用过之前的版本，没关系，我们重新出发，将工作中常用到的配置写给大家来看

## 安装webpack
> * 需要先在项目中npm init初始化一下，生成package.json
> * 建议node版本安装到8.2以上

```
// webpack4中除了正常安装webpack之外，需要再单独安一个webpack-cli
npm i webpack webpack-cli -D
```
##  webpack是基于Node的
在项目下创建一个webpack.config.js(默认，可修改)文件来配置webpack
```
module.exports = {
    entry: '',               // 入口文件
    output: {},              // 出口文件
    module: {},              // 处理对应模块
    plugins: [],             // 对应的插件
    devServer: {},           // 开发服务器配置
    mode: 'development'      // 模式配置
}
```
以上就是webpack的正常配置模块
 启动devServer需要安装一下webpack-dev-server
```
npm i webpack-dev-server -D
```
![image.png](https://upload-images.jianshu.io/upload_images/6264932-f51b36d7a734a253.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来我们按照项目的结构，我们就从0开始去写一下配置
```
// webpack.config.js

const path = require('path');

module.exports = {
    entry: './src/index.js',    // 入口文件
    output: {
        filename: 'bundle.js',      // 打包后的文件名称
        path: path.resolve('dist')  // 打包后的目录，必须是绝对路径
    }
}
```
上面就可以说是实现了最简单的webpack配置了，那接下来就打包一下看看

![image.png](https://upload-images.jianshu.io/upload_images/6264932-f94323b9ed1a5943.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##  配置执行文件
工作当中我们打包编译的时候一般都执行npm run dev这样的命令，既然是通过npm执行的命令，我们就应该找到package.json里的执行脚本去配置一下命令，这里如下图所示

![image.png](https://upload-images.jianshu.io/upload_images/6264932-86f7ff423fdbb03b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

npm run build就是我们打包后的文件，这是生产环境下，上线需要的文件

npm run dev是我们开发环境下打包的文件，当然由于devServer帮我们把文件放到内存中了，所以并不会输出打包后的dist文件夹

##  配置Html模板
文件都打包好了，但是我们在使用的时候不能在dist目录下去创建一个html文件，然后去引用打包后的js吧，这不合理，实际开发中也不会这样
我们需要实现html打包功能，可以通过一个模板实现打包出引用好路径的html来
这就需要用到一个常用的插件了，< html-webpack-plugin >，用之前我们来安一下它
```
npm i html-webpack-plugin -D
```
```
let path = require('path');
// 插件都是一个类，所以我们命名的时候尽量用大写开头
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: 'bundle.js',   
        path: path.resolve('dist')
    },
    plugins: [
        // 通过new一下这个类来使用插件
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            // 在src目录下创建一个index.html页面当做模板来用
            template: './src/index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
        })
    ]
}
```
通过上面的配置后，我们再npm run build打包看一下现在是个什么样子了
![image.png](https://upload-images.jianshu.io/upload_images/6264932-3c440205b9dea2db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
多页面开发，怎么配置多页面
如果开发的时候不只一个页面，我们需要配置多页面，那么需要怎么来搞呢？不用担心，html-webpack-plugin插件自有办法，我们来观望一下
```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 多页面开发，怎么配置多页面
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    // 出口文件  
    output: {                       
        filename: '[name].js',
        path: path.resolve('dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',   
            filename: 'index.html',
            chunks: ['index']   // 对应关系,index.js对应的是index.html
        }),
        new HtmlWebpackPlugin({
            template: './src/index2.html',
            filename: 'login.html',
            chunks: ['login']   // 对应关系,login.js对应的是login.html
        })
    ]
}
```
![image.png](https://upload-images.jianshu.io/upload_images/6264932-2ad680fc1b24fc7a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
上面基本介绍完了html和js的打包配置了，webpack对css的解析需要用到loader，所以我们先提前安装好，待会好方便使用

## 引用CSS文件
需要下载一些解析css样式的loader
```
npm i style-loader css-loader -D
// 引入less文件的话，也需要安装对应的loader
npm i less less-loader -D
npm i node-sass sass-loader -D
```
下面我们来看一下如何配置css文件的解析

```
// index.js
import './css/style.css';   // 引入css
import './less/style.less'; // 引入less

console.log('这里是打包文件入口-index.js');

// webpack.config.js
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,     // 解析css
                use: ['style-loader', 'css-loader'] // 从右向左解析
                /* 
                    也可以这样写，这种方式方便写一些配置参数
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'}
                    ]
                */
            }
        ]
    }
}
```
> * 此时打包后的css文件是以行内样式style的标签写进打包后的html页面中，如果样式很多的话，我们更希望直接用link的方式引入进去，这时候需要把css拆分出来
> * extract-text-webpack-plugin插件它的功效就在于会将打包到js里的css文件进行一个拆分,单独提取css

##  拆分CSS
```
// @next表示可以支持webpack4版本的插件
npm i extract-text-webpack-plugin@next -D
```
```
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module: {
        rules: [
            {
                test: /\.less$/,     // 解析less
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader'] // 从右向左解析
                })
            },
            {
                test: /\.scss$/,     // 解析scss
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader'] // 从右向左解析
                })
            },
            {
                test: /\.css$/,     // 解析css
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader']
                })
            }
        ]
    },
   plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css')  
    ]
```
![image.png](https://upload-images.jianshu.io/upload_images/6264932-bf81bbeb273aa625.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
另一个插件mini-css-extract-plugin也是可以办到的，它可以说是为webpack4而生的，
在这里就简单的提一下
```
npm i mini-css-extract-plugin -D
```
```
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/a.css'   // 指定打包后的css
        })
    ]
}
```
##  拆分成多个css
这里要着重说一下上面两个插件的区别了，个人还是建议用extract-text-webpack-plugin的，毕竟从之前的版本承接下来的，虽然在安包的时候需要@next，但是还是值得信赖的

而且现在的extract-text-webpack-plugin也支持了拆分成多个css，而目前mini-css-extract-plugin还不支持此功能
```
// 正常写入的less
let styleLess = new ExtractTextWebpackPlugin('css/style.css');
// reset
let resetCss = new ExtractTextWebpackPlugin('css/reset.css');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: resetCss.extract({
                    fallback: "style-loader",  
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: styleLess.extract({
                    fallback: "style-loader",
                     use: ['css-loader', 'less-loader'] // 从右向左解析
                })
            }
        ]
    },
    plugins: [
        styleLess,
        resetCss
    ]
}
```
通过这样操作后可以打包成两个不同的css文件，如下图
![image.png](https://upload-images.jianshu.io/upload_images/6264932-c47c2217efe46c35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##  引用图片
```
npm i file-loader url-loader -D
```
如果是在css文件里引入的如背景图之类的图片，就需要指定一下相对路径
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            }
        ]
    }
}
```
在css中指定了publicPath路径这样就可以根据相对路径引用到图片资源了，如下图所示

![image.png](https://upload-images.jianshu.io/upload_images/6264932-1bae64ee1ba78a33.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 页面img引用图片
页面中经常会用到img标签，img引用的图片地址也需要一个loader来帮我们处理好
```
npm i html-withimg-loader -D
```
```
  module.exports = {
    module: {
        rules: [
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }
        ]
    }
}
```
这样再打包后的html文件下img就可以正常引用图片路径了
![image.png](https://upload-images.jianshu.io/upload_images/6264932-7ef124c09a3594db.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 引用字体图片和svg图片
字体图标和svg图片都可以通过file-loader来解析
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            }
        ]
    }
}
```
这样即使样式中引入了这类格式的图标或者图片都没有问题了，img如果也引用svg格式的话，配合上面写好的html-withimg-loader就都没有问题了

## 添加CSS3前缀
通过postcss中的autoprefixer可以实现将CSS3中的一些需要兼容写法的属性添加响应的前缀，这样省去我们不少的时间

由于也是一个loader加载器，我们也需要先安装一下
```
npm i postcss-loader autoprefixer -D
```
安装后，我们还需要像webpack一样写一个config的配置文件，在项目根目录下创建一个postcss.config.js文件，配置如下：
```
module.exports = {
    plugins: [
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })
    ]
};
```
然后在webpack里配置postcss-loader
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,     // 解析less
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析
                })
            },
            {
                test: /\.scss$/,     // 解析scss
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'sass-loader'] // 从右向左解析
                })
            },
            {
                test: /\.css$/,     // 解析css
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
        ]
    }
}
```
## 转义ES6和react

在实际开发中，我们在大量的使用着ES6及之后的api去写代码，这样会提高我们写代码的速度，不过由于低版本浏览器的存在，不得不需要转换成兼容的代码，于是就有了常用的Babel了

Babel会将ES6的代码转成ES5的代码
```
npm i babel-core babel-loader babel-preset-env babel-preset-stage-3  babel-preset-react babel-polyfill babel-plugin-import babel-loader babel-register -D
babel-preset-stage-3  使用这个插件来编译为了后面使用...state扩展运算符可以使用
```
当把这些都安好后，我们就开始配置，由于要兼容的代码不仅仅包含ES6还有之后的版本和那些仅仅是草案的内容，所以我们可以通过一个.babelrc文件来配置一下，对这些版本的支持
```
// .babelrc
{
    "presets": [
        [
            "env",
            {
                "loose": true,  
                "modules": false 
            }
        ],
        "es2015",
        "react",
      "babel-preset-stage-3"
    ]
}
```
我们再在webpack里配置一下babel-loader既可以做到代码转成ES5了
```
module.exports = {
    module: {
        rules: [
            {
                test:/\.js$/,
                use: 'babel-loader',
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }
        ]
    }
}
```
呀呀呀，在我们每次npm run build的时候都会在dist目录下创建很多打好的包，如果积累过多可能也会混乱

所以应该在每次打包之前将dist目录下的文件都清空，然后再把打好包的文件放进去，主人们，接下来我们使用clean-webpack-plugin这个插件吧
```
npm i clean-webpack-plugin -D
```
```
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        // 打包前先清空
        new CleanWebpackPlugin('dist')  
    ]
}
```
## resolve解析
```
 resolve: {
        // 别名
        alias: {
          pages:path.join(__dirname,'src/pages'),
          component:path.join(__dirname,'src/component'),
          actions:path.join(__dirname,'src/redux/actions'),
          reducers:path.join(__dirname,'src/redux/reducers'),
        },
        // 省略后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less']
    }
```
## 提取公共代码
在webpack4之前，提取公共代码都是通过一个叫CommonsChunkPlugin的插件来办到的。到了4以后，内置了一个一模一样的功能  optimization

下面我们就来看看如何提取公共代码
```
optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: {
                    // 抽离自己写的公共代码，utils里面是一个公共类库
                    chunks: 'initial',
                    name: 'utils',  //  任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    },
还要在plugins里面引入需要单独打包出来的chunk
      new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['vendor', 'index', 'utils']  //  引入需要的chunk   
        }),
```
![image.png](https://upload-images.jianshu.io/upload_images/6264932-b6fd0e75361599f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
##   webpack-dev-server
简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。
```
npm install webpack-dev-server --save-dev
npm install webpack-dev-server -g
```
```
 devServer: {
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true
    },
```
## devtool优化
现在我们发现一个问题，代码哪里写错了，浏览器报错只报在build.js第几行。这让我们排查错误无从下手，[传送门](https://doc.webpack-china.org/configuration/devtool)。
在开发环境下配置
```
devtool: 'inline-source-map'
```
同时，我们在srouce里面能看到我们写的代码，也能打断点调试代码

##  热更新和自动刷新的区别
在配置devServer的时候，如果hot为true，就代表开启了热更新，但是这并没有那么简单，因为热更新还需要配置一个webpack自带的插件并且还要在主要js文件里检查是否有module.hot
```
// webpack.config.js
let webpack = require('webpack');
module.exports = {
    plugins: [
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,  //  加上这一行
    }
}

//  在入口文件index.js
// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
```
热更新的好处在开发vue或者react的时候，其中某个组件修改的时候就会针对这个组件进行更新，超级好用，提升开发效率

##  集成react-router
```
`npm install --save react-router-dom`
```
新建router文件夹和组件
```
`cd src`
`mkdir router && touch router/router.js`
```
按照`react-router`[文档](http://reacttraining.cn/web/guides/quick-start)编辑一个最基本的`router.js`。包含两个页面`home`和`page1`。
`  src/router/router.js`
```
import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Home from '../pages/Home/Home';
import Page1 from '../pages/Page1/Page1';


const getRouter = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1" component={Page1}/>
            </Switch>
        </div>
    </Router>
);
export default getRouter;
```
新建页面文件夹
```
cd src
mkdir pages
```
新建两个页面 Home,Page1
```
cd src/pages
mkdir Home && touch Home/Home.js
mkdir Page1 && touch Page1/Page1.js
```
`src/pages/Home/Home.js`
```
import React, {Component} from 'react';

export default class Home extends Component {
    render() {
        return (
            <div>
                this is home ~hi xht
            </div>
        )
    }
}
```
`Page1.js`
```
import React, {Component} from 'react';

export default class Page1 extends Component {
    render() {
        return (
            <div>
                this is Page1~hi xht
            </div>
        )
    }
}
```
现在路由和页面建好了，我们在入口文件src/index.js引用Router。
修改`src/index.js`
```
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from './router/router';

ReactDom.render(
    getRouter(), document.getElementById('root'));
```
现在执行打包命令npm run dev。打开index.html查看效果啦！

##  集成react-redux
接下来，我们就要就要就要集成redux了。
要对`redux`有一个大概的认识，可以阅读阮一峰前辈的[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

如果要对`redux`有一个非常详细的认识，我推荐阅读[中文文档](http://cn.redux.js.org/index.html)，写的非常好。读了这个教程，有一个非常深刻的感觉，`redux`并没有任何魔法。
我们就做一个最简单的计数器。自增，自减，重置。
先安装redux 
```
`npm install --save redux`
```
初始化目录结构
```
cd src
mkdir redux
cd redux
mkdir actions
mkdir reducers
touch reducers.js
touch store.js
touch actions/couter.js
touch reducers/couter.js
```
先来写action创建函数。通过action创建函数，可以创建action
`src/redux/actions/counter.js`
```
/*action*/

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export function increment() {
    return {type: INCREMENT}
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}
```
再来写reducer,reducer是一个纯函数，接收action和旧的state,生成新的state.
`src/redux/reducers/couter.js`
```
import { INCREMENT, DECREMENT, RESET } from '../actions/couters';

/*
* 初始化state
*/
const initState = {
  count: 0,
};

/*
* reducer
*/
export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        count: state.count - 1,
      };
    case RESET:
      return { count: 0 };
    default:
      return state;
  }
}
```
一个项目有很多的reducers,我们要把他们整合到一起
`src/redux/reducers.js`
```
import counter from './reducers/couter';

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}
```
reducer就是纯函数，接收state 和 action，然后返回一个新的 state。
看上面的代码，无论是combineReducers函数也好，还是reducer函数也好，都是接收state和action，
返回更新后的state。区别就是combineReducers函数是处理整棵树，reducer函数是处理树的某一点。
接下来，我们要创建一个store。

前面我们可以使用 action 来描述“发生了什么”，使用action创建函数来返回action。

还可以使用 reducers 来根据 action 更新 state 。

那我们如何提交action？提交的时候，怎么才能触发reducers呢？

store 就是把它们联系到一起的对象。store 有以下职责：

维持应用的 state；
> * 提供 getState() 方法获取 state；
> * 提供 dispatch(action) 触发reducers方法更新 state；
> * 通过subscribe(listener) 注册监听器;
> * 通过 subscribe(listener) 返回的函数注销监听器。

`src/redux/store.js`
```
import {createStore} from 'redux';
import combineReducers from './reducers.js';
let store = createStore(combineReducers);
export default store;
```
写一个Counter页面
```
cd src/pages
mkdir Counter
touch Counter/Counter.js
```
`src/pages/Counter/Counter.js`
```
import React, {Component} from 'react';

export default class Counter extends Component {
    render() {
        return (
            <div>
                <div>当前计数为(显示redux计数)</div>
                <button onClick={() => {
                    console.log('调用自增函数');
                }}>自增
                </button>
                <button onClick={() => {
                    console.log('调用自减函数');
                }}>自减
                </button>
                <button onClick={() => {
                    console.log('调用重置函数');
                }}>重置
                </button>
            </div>
        )
    }
}
```
修改路由，增加Counter
`src/router/router.js`
```
import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';

const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/page1">Page1</Link>
        </li>
        <li>
          <Link to="/couter">Counter</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/couter" component={Counter} />
      </Switch>
    </div>
  </Router>
);

export default getRouter;
```
npm run dev 看看效果。
下一步，我们让Counter组件和`react-redux`联合起来。使Counter能获得到Redux的state，并且能发射action。
先来安装react-redux
```
npm install --save react-redux
```
`src/pages/Counter/Counter.js`
```
import React, { Component } from 'react';
import { increment, decrement, reset } from 'actions/couters';

import { connect } from 'react-redux';

class Counter extends Component {
  render() {
    const {
      counter: { count },
      increment,
      decrement,
      reset,
    } = this.props;
    return (
      <div>
        <div>
          当前计数为:
          {count}
        </div>
        <button onClick={() => increment()}>自增</button>
        <button onClick={() => decrement()}>自减</button>
        <button onClick={() => reset()}>重置</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.couter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch(increment());
    },
    decrement: () => {
      dispatch(decrement());
    },
    reset: () => {
      dispatch(reset());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```
下面我们要传入store
>所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 store 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。

>建议的方式是使用指定的 React Redux 组件 来 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可。

`src/index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index';
import { Provider } from 'react-redux';
import getRouter from './router/router';
import store from './redux/store';

const router = getRouter();

/* 初始化 */
renderWithHotReload(router);

function renderWithHotReload(RootElement) {
  ReactDOM.render(
    <Provider store={store}>{RootElement}</Provider>,
    document.getElementById('root')
  );
}

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
```
我们在说清楚一下
1.`Provider`组件是让所有的组件可以访问到store。不用手动去传。也不用手动去监听。
2.`connect`函数作用是从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。也传递dispatch(action)函数到props。
##  引入异步action,集成redux-thunk
下面，我们以向后台请求用户基本信息为例。
1.我们先创建一个user.json，等会请求用，相当于后台的API接口。
```
在根目录
mkdir api
cd api
touch user.json
```
`user.json`
```
{
  "name": "xiehaitao",
  "intro": "please give me a star"
}
```
2.创建必须的action创建函数。
```
cd src/redux/actions
touch userInfo.js
```
`src/redux/actions/userInfo.js`
```
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "GET_USER_INFO_FAIL";

function getUserInfoRequest() {
    return {
        type: GET_USER_INFO_REQUEST
    }
}

function getUserInfoSuccess(userInfo) {
    return {
        type: GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}

function getUserInfoFail() {
    return {
        type: GET_USER_INFO_FAIL
    }
}
```
我们创建了请求中，请求成功，请求失败三个action创建函数。
3.创建reducer
```
cd src/redux/reducers
touch userInfo.js
```
`src/redux/reducers/userInfo.js`
```
import { GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL } from 'actions/userInfo';

const initState = {
  isLoading: false,
  userInfo: {},
  errorMsg: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        userInfo: {},
        errorMsg: '',
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.userInfo,
        errorMsg: '',
      };
    case GET_USER_INFO_FAIL:
      return {
        ...state,
        isLoading: false,
        userInfo: {},
        errorMsg: '请求错误',
      };
    default:
      return state;
  }
}
```
组合reducer
`src/redux/reducers.js`
```
import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';

export default function combineReducers(state = {}, action) {
    return {
        couter: couter(state.couter, action),
        userInfo: userInfo(state.userInfo, action)
    }
}
```
4.现在有了action，有了reducer，我们就需要调用把action里面的三个action函数和网络请求结合起来。
`src/redux/actions/userInfo.js增加`
```
export function getUserInfo() {
  return function (dispatch) {
    dispatch(getUserInfoRequest());

    return fetch('/api/user.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(getUserInfoSuccess(json));
      })
      .catch(() => {
        dispatch(getUserInfoFail());
      });
  };
}
```
我们这里发现，别的action创建函数都是返回action对象：
但是我们现在的这个action创建函数 getUserInfo则是返回函数了。
为了让action创建函数除了返回action对象外，还可以返回函数，我们需要引用redux-thunk。
```
npm install --save redux-thunk
```
简单的说，中间件就是action在到达reducer，先经过中间件处理。我们之前知道reducer能处理的action只有这样的{type:xxx}，所以我们使用中间件来处理
函数形式的action，把他们转为标准的action给reducer。这是redux-thunk的作用。
使用redux-thunk中间件
`src/redux/store.js`
```
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers';

const store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

export default store;

```
到这里，redux-thunk已经配置完成了，写一个组件来验证一下
```
cd src/pages
mkdir UserInfo
cd UserInfo
touch UserInfo.js
```
`src/pages/UserInfo/UserInfo.js`
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from 'actions/userInfo';

class UserInfo extends Component {
  render() {
    const {
      userInfo: { userInfo, isLoading, errorMsg },
      getUserInfo,
    } = this.props;
    return (
      <div>
        {isLoading
          ? '请求信息中......'
          : errorMsg || (
          <div>
            <p>用户信息：</p>
            <p>
                  用户名：
              {userInfo.name}
            </p>
            <p>
                  介绍：
              {userInfo.intro}
            </p>
          </div>
          )}
        <button onClick={() => getUserInfo()}>请求用户信息</button>
      </div>
    );
  }
}

export default connect(
  state => ({ userInfo: state.userInfo }),
  { getUserInfo }
)(UserInfo);

```
增加路由
`src/router/router.js`
```
import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from 'pages/Home/Home';
import Page1 from 'pages/Page1/Page1';
import Counter from 'pages/Counter/Counter';
import UserInfo from 'pages/UserInfo/UserInfo';

const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/page1">Page1</Link>
        </li>
        <li>
          <Link to="/couter">Counter</Link>
        </li>
        <li>
          <Link to="/userinfo">UserInfo</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page1" component={Page1} />
        <Route path="/couter" component={Counter} />
        <Route path="/userinfo" component={UserInfo} />
      </Switch>
    </div>
  </Router>
);

export default getRouter;

```
![image.png](https://upload-images.jianshu.io/upload_images/6264932-7bd7fdda29d5c564.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## combinReducers优化
redux提供了一个combineReducers函数来合并reducer，不用自己合并
`src/redux/reducers.js`
```
import { combineReducers } from 'redux';
import userInfo from 'reducers/userInfo';
import couter from './reducers/couters';

export default combineReducers({
  couter,
  userInfo,
});

```

##  指定环境
在webpack4之前都是需要建三个文件来需要环境的，webpack.base.js,webpack.dev.js,webpack.prod.js,现在在webpack4之后就不需要了，因为用--mode  就可以区分环境了
先安装  
```
npm install -D yargs-parser
```
```
这个包可以拿到--mode 里面的参数，这样子就可以区别是本地环境还是线上环境了
    "dev": "cross-env webpack-dev-server --mode development",
    "build": "npm run lint && cross-env npm run clean && webpack --mode production",
```
```
//  webpack.config.js
const argv = require('yargs-parser')(process.argv.slice(2));
const pro = argv.mode == 'production' ? true : false;  //  区别是生产环境和开发环境

let plu = [];
if (pro) {
    //  线上环境
    plu.push(
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true, // 会在打包好的bundle.js后面加上hash串
            chunks: ['vendor', 'index', 'utils']  //  引入需要的chunk
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.[chunkhash].css'),
        new ExtractTextWebpackPlugin('css/reset.[chunkhash].css'),
        new CleanWebpackPlugin('dist'),
    )
} else {
    //  开发环境
    plu.push(
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['vendor', 'index', 'utils']  //  引入需要的chunk
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css'),
        new ExtractTextWebpackPlugin('css/reset.css'),
        new webpack.HotModuleReplacementPlugin(),  // 热更新，热更新不是刷新
    )
}

devtool: pro ? '' : 'inline-source-map'  //  只有本地开发才需要调试

```

##  集成eslint
eslint目标是以可扩展，每条规则独立，不内置编码风格为理念的lint工具，用户可以定制自己的规则做成公共包

eslint主要有以下特点：

1）默认规则包含所有的jslint，jshint中存在的规则易迁移

2）规则可配置性高，可设置警告，错误两个error等级，也可以直接禁用

3）包含代码风格检测的规则

4）支持插件扩展，自定义规则

针对react开发者，eslint已经可以很好的支持jsx语法了。
先安装插件
```
npm install -D eslint eslint-config-airbnb eslint-loader  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```
配置.eslintrc文件
```
// 直接继承airbnb的配置规则，同时也可以写入自己的特定规则，后面的内容会覆盖默认的规则，
//  下面是我比较习惯的lint规则
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jest": true,
    "jasmine": true
  },
  "rules": {
    "no-plusplus": [0],
    "eqeqeq": [0],
    "no-empty": [0],
    "no-param-reassign": [0],
    "generator-star-spacing": [0],
    "consistent-return": [0],
    "no-shadow": [0],
    "react/forbid-prop-types": [0],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js"]
      }
    ],
    "react/button-has-type": [
      "<enabled>",
      {
        "button": false,
        "submit": false,
        "reset": false
      }
    ],
    "global-require": [1],
    "import/prefer-default-export": [0],
    "react/jsx-boolean-value": [0],
    "react/jsx-no-bind": [0],
    "react/prop-types": [0],
    "react/prefer-stateless-function": [0],
    "react/jsx-one-expression-per-line": [0],
    "react/jsx-wrap-multilines": [
      "error",
      {
        "no-empty": [0],
        "no-param-reassign": [0],
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "ignore"
      }
    ],
    "no-else-return": [0],
    "no-restricted-syntax": [0],
    "import/no-extraneous-dependencies": [0],
    "no-use-before-define": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/anchor-is-valid": [0],
    "no-nested-ternary": [0],
    "arrow-body-style": [0],
    "import/extensions": [0],
    "no-bitwise": [0],
    "no-cond-assign": [0],
    "import/no-unresolved": [0],
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "ignore"
      }
    ],
    "object-curly-newline": [0],
    "function-paren-newline": [0],
    "no-restricted-globals": [0],
    "require-yield": [1]
  },
  "globals": {
    "document": true,
    "localStorage": true,
    "window": true
  }
}

```
除此之外还要在webpack.config.js文件增加module的loader
```
module: {
        rules: [
            {
                enforce: "pre",  //  代表在解析loader之前就先解析eslint-loader
                test: /\.js$/,
                exclude: /node_modules/,
                include:/src/,
                loader: "eslint-loader",
              },
          ]
}
```
在`pagekage.json`文件里面script增加
```
    "lint": "npm run format && npm run fix &&  eslint --ext .js src",  //  检测你写的代码是否符合eslint的规则
    "fix": "npm run format && eslint --fix --ext .js src",  //  npm run fix 这个是可以修复你没有按照lint规则的写法
```
## 自动格式化以及提交代码时的优化配置
###第一步 格式化所有代码 prettier
```
npm install -D prettier
```
在package.json的script里面添加如下配置
```
{
  "scripts": {
    "format": "prettier --single-quote --trailing-comma es5 --write \"src/**/*.js\""
  }
}
```
你可以通过 npm run format试一下是否可以自动格式化你的代码
第二步 配置Eslint
上面我们已经配置好eslint了在package.json的scripts里添加如下
```
"fix": "npm run format && eslint --fix --ext .js src",
```
第三步 添加Git钩子(Pre-commit Hook)
>Git 钩子(hooks)是在Git 仓库中特定事件(certain points)触发后被调用的脚本。 详情可浏览 [https://git-scm.com/book/zh/v2/自定义-Git-Git-钩子](https://link.zhihu.com/?target=https%3A//git-scm.com/book/zh/v2/%25E8%2587%25AA%25E5%25AE%259A%25E4%25B9%2589-Git-Git-%25E9%2592%25A9%25E5%25AD%2590)
每次提交代码，执行 `git commit`之后进行自动格式化，免去每次人为手动格式化，使远程仓库代码保持风格统一。
```
npm install -D lint-staged husky 
```
在package.json的scripts里添加如下
```
   "precommit": "npm run lint",
```
现在让我们来看看在package.json的scripts的所有配置吧
```
  "scripts": {
    "dev": "cross-env webpack-dev-server --mode development",
    "build": "npm run lint && cross-env npm run clean && webpack --mode production",
    "precommit": "npm run lint",
    "clean": "cross-env rm -rf dist && mkdir dist",
    "test": "mocha --compilers js:babel-register --require ./test/test_helper.js --recursive",
    "test:watch": "npm run test --watch",
    "lint": "npm run format && npm run fix &&  eslint --ext .js src",
    "fix": "npm run format && eslint --fix --ext .js src",
    "format": "prettier --single-quote --trailing-comma es5 --write \"src/**/*.js\""
  },
```





