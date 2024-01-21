import React, {useState, useEffect} from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

function ToDo() {
    const [todos, setTodos] = useState([])
    const Local_Storage_key = "react-to-list-todos";
    // Configue to pull up any saved todos on load
    // useEffect(()=>{
    //     const storageTodoes = JSON.parse(localStorage.getItem(Local_Storage_key)) || [];
    //         setTodos(storageTodoes)
    // }, [])

    // Configure to save ToDos to local storage
    useEffect(()=>{
        if (todos.length > 0) {
            localStorage.setItem(Local_Storage_key, JSON.stringify(todos));
          }
        }, [todos])

    //Adding functionality to the 'completed checkbox'
    function toggleComplete(id){
        setTodos(
            todos.map(todo=>{
                if(todo.id === id){
                    return{
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            })
        )
    } 

    function addTodo(todo){
        setTodos([todo, ...todos])
    } 
    //Functionallity to delete a todo
     function removeTodo(id){
        setTodos(todos.filter((todo)=> todo.id !== id))
     }
  return (
    <div>
        <p>React Todo</p>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
    </div>
  )
}

export default ToDo
