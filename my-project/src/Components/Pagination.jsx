import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProductByFilterAsync } from '../feature/ProductList/ProductSlice'

export default function Pagination({ totalProducts, TOTAL_ITEMS_PER_PAGE }) {
  const dispatch = useDispatch()

  const [paginationValue, setPaginationValue] = useState({ _page: 1, _limit: TOTAL_ITEMS_PER_PAGE })

  const totalPages = Math.ceil(totalProducts / TOTAL_ITEMS_PER_PAGE);

  // Create an array of page numbers from 1 to totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePagination = (value) => {
    console.log(" -----------------  " + value + " ------------------------- ")
    const pagination = { _page: value, _limit: TOTAL_ITEMS_PER_PAGE }
    setPaginationValue(pagination)
  }

  useEffect(() => {
    // Log the updated paginationValue after the state is updated
    console.log("paginationValue  " + paginationValue._page);

    // Dispatch the action here if needed
    dispatch(fetchProductByFilterAsync({ paginationValue }));
  }, [paginationValue, dispatch]);
 



  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{paginationValue._page}</span> to <span className="font-medium">{totalPages}</span> of{' '}
            <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* <div
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div> */}
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pageNumbers.map((item, index) => {
              return <p
                key={index}
                href="#"
                aria-current="page"
                onClick={e => handlePagination(item)}
                className={`${paginationValue._page === item ? "bg-red-500" : "bg-black"}  relative cursor-pointer z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </p>
            })}




          </nav>
        </div>
      </div>
    </div>
  )
}
