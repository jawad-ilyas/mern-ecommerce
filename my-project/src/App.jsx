
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Home from './Pages/Home/Home'
import Navbar from './feature/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { fetchItemByUserIdAsync } from './feature/Cart/CartSlice'
import { selectLoggedInUser } from './feature/Auth/AuthSlice'
import { useEffect } from 'react'
import { fetchAllDataForProfileAsync } from './feature/User/UserSlice'

function App() {
  const user = useSelector(selectLoggedInUser)
  console.log("i am the user id " + user?.id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync(user?.id))
      dispatch(fetchAllDataForProfileAsync(user?.id))
    }
  }, [user, dispatch])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
