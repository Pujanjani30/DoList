import Logo from '../assets/to-do-list.png'
import LoginForm from '../components/LoginForm'

function Login() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex items-center space-x-1 mb-5'>
        <img src={Logo} height={50} width={50} />
        <h1 className='text-4xl text-black'>
          DoList
        </h1>
      </div>

      <LoginForm />
    </div>
  )
}

export default Login