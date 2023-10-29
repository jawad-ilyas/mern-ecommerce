import React, { useEffect } from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { logOutAsync, selectLoggedInUser } from '../feature/Auth/AuthSlice';
import { useNavigate } from "react-router-dom"

const Logout = () => {

    const dispatch = useDispatch();
   const user = useSelector(selectLoggedInUser)
  const naviagte = useNavigate();
    useEffect(() => {
        dispatch(logOutAsync());
    },[])
    return (
        <>{!user && naviagte('/login')}</>
    )
}

export default Logout