import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { selectLoggedInUser } from "../AuthSlice";

const Protected = ({ children }) => {
    const user = useSelector(selectLoggedInUser)
    const navigate = useNavigate();

    useEffect(() => { // Use useEffect to navigate
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate]); // Add user and navigate as dependencies
    return children
}

export default Protected