import React from 'react';
import { login } from '../../api/index';

import './index.less';

const Login = () => {
    const handleLogin = () => {
        login.login({ data: "你好" }).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='login_container'>
            <div>login</div>
            <div><div>nihao</div></div>
            <button onClick={handleLogin}>登录</button>
        </div>
    )
}

export default Login