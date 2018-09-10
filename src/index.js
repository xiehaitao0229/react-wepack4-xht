import ReactDOM from 'react-dom';
import './css/index.scss';
import getRouter from './router/router';

const router = getRouter();

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept(router);
}

ReactDOM.render(router, document.getElementById('root'));
