import React ,{useEffect} from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { verifyUserAsync } from "../AuthSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedInUser, selectError } from "../AuthSlice"
import { useNavigate } from "react-router-dom"
export default function Login() {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm()
  // console.log(errors?.password?.message)
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  const errorMessage = useSelector(selectError)
  // console.log(errorMessage)
  const navigate = useNavigate()
  // { user?.redirect && naviage('/') }
  useEffect(() => {
    if (user?.id) {
      navigate("/");
    }
  }, [user, navigate]);
  // console.log(user)
  return (
    <>
      {/* {user?.message} */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>


          <span></span>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {errorMessage?.message && <span className="text-red-700 capitalize ">{errorMessage?.message}</span>}
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
            // console.log(data)
            dispatch(verifyUserAsync(data))
          })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "email is required " })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                />
                <span className="text-red-500  capitalize">{errors?.email?.message}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", { required: "password is required" })}


                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-red-500  capitalize">{errors?.password?.message}</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No Acount Yet ?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
