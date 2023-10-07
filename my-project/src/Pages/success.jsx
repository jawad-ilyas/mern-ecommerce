import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectLoggedInUser } from '../feature/Auth/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { resetCartAsync } from '../feature/Cart/CartSlice';
import { resetCheckout } from '../feature/Checkout/CheckoutSlice';
export default function Success() {
  const params = useParams();
  console.log(params?.id)
  // why we use the login there because we want to reset the cart
  const user = useSelector(selectLoggedInUser)
  const dispatch = useDispatch();
  console.log(user?.id)
  useEffect(() => {
    dispatch(resetCheckout())
    dispatch(resetCartAsync(user?.id))
  }, [user, dispatch])
  return (
    <>

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order Details {params?.id}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your Order is placed</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">You Can Check Your Order into my  Account Page .</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
