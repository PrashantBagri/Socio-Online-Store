import { Outlet } from 'react-router'
import Header from './ui/Header'
import Footer from './ui/Footer'
import { Link, useLocation } from 'react-router-dom'


function App() {

  return (
    <>
    
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
