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
  }, []);

  const pendingTodos = todos.filter((t) => !t.todo_isCompleted);
  const completedTodos = todos.filter((t) => t.todo_isCompleted);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
        {/* Logo and Title Section */}
        <div className='flex items-center justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8'>
          <img
            src={Logo}
            className='h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14'
            alt="Todo List Logo"
          />
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight'>
            DoList
          </h1>
          <Header />
        </div>

        {/* Main Content */}
        <div className='space-y-6 sm:space-y-8 pb-8'>
          <TodoForm />

          {/* Todo Sections */}
          <div className='grid gap-6 sm:gap-8 lg:grid-cols-2'>
            {/* Pending Todos */}
            <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-800'>
                  Pending
                </h2>
                <span className='bg-yellow-100 text-yellow-800 text-sm font-medium px-2 py-0.5 rounded-full'>
                  {pendingTodos.length}
                </span>
              </div>
              <TodoList todos={pendingTodos} />
            </div>

            {/* Completed Todos */}
            <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-800'>
                  Completed
                </h2>
                <span className='bg-green-100 text-green-800 text-sm font-medium px-2 py-0.5 rounded-full'>
                  {completedTodos.length}
                </span>
              </div>
              <TodoList todos={completedTodos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home