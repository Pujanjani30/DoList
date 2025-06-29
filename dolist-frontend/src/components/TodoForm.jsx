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

    try {
      const res = await addTodo({ todo_title: todo.todo_title, todo_isCompleted: false });
      await getTodos();

      setTodo({ todo_title: '' })

      showSuccessToast(res.message);
    } catch (error) {
      console.log(error)
      // return showErrorToast(error);
    }
  }

  return (
    <div className='my-3'>
      <form onSubmit={handleAddTodo}>
        <input
          type='text'
          name='todoInput'
          value={todo.todo_title}
          onChange={(e) => setTodo({
            // ...todo,
            todo_title: e.target.value,
            // id: crypto.randomUUID(),
            todo_isCompleted: false
          })}
          className='px-2 py-3 w-2xl text-xl rounded-lg bg-[#E9A5F1] text-white outline-[#FED2E2]'
          ref={inputRef}
        />
        <input
          type='submit'
          value='Add'
          disabled={loading && todo.todo_title.length === 0}
          className={`px-3 py-3 ms-3 text-xl text-white rounded-lg bg-[#C68EFD] 
            ${todo.todo_title.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`
          }
        />
      </form>
    </div>
  )
}

export default TodoForm