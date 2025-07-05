import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <div className='text-center py-8'>
        <div className='text-gray-400 text-4xl mb-2'>📝</div>
        <p className='text-gray-500 text-sm'>No todos yet</p>
      </div>
    )
  }

  return (
    <div className='space-y-2 sm:space-y-3 max-h-96 overflow-y-auto'>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo_title={todo.todo_title}
          todoId={todo._id}
          todo_isCompleted={todo.todo_isCompleted}
        />
      ))}
    </div>
  )
}

export default TodoList