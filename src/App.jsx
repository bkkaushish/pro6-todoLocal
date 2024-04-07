import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './context/Todo'
import TodoForm from './components/Todos'
import TodoItem from './components/TodoItems'

function App() {
  const [todos,setTodos] = useState([])
const addTodo=(todo)=>{
setTodos((prev)=>[{id: Date.now(),...todo},...prev])//id given by date,then todo and prev todos
}
const updateTodo=(id,todo)=>{
setTodos((prev)=>
  prev.map((prevTodo)=>(prevTodo.id===id? todo: prevTodo))//1* check id is equal to requested id  todos(prev)->todos.id(prevTodo.id);
)
}
const deleteTodo=(id)=>{
setTodos((prev)=>prev.filter((prevTodo)=>prevTodo.id!==id))//filter --always works on true value,, id ===requested id then removed(not passed)
}
const toggleComplete=(id)=>{
  setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,complete: !prevTodo.complete} : prevTodo))//change the check box value ,with requested id;
}

//for enable local storage
//for get

useEffect(()=>{
  const getter=JSON.parse(localStorage.getItem("todos"));
  if (getter && getter.length > 0 ) {
    setTodos(getter)
  }
},[])

useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
},[todos])

  return (
    <>
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}> 
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'> 
                               <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
      </TodoProvider>        
    </>
  )
}

export default App
