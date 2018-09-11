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
