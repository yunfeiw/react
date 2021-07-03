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
    this.setState({ name: 'yunfei' })
  }
  render() {
    // const { name } = this.state;
    return (<div className={this.state.name}>
      Foo：{this.state.name}
      <button onClick={() => { this.setState({ name: this.state.name + Date.now() }) }}>add</button>
    </div>)
  }
}

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          id: 'wang',
          txt: 'xxx1',
        },
        {
          id: 'wang11',
          txt: 'xxx2',
        },
      ]
    }
  }
  render() {
    const { list } = this.state;
    return (
      <ul>
        <button onClick={() => {
          this.setState({
            list: [
              ...list,
              {
                id: Date.now(),
                txt: 'wang' + Date.now()
              }
            ]
          })
        }}>增加列</button>
        {
          list.map((e) => (<li key={e.id}>{e.txt}</li>))
        }
      </ul>
    )
  }
}

const App = (
  <div>
    hello world
    <Foo />
    <List />
    <div style={{ width: '200px', height: '200px', border: '2px solid #000' }}></div>
    <button onClick={() => { alert(1) }}>点击</button>
  </div>
)
ReactDOM.render(App, document.querySelector('#root'))