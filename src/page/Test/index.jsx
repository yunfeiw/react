import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../../store/actions/index';

function Test({ todos }) {
  let [name, setName] = useState(1);
  let [list, setList] = useState([0, 1, 2])

  useEffect(() => {
    console.log('componentMount')
  }, [name])
  // 新增 list
  const add = () => {
    setList([...list, list.length++])
  }
  return (
    <div className="App">
      <header className="App-header">
        {name}
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <ul>
          {
            todos.map(e => (
              <li key={e.id}>{e.text}</li>
            ))
          }
        </ul>
        <ul>
          {
            list.map(e => (
              <li key={e}>{e}</li>
            ))
          }
        </ul>
        <button onClick={add}>新增</button>
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onClick: id => {
      dispatch(toggleTodo(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Test);