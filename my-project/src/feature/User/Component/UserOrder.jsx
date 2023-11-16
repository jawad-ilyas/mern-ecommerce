import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserSlice, { fetchOrderByUserIdAsync, selectOrdersInfo } from '../UserSlice';
import { selectLoggedInUser } from '../../Auth/AuthSlice';
export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)

  console.log("we called this funciton into the user order ", user);
  // console.log(user)
  const orders = useSelector(selectOrdersInfo)
  console.log(orders)
  useEffect(() => {
    if (user?.id != undefined) {
      dispatch(fetchOrderByUserIdAsync(user?.id))
    }
  }, [user])

  return (
    <div>
      <div className='max-w-screen-lg mx-auto '>

        <ul className=''>
          {orders && orders?.map((items, index) => (
            <div className='shadow-md my-4 p-4 bg-gray-200 rounded-lg'>
              <h1 className='text-3xl  font-semibold mb-3'>Order # {items?.id}</h1>
              {items?.products?.map((item, index) => (
                <li className="flex items-center gap-4 pb-3" key={index}>
                  {/* {SetQuan(item?.quantity)} */}
                  <img
                    src={item.product.thumbnail}
                    alt=""
                    className="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-black">{item.title}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-900">
                      <div>
                        <dt className="inline">brand : </dt>
                        <dd className="inline">{item.product.brand}</dd>
                      </div>

                      <div>
                        <dt className="inline">category : </dt>
                        <dd className="inline">{item.product.category}</dd>
                      </div>
                    </dl>
                  </div>

                </li>
              ))}
            </div>
          ))}

        </ul>
      </div>
    </div>
  );
}