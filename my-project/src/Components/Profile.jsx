import React from "react"

import { selectLoggedInUser } from "../feature/Auth/AuthSlice"
import { useDispatch, useSelector } from 'react-redux'
import { PaperClipIcon } from '@heroicons/react/20/solid'


export default function Profile() {



  const user = useSelector(selectLoggedInUser)
  console.log(user)
  return (
    <div className='max-w-screen-lg mx-auto'>
      <div className='container mx-auto p-5 my-10 shadow-lg'>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.name ? user?.name : "New User"}</dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.email}</dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Addresses</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">





              </dd>
            </div>
          </dl>
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
                <div>
                  <p className="hover:text-red-400 cursor-pointer">Edit</p>
                  <p className="hover:text-red-400 cursor-pointer">Delete</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
