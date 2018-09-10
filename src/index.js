import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.scss';

ReactDOM.render(<App />, document.getElementById('root'));

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
