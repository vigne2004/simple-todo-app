import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'

import TodoItem from '../TodoItem'

import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isEditing: false,
    completed: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isEditing: false,
    completed: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isEditing: false,
    completed: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isEditing: false,
    completed: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isEditing: false,
    completed: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isEditing: false,
    completed: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isEditing: false,
    completed: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isEditing: false,
    completed: false,
  },
]

const SimpleTodos = () => {
  const [userInput, setUserInput] = useState('')
  const [todosList, setTodosList] = useState(initialTodosList)

  const deleteTodo = id => {
    const updatedTodosList = todosList.filter(eachTodo => eachTodo.id !== id)
    setTodosList(updatedTodosList)
  }

  const addNewTodo = () => {
    if (userInput !== '') {
      const parts = userInput.split(' ') // Split input into words
      const count = parseInt(parts.pop(), 10) // Get the last word as a number
      const title = parts.join(' ') // Join remaining words as the todo title

      if (!count.isNaN && title.trim() !== '') {
        const newTodos = Array(count)
          .fill()
          .map(() => ({
            id: uuidv4(),
            title,
            completed: false,
            isEditing: false,
          }))
        setTodosList(prev => [...newTodos, ...prev])
        setUserInput('')
      } else {
        const newTodo = {
          id: uuidv4(),
          title: userInput,
          completed: false,
          isEditing: false,
        }
        setTodosList(prev => [newTodo, ...prev])
        setUserInput('')
      }
    }
  }

  const enterMethod = e => {
    if (e.key === 'Enter') {
      addNewTodo()
    }
  }

  const editTodo = id => {
    setTodosList(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo,
      ),
    )
  }

  const saveTodo = (id, newTitle) => {
    if (newTitle !== '') {
      setTodosList(prev =>
        prev.map(todo =>
          todo.id === id ? {...todo, title: newTitle, isEditing: false} : todo,
        ),
      )
    }
  }

  const changeComplete = id => {
    setTodosList(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    )
  }

  return (
    <div className="app-container">
      <div className="simple-todos-container">
        <h1 className="heading">Simple Todos</h1>
        <div className="input-add-cont">
          <input
            className="todo-input"
            type="text"
            placeholder="Add Your Todo..."
            onChange={e => setUserInput(e.target.value)}
            value={userInput}
            onKeyDown={enterMethod}
          />
          <button className="add-btn" type="button" onClick={addNewTodo}>
            Add
          </button>
        </div>
        <ul className="todos-list">
          {todosList.map(eachTodo => (
            <TodoItem
              key={eachTodo.id}
              todoDetails={eachTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              saveTodo={saveTodo}
              changeComplete={changeComplete}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SimpleTodos
