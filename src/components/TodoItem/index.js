import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, saveTodo, editTodo, changeComplete} = props
  const {id, title, isEditing, completed} = todoDetails
  const [newTodo, setNewTodo] = useState(title)

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          className="new-input"
          value={newTodo}
          type="text"
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add something to save"
        />
      ) : (
        <>
          <input
            className="checkbox"
            type="checkbox"
            checked={completed}
            onChange={() => changeComplete(id)}
          />
          <p className={`title ${completed ? 'completed' : ''}`}>{title}</p>
        </>
      )}
      {isEditing ? (
        <button
          type="button"
          className="save-btn"
          onClick={() => saveTodo(id, newTodo)}
        >
          Save
        </button>
      ) : (
        <button type="button" className="edit-btn" onClick={() => editTodo(id)}>
          Edit
        </button>
      )}
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
