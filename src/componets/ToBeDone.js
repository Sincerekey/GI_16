import React from 'react'

function ToBeDone({todo, toggleComplete, removeTodo}) {
      
    function handleCheckboxClick(){
        toggleComplete(todo.id)
    }

    function handleXbuttonClick(){
        removeTodo(todo.id)
    }

  return (
    <div style={{display: 'flex'}}>
   <input type='checkbox' onChange={handleCheckboxClick} checked={todo.completed} />
   <li
   style={{
    color: 'white',
    textDecoration: todo.completed ? 'line-through' : null
   }}
   >{todo.task}</li>
   <button onClick={handleXbuttonClick}>X</button>
   </div>
  )
}

export default ToBeDone
