import { useState, useRef, useEffect } from 'react'
import { useTodo } from '../context/TodoContext'
import { showSuccessToast, showErrorToast } from '../utils/toast.js'

function TodoForm() {
  const [todo, setTodo] = useState({ todo_title: '' });
  const { getTodos, addTodo, loading } = useTodo();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!todo.todo_title.trim()) return;

    try {
      const res = await addTodo({
        todo_title: todo.todo_title.trim(),
        todo_isCompleted: false
      });
      await getTodos();

      setTodo({ todo_title: '' })
      showSuccessToast(res.message);
    } catch (error) {
      console.log(error)
      showErrorToast(error);
    }
  }

  return (
    <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100'>
      <form onSubmit={handleAddTodo} className='space-y-4 sm:space-y-0 sm:flex sm:gap-3'>
        <div className='flex-1'>
          <input
            type='text'
            name='todoInput'
            value={todo.todo_title}
            onChange={(e) => setTodo({
              todo_title: e.target.value,
              todo_isCompleted: false
            })}
            placeholder='What needs to be done?'
            className='w-full px-4 py-3 text-base sm:text-lg rounded-lg border-2 border-gray-200 
                     focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 
                     transition-all duration-200 text-gray-800 placeholder-gray-500'
            ref={inputRef}
          />
        </div>

        <button
          type='submit'
          disabled={loading || todo.todo_title.trim().length === 0}
          className={`w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium rounded-lg 
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200
                    ${todo.todo_title.trim().length === 0 || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-pink-500 hover:bg-pink-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  )
}

export default TodoForm