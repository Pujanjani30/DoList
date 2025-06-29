import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos }) {
  return (
    <div className='mt-3'>
      {todos.map((t, index) => (
        <div key={index}>
          <TodoItem todo_title={t.todo_title} todoId={t._id} todo_isCompleted={t.todo_isCompleted} />
        </div>
      ))}
    </div>
  )
}

export default TodoList