import React from 'react'
import ToBeDone from './ToBeDone'

function TodoList( {todos, toggleComplete, removeTodo}) {
  return (
   <ul>
    {todos.map(todo =>(
        <ToBeDone key={todo.id} todo={todo} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
    ))}
   </ul>
  )
}

export default TodoList
