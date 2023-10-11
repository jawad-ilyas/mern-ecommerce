import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserSlice, { fetchOrderByUserIdAsync, selectOrdersInfo } from '../UserSlice';
import { selectLoggedInUser } from './feature/Auth/AuthSlice'

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  console.log(user)

  return (
    <div>
      <div>


      </div>
    </div>
  );
}