import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom'
import { showSuccessToast, showErrorToast } from '../utils/toast.js'

function SignUpForm() {
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const password = watch('password');

  const onSubmit = async (formData) => {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }

    const response = await signUp(data);
    if (response.status === 200) {
      showSuccessToast(response.message);
      navigate("/");
    } else {
      showErrorToast(response.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3 w-72">
        <div className="flex flex-col">
          <label className="text-black">Name</label>
          <input
            type='text'
            {...register("name", {
              required: true, minLength: 2, maxLength: 20
            })}
            aria-invalid={errors.name ? "true" : "false"}
            className="border-2 border-black rounded-sm outline-none text-black px-2 py-1"
          />
          {errors.name && errors.name.type === "required" && (
            <span role="alert" className="text-red-500">Name is required</span>
          )}
          {errors.name && errors.name.type === "minLength" && (
            <span role="alert" className="text-red-500">Name should contain a minimum of 2 characters</span>
          )}
        </div>

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
          <label className="text-black">Create Password</label>
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
            <span role="alert" className="text-red-500">Password must be at least 8 characters long and include uppercase, lowercase, number, and special character</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-black">Confirm Password</label>
          <input
            type='password'
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password || "Passwords do not match"
            })}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            className="border-2 border-black rounded-sm outline-none text-black px-2 py-1"
          />
          {errors.confirmPassword && errors.confirmPassword.type === "required" && (
            <span role="alert" className="text-red-500">Password is required</span>
          )}
          {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
            <span role="alert" className="text-red-500">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div>
          <span className="me-2">Already a user?</span>
          <Link to="/login" className="underline">Login</Link>
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Sign up"
            disabled={loading}
            className="text-black font-bold border-2 px-4 py-1 rounded-sm mt-3
            cursor-pointer hover:border-pink-500 hover:text-pink-500"
          />
        </div>
      </form>
    </div>
  )
}

export default SignUpForm