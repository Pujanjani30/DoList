import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom'
import { showSuccessToast, showErrorToast } from '../utils/toast.js'

function LoginForm() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    const data = {
      email: formData.email,
      password: formData.password,
    }

    const response = await login(data);
    if (response.status === 200) {
      showSuccessToast(response.message);
      navigate('/');
    } else {
      showErrorToast(response.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3 w-72">
        <div className="flex flex-col">
          <label className="text-black">Email</label>
          <input
            type='text'
            {...register("email", {
              required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            })}
            aria-invalid={errors.email ? "true" : "false"}
            className="border-2 border-black rounded-sm outline-none text-black px-2 py-1"
          />
          {errors.email && errors.email.type === "required" && (
            <span role="alert" className="text-red-500">Email is required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span role="alert" className="text-red-500">Invalid email</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-black">Password</label>
          <input
            type='password'
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@()!%*?&])[A-Za-z\d@()!%*?&]{8,}$/
            })}
            aria-invalid={errors.password ? "true" : "false"}
            className="border-2 border-black rounded-sm outline-none text-black px-2 py-1"
          />
          {errors.password && errors.password.type === "required" && (
            <span role="alert" className="text-red-500">Password is required</span>
          )}
          {errors.password && errors.password.type === "pattern" && (
            <span role="alert" className="text-red-500 max-w-72">Password must be at least 8 characters long and include uppercase, lowercase, number, and special character</span>
          )}
        </div>

        <div>
          <span className="me-2">New user?</span>
          <Link to="/signup" className="underline">Sign up</Link>
        </div>


        <div className="flex justify-center">
          <input
            type="submit"
            value="Login"
            disabled={loading}
            className="text-black font-bold border-2 px-4 py-1 rounded-sm mt-3
            cursor-pointer hover:border-pink-500 hover:text-pink-500"
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm