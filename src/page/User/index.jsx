import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setToken } from '../../store/actions';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: '',
            name: '',
            age: 18
        }
    }
    componentDidMount() {
        this.setState({ name: '干1' });
        this.setState({ name: '干2' }, () => {
            console.log(this.state.name);
        });
        this.setState({ name: '干3' });
        setTimeout(() => {
            this.setState({ name: '干4' });
            this.setState({ age: 30 });
        }, 3000)
    }
    componentDidCatch() {
        console.log('componentDidCatch')
    }

    // 打印token
    handleConsole() {
        console.log(this.props.token);
    }
    // 设置token
    handleSetToken() {
        const { val } = this.state;
        this.props.handleToken(val)
    }
    // chang 
    handleChang(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { val } = this.state;
        return (
            <div>
                <h4>user</h4>
                <p>{val}</p>
                <input type="text" value={val} onChange={this.handleChang.bind(this)} name='val' />
                <button onClick={this.handleConsole.bind(this)}>打印token</button>
                <button onClick={this.handleSetToken.bind(this)}>设置token</button>
            </div>
        )
    }
    // 卸载组件
    componentWillUnmount() {
        console.log('componentWillUnmount');
        this.setState = (state, cb) => {
            console.log(state)
            return
        }
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleToken: (v) => {
            dispatch(setToken(v));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);