import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { selectLoggedInUser } from "../AuthSlice";

const ProtectedAdmin = ({ children }) => {
    const user = useSelector(selectLoggedInUser)
    const navigate = useNavigate();

    useEffect(() => { // Use useEffect to navigate
        if (!user) {
            navigate('/login')
        }
        if (user && user.role !== 'admin') {
            navigate('/')
        }
    }, [user, navigate]); // Add user and navigate as dependencies
    return children
}

export default ProtectedAdmin