
import './App.css'
import Home from './Pages/Home/Home'
import Navbar from './feature/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
