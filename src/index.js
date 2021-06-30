import React from './mini-react/react';
import ReactDOM from './mini-react/react-dom';

class Foo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'wang'
    }
  }
  componentDidMount() {
    console.log('挂载完成')
    this.setState({name:'yunfei'})
  }
  render() {
    const { name } = this.state;
    return (<div>
      Foo：{name}
    </div>)
  }
}

const App = (
  <div>
    hello world
    <Foo />
    <div style={{ width: '200px', height: '200px', border: '2px solid #000' }}></div>
    <button onClick={() => { alert(1) }}>点击</button>
  </div>
)
ReactDOM.render(App, document.querySelector('#root'))