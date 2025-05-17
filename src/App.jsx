import Navbar from './components/Navbar'
import { useState,useEffect } from 'react'
import "tailwindcss";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    
    if(todoString!=="undefined" && todoString!==null){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])
  
  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished=(e) => {
    setShowFinished(!showFinished)
  }
  
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (e,id) => {
    let t=todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    handleDelete(e,id)
    saveToLS([...todos])
  }
  const handleDelete = (e, id) => {

    let newTodos = todos.filter((item) => {
      return item.id !== id
    })

    setTodos(newTodos);
    saveToLS(newTodos);
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS([...todos, { id: uuidv4(), todo, isCompleted: false }])
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {

      return item.id === id
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-300 my-5 rounded-xl p-5 min-h-[80vh]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col">
          <h2 className='text-lg font-bold'>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='bg-white w-full rounded-md px-5 py-2' />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 font-bold text-sm'>Save</button>
        </div>
        <div className="filter flex gap-3">
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} /><p>Show finished</p>
        </div>
        <div className='h-[1px] bg-black w-3/4 mx-auto opacity-10 my-2'></div>
        <h2 className="text-xl font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='display flex gap-3'>

                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "text line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm'><MdDeleteSweep /></button>
              </div>

            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
