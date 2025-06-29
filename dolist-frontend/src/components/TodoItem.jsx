import { useState, useEffect, useRef } from 'react'
import { useTodo } from '../context/TodoContext'
import { showErrorToast } from '../utils/toast.js'

function TodoItem({ todo_title, todoId, todo_isCompleted }) {
  const { todos, setTodos, loading, updateTodo, completeTodo, deleteTodo } = useTodo();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo_title);

  const inputRef = useRef();

  const handleComplete = async () => {
    try {
      await completeTodo(todoId);

      const updatedTodos = todos.map(t =>
        t._id === todoId
          ? { ...t, todo_isCompleted: !todo_isCompleted }
          : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      return showErrorToast(error);
    }
  }

  useEffect(() => {
    if (isEditing) {
      const input = inputRef.current;
      input.focus();
      // Move cursor to the end of the input text
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [isEditing]);

  useEffect(() => {
    setText(todo_title);
  }, [todo_title]);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    try {
      await updateTodo(todoId, { todo_title: text });

      const updatedTodos = todos.map(t =>
        t._id === todoId ? { ...t, todo_title: text } : t
      );
      setTodos(updatedTodos);
      setIsEditing(false);
    } catch (error) {
      setIsEditing(false);
      return showErrorToast(error);
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    setText(todo_title);
  }

  const handleDelete = async () => {
    try {
      await deleteTodo(todoId);

      const updatedTodos = todos.filter((t) => t._id !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      return showErrorToast(error);
    }
  }

  return (
    <div className='flex items-center justify-between px-2 py-3 my-2 w-2.5xl  rounded-lg bg-[#FED2E2] '>
      {isEditing ?
        (
          <div className='flex items-center justify-between w-full'>
            <input
              type='text'
              className='px-2 py-1 me-3 w-xl'
              value={text}
              onChange={(e) => setText(e.target.value)}
              ref={inputRef}
            />
            <div className='flex items-center space-x-3'>
              <button className='cursor-pointer'
                onClick={handleSave}
                disabled={loading}
              >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm10 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7V5h8v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                </svg>
              </button>
              <button className='cursor-pointer'
                onClick={handleCancel}
                disabled={loading}
              >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='w-4 h-4 me-3'
                checked={todo_isCompleted}
                onChange={handleComplete}
              />
              <p className={`${todo_isCompleted ? 'line-through' : ''} text-pink-400 text-xl`}>
                {text}
              </p>
            </div>

            <div className='flex items-center space-x-2'>
              <button className='cursor-pointer'
                onClick={handleEdit}
                disabled={loading}
              >
                <svg className="w-6.5 h-6.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
              </button>
              <button className='cursor-pointer'
                onClick={handleDelete}
                disabled={loading}
              >
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
              </button>
            </div>
          </>
        )
      }
    </div >
  )
}

export default TodoItem