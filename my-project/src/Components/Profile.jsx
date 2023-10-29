import React, { useState } from "react"

import { selectLoggedInUser, updateUserAsync } from "../feature/Auth/AuthSlice"
import { useDispatch, useSelector } from 'react-redux'
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { selectUserInfo } from "../feature/User/UserSlice"
import { useForm } from "react-hook-form"

export default function Profile() {
  const [SelectedIndex, setSelectedIndex] = useState(-1)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser)
  let profileInfo = useSelector(selectUserInfo);
  profileInfo = profileInfo[0];
  const handleRemoveAddress = (index) => {
    const address = [...profileInfo.addresses]
    const newAddress = [...address.splice(index, 1)]
    const newProfileData = { ...profileInfo, addresses: [...address] }
    dispatch(updateUserAsync(newProfileData))
  }



  const handleUpdateInfo = () => {
    console.log(SelectedIndex)
  }

  const hanldeEditForm = (index) => {
    setSelectedIndex(index);
    const address = profileInfo.addresses[index];

    // Replace "yourForm" with the actual form instance you're using
    setValue("postalCode", address.postalCode);
    setValue("region", address.region);
    setValue("city", address.city);
    setValue("streatAddress", address.streatAddress);
    setValue("country", address.country);
    setValue("phone", address.phone);
    setValue("lastName", address.lastName);
    setValue("firstName", address.firstName);
    setValue("email", address.email);

  }




  return (
    <div className='max-w-screen-lg mx-auto'>

      <div className='container mx-auto p-5 my-10 shadow-lg'>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Your Profile</h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profileInfo?.name ? profileInfo?.name : "New profileInfo"}</dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{profileInfo?.email}</dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Addresses</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">





              </dd>
            </div>
          </dl>
        </div>
        <div className='mt-4'>
          <div>
            {profileInfo?.addresses?.map((address, index) => (
              <div>
                <div className=" shadow-lg rounded-lg p-4 my-6 col-8">
                  {SelectedIndex === index && <form onSubmit={handleSubmit((data) => {
                    console.log(SelectedIndex);
                    console.log(data)
                    const address = [...profileInfo.addresses]
                    const newAddress = [...address.splice(index, 1,data)]
                    const newProfileData = { ...profileInfo, addresses: [...address] }
                    dispatch(updateUserAsync(newProfileData))
                    setSelectedIndex(-1)
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
                                type="email"
                                {...register("email", { required: true })}

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
                      <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => hanldeEditForm(-1)}>
                        Close
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => handleUpdateInfo()}
                      >
                        Update Info
                      </button>
                    </div>
                  </form>}


                </div>
                <div
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
                    <p className="hover:text-red-400 cursor-pointer" onClick={() => hanldeEditForm(index)}>Edit</p>
                    <p className="hover:text-red-400 cursor-pointer" onClick={() => handleRemoveAddress(index)}>Delete</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
