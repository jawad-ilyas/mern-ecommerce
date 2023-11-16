import React, { useState, Fragment, useEffect } from 'react'
import { useForm } from "react-hook-form"


import { useNavigate } from 'react-router-dom'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectItemsIntoAddToCart, deleteItemByUserIdAsync } from '../Cart/CartSlice'
import { selectLoggedInUser, updateUserAsync } from '../Auth/AuthSlice'
import { createOrderAsync, selectOrderDetail } from './CheckoutSlice'
export default function Checkout() {
  const [open, setOpen] = useState(true)
  const [selectAddress, setSelectAddress] = useState(1);
  const [selectPayment, setSelectPayment] = useState("cash");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const user = useSelector(selectLoggedInUser);
  const handleAddress = (event) => {
    setSelectAddress(user.addresses[event.target.value])
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectItemsIntoAddToCart)
  const totalPrice = products.reduce((acc, currentValue) => currentValue.price * currentValue.quantity + acc, 0)
  const totalItems = products.reduce((total, item) => item.quantity + total, 0)

  const orderDetail = useSelector(selectOrderDetail)
  const handleOrder = async () => {
    const order = { products: products, user: user.id, quantity: 1 };

    // Dispatch the createOrderAsync action
    dispatch(createOrderAsync(order));

  }



  useEffect(() => {
    // Check if orderDetail has been updated
    if (orderDetail) {
      navigate(`/success/${orderDetail.id}`);
      // Reset orderDetail to null to avoid navigating again on subsequent renders

    }
  }, [orderDetail, dispatch, navigate]);


  const handlePayment = (event) => {
    console.log(event.target.value)
    setSelectPayment(event.target.value)
  }
  useEffect(() => {
    { !products.length && navigate('/') }
  }, [products]);
  return (

    <div className='flex flex-col md:flex-row  mx-auto'>


      <div className=" shadow-lg rounded-lg p-4 my-6 col-8">
        <form onSubmit={handleSubmit((data) => {
          // console.log(data);
          dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
          // console.log({ ...user.id, addresses: [...user.addresses, data] })
          reset();

        })}>
          <div >

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("firstName", { required: true })}
                      id="first-name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("lastName", { required: true })}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("phone", { required: true })}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      {...register("country", { required: true })}
                      autoComplete="country-name"
                      className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("streatAddress", { required: true })}
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("city", { required: true })}
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("region", { required: true })}
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("postalCode", { required: true })}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6  ">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        <div className='mt-4 flex flex-col  '>
          <h1>Select Payment Method</h1>
          <label>
            <input
              type='radio'
              name='payment'
              value='cash'
              checked={selectPayment === 'cash'} // Check if 'cash' is selected
              onChange={handlePayment} // Call the function when selection changes
            />
            Cash
          </label>
          <label>
            <input
              type='radio'
              name='payment'
              value='card'
              checked={selectPayment === 'card'} // Check if 'cash' is selected
              onChange={handlePayment} // Call the function when selection changes
            />
            Card
          </label>
        </div>
        <div className='mt-4'>
          <ul>
            {user?.addresses?.map((address, index) => (
              <li
                key={index}
                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
              >
                <div className="flex gap-x-4">
                  <input
                    onChange={handleAddress}
                    name="address"
                    type="radio"
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.firstName + " " + address.lastName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.streatAddress}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.postalCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {address.city + " " + address.country}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mx-3 shadow-lg rounded-lg p-4 my-6 col-4'>
        <div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.title}>{product.title}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}</p>

                        <div className="flex">
                          <button
                            onClick={() => dispatch(deleteItemByUserIdAsync(product.id))}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <button
            type="button"
            className="font-medium w-full bg-blue-800 text-white py-3 rounded-lg mt-2 hover:text-gray-500"
            onClick={handleOrder}
          >
            Place Order
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>

              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
