import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import MyDiets from './pages/MyDiets'
function App() {
 

  return (
    <>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
