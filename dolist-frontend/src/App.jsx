import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { Home, Login, SignUp } from './pages'
import ProtectedRoute from './components/ProtectedRoute'
import AuthContextProvider from './context/AuthContext'
import TodoContextProvider from './context/TodoContext'
import { Toaster } from 'react-hot-toast'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>

        {/* Public routes */}
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>
    )
  )

  return (
    // bg-[#8F87F1]
    <div className='min-h-screen bg-white'>
      <AuthContextProvider>
        <TodoContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </TodoContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
