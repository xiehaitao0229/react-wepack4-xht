import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import "./css/index.scss"
import {sum} from './utils/utils'
import _ from 'lodash';

ReactDOM.render(
    <App />,
    document.getElementById('root')
)


console.log(sum(1,2))
console.log(_.sum(1,5))

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}