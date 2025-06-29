import { useEffect } from 'react';
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import Logo from '../assets/to-do-list.png'
import { useTodo } from '../context/TodoContext'
import Header from '../components/Header';
import { showErrorToast } from '../utils/toast.js'

function Home() {
  const { todos, getTodos } = useTodo();

  useEffect(() => {
    async function fetchTodos() {
      try {
        await getTodos();
      } catch (error) {
        return showErrorToast(error);
      }
    }

    fetchTodos();
  }, [])

  console.log(todos)

  const pendingTodos = todos.filter((t) => !t.todo_isCompleted);
  const completedTodos = todos.filter((t) => t.todo_isCompleted);

  return (
    <div className='flex flex-col items-center'>
      <Header />

      <div className='flex items-center space-x-1 mt-9 mb-5'>
        <img src={Logo} height={50} width={50} />
        <h1 className='text-4xl text-black'>
          DoList
        </h1>
      </div>

      <div className='flex-1 space-y-5'>
        <TodoForm />

        <div>
          <h2 className='text-xl text-black'>Pending ({pendingTodos.length})</h2>
          <TodoList todos={pendingTodos} />
        </div>

        <div>
          <h2 className='text-xl text-black'>Completed ({completedTodos.length})</h2>
          <TodoList todos={completedTodos} />
        </div>
      </div>
    </div>
  )
}

export default Home